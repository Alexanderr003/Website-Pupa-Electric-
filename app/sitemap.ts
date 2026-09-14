import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { pageIds, slugFor } from '@/i18n/routing';
import { absolute } from '@/lib/seo';

/** Every URL carries the full reciprocal hreflang set, not just the home page. */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: absolute(`/${locale}`),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, absolute(`/${l}`)])),
      },
    });
    for (const page of pageIds) {
      entries.push({
        url: absolute(`/${locale}/${slugFor(page, locale)}`),
        changeFrequency: 'yearly',
        priority: page === 'quote' ? 0.8 : 0.2,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, absolute(`/${l}/${slugFor(page, l)}`)]),
          ),
        },
      });
    }
  }

  return entries;
}
