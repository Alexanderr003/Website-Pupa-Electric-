import type { Localised } from './types';

export type PostalAddress = {
  street: string;
  postalCode: string;
  city: string;
  /** ISO 3166-1 alpha-2, for schema.org */
  country: string;
};

export type Company = {
  name: string;
  address: PostalAddress;
  email: string;
  /** still a placeholder until the owner supplies it */
  phone: string;
  whatsapp: string;
  serviceArea: string;
  kvk: string;
  vat: string;
  tagline: Localised<string>;
};

export const company: Company = {
  name: 'Pupa Elektrotechniek',
  address: {
    street: 'Mortelweg 12c',
    postalCode: '6551 AE',
    city: 'Weurt',
    country: 'NL',
  },
  email: 'PupaElektrotechniek@hotmail.com',
  phone: 'TODO_PHONE',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? 'TODO_WHATSAPP',
  serviceArea: 'TODO_REGIO',
  kvk: '83140778',
  vat: 'NL003780578B46',
  tagline: {
    nl: 'Erkend elektrotechnisch installatiebedrijf · Nederland',
    en: 'Certified electrical installation company · Netherlands',
    es: 'Empresa instaladora eléctrica autorizada · Países Bajos',
  },
};

/** Net position per hour for the storage chart — kW, positive is surplus. */
export const netProfile = [
  -4, -4, -4, -4, -4, -4, -5, -5, -3, 2, 8, 14, 17, 16, 11, 4, -5, -14, -20, -20.5, -17, -12, -8, -5,
] as const;

/** Evening hours the 60 kWh battery covers, so the chart can colour them. */
export const batteryHours = new Set([17, 18, 19, 20]);
