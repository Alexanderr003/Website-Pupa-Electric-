export const locales = ['nl', 'en', 'es', 'fr', 'pt'] as const;

export type Locale = (typeof locales)[number];

/** Dutch is the home market, so it is the fallback for unrecognised visitors. */
export const defaultLocale: Locale = 'nl';

export const localeNames: Record<Locale, string> = {
  nl: 'Nederlands',
  en: 'English',
  es: 'Español',
  fr: 'Français',
  pt: 'Português',
};

/** BCP 47 tags for Intl.* formatting and <html lang>. */
export const localeTags: Record<Locale, string> = {
  nl: 'nl-NL',
  en: 'en-GB',
  es: 'es-ES',
  fr: 'fr-FR',
  pt: 'pt-PT',
};

/** OpenGraph locale codes. */
export const ogLocales: Record<Locale, string> = {
  nl: 'nl_NL',
  en: 'en_GB',
  es: 'es_ES',
  fr: 'fr_FR',
  pt: 'pt_PT',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
