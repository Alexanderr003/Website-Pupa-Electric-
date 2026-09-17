'use server';

import { applicationSchema, type ApplicationField } from '@/lib/schemas/application';
import { deliverApplication } from '@/lib/mail';

export type ApplicationState =
  | { status: 'idle' }
  | { status: 'success'; reference: string; mode: 'email' | 'logged' }
  | {
      status: 'error';
      formError?: string;
      fieldErrors?: Partial<Record<ApplicationField, string>>;
    };

/** Naive per-instance limiter: enough friction for a public form, no infra. */
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
  return `PE-SOL-${stamp}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export async function submitApplication(
  _prev: ApplicationState,
  formData: FormData,
): Promise<ApplicationState> {
  // `certs` is a checkbox group, so it has to be read with getAll —
  // Object.fromEntries would silently keep only the last box ticked.
  const entries = Object.fromEntries(formData) as Record<string, string>;
  const raw = { ...entries, certs: formData.getAll('certs').map(String) };

  // Honeypot: a bot fills every field it finds. Answer success so it learns nothing.
  if (entries.website) return { status: 'success', reference: reference(), mode: 'logged' };

  if (rateLimited(entries.email ?? 'anon')) {
    return { status: 'error', formError: 'errorBody' };
  }

  const parsed = applicationSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<ApplicationField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ApplicationField | undefined;
      if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return { status: 'error', fieldErrors };
  }

  const ref = reference();
  const delivery = await deliverApplication(parsed.data, ref);
  if (!delivery.ok) return { status: 'error', formError: 'errorBody' };

  return { status: 'success', reference: ref, mode: delivery.mode };
}
