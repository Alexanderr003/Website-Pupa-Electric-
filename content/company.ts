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
  serviceArea: Localised<string>;
  /** year the company was registered — used in the footer, the about page and JSON-LD */
  founded: string;
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
  serviceArea: {
    nl: 'Heel Nederland',
    en: 'The whole of the Netherlands',
    es: 'Todos los Países Bajos',
    fr: 'Tout le territoire néerlandais',
    pt: 'Todos os Países Baixos',
  },
  founded: '2019',
  kvk: '83140778',
  vat: 'NL003780578B46',
  tagline: {
    nl: 'Erkend elektrotechnisch installatiebedrijf · Nederland',
    en: 'Certified electrical installation company · Netherlands',
    es: 'Empresa instaladora eléctrica autorizada · Países Bajos',
    fr: 'Entreprise d’installation électrique agréée · Pays-Bas',
    pt: 'Empresa instaladora elétrica acreditada · Países Baixos',
  },
};

/**
 * The four figures under the hero. They live here, not in the component, because
 * the standalone prototype renders the same hero from this content layer: when
 * they were written out twice, a medium-voltage figure survived in one copy
 * after the capability had been removed from the other.
 *
 * `label` is the dictionary key that names each one.
 */
export const heroMetrics: { label: 'hm1' | 'hm2' | 'hm3' | 'hm4'; value: string }[] = [
  { label: 'hm1', value: 'NEN 1010 / 3140' },
  { label: 'hm2', value: '5 – 250 kWh' },
  { label: 'hm3', value: '11 – 400 kW' },
  { label: 'hm4', value: 'tot 4000 A' },
];

/** Net position per hour for the storage chart — kW, positive is surplus. */
export const netProfile = [
  -4, -4, -4, -4, -4, -4, -5, -5, -3, 2, 8, 14, 17, 16, 11, 4, -5, -14, -20, -20.5, -17, -12, -8, -5,
] as const;

/** Evening hours the 60 kWh battery covers, so the chart can colour them. */
export const batteryHours = new Set([17, 18, 19, 20]);
