'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { translatePath } from '@/i18n/routing';

/**
 * Real links, not a scripted dropdown: they can be opened in a new tab,
 * prefetched, and they survive Back/Forward. Switching keeps you on the page
 * you were reading, translating the slug on the way.
 */
export function LocaleSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname() ?? `/${current}`;

  function remember(locale: Locale) {
    document.cookie = `pupa-locale=${locale}; path=/; max-age=31536000; samesite=lax`;
  }

  return (
    <nav className="langs" aria-label={label}>
      {locales.map((locale) => (
        <Link
          key={locale}
          href={translatePath(pathname, locale)}
          hrefLang={locale}
          lang={locale}
          className="lang"
          aria-current={locale === current ? 'true' : undefined}
          data-active={locale === current ? 'true' : 'false'}
          onClick={() => remember(locale)}
        >
          <span className="sr-only">{localeNames[locale]}</span>
          <span aria-hidden="true">{locale.toUpperCase()}</span>
        </Link>
      ))}
    </nav>
  );
}
