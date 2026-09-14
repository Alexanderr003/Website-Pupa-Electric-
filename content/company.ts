import type { Localised } from './types';

export type Company = {
  name: string;
  /** every value below is a placeholder until the owner supplies the real one */
  phone: string;
  email: string;
  whatsapp: string;
  serviceArea: string;
  kvk: string;
  vat: string;
  tagline: Localised<string>;
};

export const company: Company = {
  name: 'Pupa Electric',
  phone: 'TODO_PHONE',
  email: 'TODO_EMAIL',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? 'TODO_WHATSAPP',
  serviceArea: 'TODO_REGIO',
  kvk: 'TODO_KVK',
  vat: 'TODO_BTW',
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
