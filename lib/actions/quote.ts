'use server';

import { quoteSchema, type QuoteField } from '@/lib/schemas/quote';
import { deliverQuote } from '@/lib/mail';

export type QuoteState =
  | { status: 'idle' }
  | { status: 'success'; reference: string; mode: 'email' | 'logged' }
  | { status: 'error'; formError?: string; fieldErrors?: Partial<Record<QuoteField, string>> };

/** Naive per-instance limiter: enough friction for a marketing form, no infra. */
const seen = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (seen.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  seen.set(key, hits);
  return hits.length > MAX_PER_WINDOW;
}

function reference(): string {
  const now = new Date();
  const stamp = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, '0')}${String(
    now.getUTCDate(),
  ).padStart(2, '0')}`;
  return `PE-${stamp}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export async function submitQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;

  // Honeypot: a bot fills every field it finds. Answer success so it learns nothing.
  if (raw.website) return { status: 'success', reference: reference(), mode: 'logged' };

  if (rateLimited(String(raw.email ?? 'anon'))) {
    return { status: 'error', formError: 'errorBody' };
  }

  const parsed = quoteSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<QuoteField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as QuoteField | undefined;
      if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return { status: 'error', fieldErrors };
  }

  const ref = reference();
  const delivery = await deliverQuote(parsed.data, ref);
  if (!delivery.ok) return { status: 'error', formError: 'errorBody' };

  return { status: 'success', reference: ref, mode: delivery.mode };
}
