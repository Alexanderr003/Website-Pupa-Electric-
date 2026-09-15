import 'server-only';
import type { QuoteInput } from './schemas/quote';

export type Delivery = { ok: true; mode: 'email' | 'logged' } | { ok: false };

function asLines(input: QuoteInput, reference: string): string {
  const rows: [string, string][] = [
    ['Kenmerk', reference],
    ['Dienst', input.service],
    ['Type klant', input.customerType],
    ['Aansluiting', input.connection],
    ['Termijn', input.timeline],
    ['Naam', input.name],
    ['Bedrijf', input.company || '—'],
    ['E-mail', input.email],
    ['Telefoon', input.phone],
    ['Postcode', `${input.postcode} ${input.houseNumber}`],
    ['Contact via', input.preferredContact],
    ['Toelichting', input.message || '—'],
  ];
  return rows.map(([k, v]) => `${k.padEnd(14)} ${v}`).join('\n');
}

/**
 * Sends the request by email when a Resend key is configured.
 *
 * Without a key the payload goes to the server log and the visitor still sees
 * success — that keeps local development and preview deploys usable without
 * secrets. In production a missing key is an error, never a silent drop: a lost
 * lead is worse than a visible failure.
 */
export async function deliverQuote(input: QuoteInput, reference: string): Promise<Delivery> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  const from = process.env.RESEND_FROM ?? 'Pupa Elektrotechniek <onboarding@resend.dev>';

  if (!key || !to || to.startsWith('TODO_')) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[quote] no RESEND_API_KEY / QUOTE_TO_EMAIL in production', { reference });
      return { ok: false };
    }
    console.info(`[quote] no mail configured — payload follows\n${asLines(input, reference)}`);
    return { ok: true, mode: 'logged' };
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: input.email,
      subject: `Offerteaanvraag — ${input.service} — ${input.postcode}`,
      text: asLines(input, reference),
    });
    if (error) {
      console.error('[quote] resend rejected the message', error);
      return { ok: false };
    }
    return { ok: true, mode: 'email' };
  } catch (err) {
    console.error('[quote] delivery threw', err);
    return { ok: false };
  }
}
