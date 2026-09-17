import type { Locale } from '@/i18n/config';

/**
 * Every piece of customer-facing content carries all the languages side by
 * side, so a missing translation is a type error rather than a blank page.
 */
export type Localised<T> = Record<Locale, T>;

export function pick<T>(value: Localised<T>, locale: Locale): T {
  return value[locale];
}
