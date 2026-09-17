import { z } from 'zod';

export const jobRoles = ['monteur', 'first', 'apprentice', 'other'] as const;
export const jobStarts = ['now', '1m', '2m'] as const;
/** Certificates worth asking about up front — the ones that decide what someone may do on site. */
export const jobCerts = ['nen3140', 'vca', 'dvp', 'bhv', 'driving'] as const;

const text = z.string().trim();

/**
 * Same contract as the quote schema: messages are *codes*, mapped through the
 * dictionary on the client, so one schema validates identically in five
 * languages. Deliberately short — an application form that interrogates people
 * before anyone has spoken to them loses the good candidates first.
 */
export const applicationSchema = z.object({
  role: z.enum(jobRoles, { message: 'errRequired' }),
  years: z.coerce
    .number({ message: 'errYears' })
    .int('errYears')
    .min(0, 'errYears')
    .max(60, 'errYears'),
  certs: z.array(z.enum(jobCerts)).optional().default([]),
  start: z.enum(jobStarts, { message: 'errRequired' }),
  motivation: text.max(2000).optional().default(''),
  name: text.min(2, 'errRequired').max(100),
  email: text.min(1, 'errRequired').pipe(z.email('errEmail')),
  phone: text.min(6, 'errPhone').max(24).regex(/^[+0-9 ().-]+$/, 'errPhone'),
  consent: z.literal('on', { message: 'errConsent' }),
  // Never shown, never filled by a person.
  website: z.literal('').optional(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
export type ApplicationField = keyof ApplicationInput;
