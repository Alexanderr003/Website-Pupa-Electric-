import { z } from 'zod';

/** Mirrors the ids in content/services.ts, which mirror the company van. */
export const serviceIds = [
  'elektra',
  'licht-kracht',
  'opslag',
  'laadinfra',
  'middenspanning',
  'service',
] as const;

export const connections = ['1x25', '3x25', '3x35', '3x80', 'grootverbruik', 'unknown'] as const;
export const timelines = ['asap', '1-3', '3-6', 'orienting'] as const;
export const contactMethods = ['phone', 'email', 'whatsapp'] as const;

const text = z.string().trim();

/**
 * Messages are *codes*, not sentences. The client maps them through the
 * dictionary, so one schema validates identically in all three languages
 * without duplicating copy.
 */
export const quoteSchema = z
  .object({
    service: z.enum(serviceIds, { message: 'errRequired' }),
    customerType: z.enum(['residential', 'business'], { message: 'errRequired' }),
    connection: z.enum(connections, { message: 'errRequired' }),
    timeline: z.enum(timelines, { message: 'errRequired' }),
    message: text.max(2000).optional().default(''),
    name: text.min(2, 'errRequired').max(100),
    email: text.min(1, 'errRequired').pipe(z.email('errEmail')),
    phone: text.min(6, 'errPhone').max(24).regex(/^[+0-9 ().-]+$/, 'errPhone'),
    postcode: text
      .regex(/^[1-9][0-9]{3}\s?[A-Za-z]{2}$/, 'errPostcode')
      .transform((v) => v.replace(/\s+/g, ' ').toUpperCase()),
    houseNumber: text.min(1, 'errRequired').max(12),
    company: text.max(120).optional().default(''),
    preferredContact: z.enum(contactMethods, { message: 'errRequired' }),
    consent: z.literal('on', { message: 'errConsent' }),
    // Never shown, never filled by a person.
    website: z.literal('').optional(),
  })
  .refine((d) => d.customerType !== 'business' || d.company.length > 0, {
    path: ['company'],
    message: 'errCompany',
  });

export type QuoteInput = z.infer<typeof quoteSchema>;
export type QuoteField = keyof QuoteInput;
