import { locales, type Locale } from '@/i18n/config';

export function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://pupa-electric.nl';
}

export function absolute(path: string): string {
  return `${siteUrl()}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Canonical plus a reciprocal hreflang set. `x-default` points at Dutch, the
 * home market, which is where an unmatched visitor should land.
 */
export function alternatesFor(
  pathByLocale: string | Record<Locale, string>,
  current: Locale,
): { canonical: string; languages: Record<string, string> } {
  const path = (locale: Locale) =>
    typeof pathByLocale === 'string'
      ? `/${locale}${pathByLocale === '/' ? '' : pathByLocale}`
      : pathByLocale[locale];

  const languages: Record<string, string> = {};
  for (const locale of locales) languages[locale] = absolute(path(locale));
  languages['x-default'] = absolute(path('nl'));

  return { canonical: absolute(path(current)), languages };
}
