import { localeTags, type Locale } from '@/i18n/config';

const NBSP = ' ';

/**
 * Units and norm names must never break across a line: "10 kW" and "NEN 1010"
 * read as one token, so they get a non-breaking space.
 */
export function nbsp(text: string): string {
  return text
    .replace(/NEN (\d)/g, `NEN${NBSP}$1`)
    .replace(/(\d)[ ](kWh|kWp|kW|kV|mm²|mA|MΩ|ms|%|A\b)/g, `$1${NBSP}$2`);
}

export function formatEuro(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(localeTags[locale], {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatLongDate(iso: string, locale: Locale): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat(localeTags[locale], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(Date.UTC(y ?? 1970, (m ?? 1) - 1, d ?? 1)));
}
