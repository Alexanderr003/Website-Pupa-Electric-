import { locales, type Locale } from './config';

/**
 * Secondary pages live under a localised slug so the URL itself carries the
 * keyword a Dutch customer searches for. `PageId` is the stable internal name;
 * the slug is what ends up in the address bar.
 */
export const pageIds = ['quote', 'privacy', 'terms'] as const;

export type PageId = (typeof pageIds)[number];

export const slugs: Record<PageId, Record<Locale, string>> = {
  quote: { nl: 'offerte', en: 'quote', es: 'presupuesto' },
  privacy: { nl: 'privacy', en: 'privacy', es: 'privacidad' },
  terms: { nl: 'algemene-voorwaarden', en: 'terms', es: 'condiciones' },
};

export function slugFor(page: PageId, locale: Locale): string {
  return slugs[page][locale];
}

export function hrefFor(page: PageId, locale: Locale): string {
  return `/${locale}/${slugFor(page, locale)}`;
}

/** Reverse lookup, so a request for /es/presupuesto resolves to the `quote` page. */
export function pageIdFromSlug(locale: Locale, slug: string): PageId | null {
  for (const id of pageIds) {
    if (slugs[id][locale] === slug) return id;
  }
  return null;
}

/**
 * Same page, other language. Used by the locale switcher so switching keeps you
 * where you are instead of dumping you on the home page.
 */
export function translatePath(pathname: string, target: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  const [first, second] = segments;
  if (!first || !(locales as readonly string[]).includes(first)) return `/${target}`;
  if (!second) return `/${target}`;
  const page = pageIdFromSlug(first as Locale, second);
  return page ? `/${target}/${slugFor(page, target)}` : `/${target}`;
}

export function allStaticPaths(): { locale: Locale; slug: string }[] {
  return locales.flatMap((locale) => pageIds.map((id) => ({ locale, slug: slugFor(id, locale) })));
}
