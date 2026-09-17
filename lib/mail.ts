import 'server-only';
import type { QuoteInput } from './schemas/quote';
import type { ApplicationInput } from './schemas/application';

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

function applicationLines(input: ApplicationInput, reference: string): string {
  const rows: [string, string][] = [
    ['Kenmerk', reference],
    ['Functie', input.role],
    ['Ervaring', `${input.years} jaar`],
    ['Certificaten', input.certs.length ? input.certs.join(', ') : '—'],
    ['Beschikbaar', input.start],
    ['Naam', input.name],
    ['E-mail', input.email],
    ['Telefoon', input.phone],
    ['Toelichting', input.motivation || '—'],
  ];
  return rows.map(([k, v]) => `${k.padEnd(14)} ${v}`).join('\n');
}

/**
 * Job applications, delivered the same way as quotes and with the same
 * guarantee: in production a missing key is a visible error, never a silent
 * drop. Someone who took the trouble to apply deserves better than a form that
 * swallows the submission.
 */
export async function deliverApplication(
  input: ApplicationInput,
  reference: string,
): Promise<Delivery> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.JOBS_TO_EMAIL ?? process.env.QUOTE_TO_EMAIL;
  const from = process.env.RESEND_FROM ?? 'Pupa Elektrotechniek <onboarding@resend.dev>';

  if (!key || !to || to.startsWith('TODO_')) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[application] no RESEND_API_KEY / JOBS_TO_EMAIL in production', { reference });
      return { ok: false };
    }
    console.info(
      `[application] no mail configured — payload follows\n${applicationLines(input, reference)}`,
    );
    return { ok: true, mode: 'logged' };
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: input.email,
      subject: `Sollicitatie — ${input.role} — ${input.name}`,
      text: applicationLines(input, reference),
    });
    if (error) {
      console.error('[application] resend rejected the message', error);
      return { ok: false };
    }
    return { ok: true, mode: 'email' };
  } catch (err) {
    console.error('[application] delivery threw', err);
    return { ok: false };
  }
}
