import { NextResponse, type NextRequest } from 'next/server';
import { locales, defaultLocale, isLocale, type Locale } from '@/i18n/config';

const COOKIE = 'pupa-locale';

/** Pick the best supported language from an Accept-Language header. */
function negotiate(header: string | null): Locale {
  if (!header) return defaultLocale;
  const ranked = header
    .split(',')
    .map((part) => {
      const [tag = '', ...params] = part.trim().split(';');
      const q = params.find((p) => p.trim().startsWith('q='));
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q.split('=')[1]) || 0 : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split('-')[0] ?? '';
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already addressed to a locale: leave it alone, so a crawler that landed on
  // /en stays on /en instead of being bounced by its own Accept-Language.
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return NextResponse.next();
  }

  // A manual choice, remembered in a cookie, always beats header negotiation.
  const stored = request.cookies.get(COOKIE)?.value;
  const locale = stored && isLocale(stored) ? stored : negotiate(request.headers.get('accept-language'));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  // 307, not 308: the destination depends on the visitor, so it must not be cached.
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ['/((?!_next|api|img|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)'],
};
