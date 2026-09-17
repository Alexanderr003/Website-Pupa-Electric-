import type { Metadata, Viewport } from 'next';
import { Archivo, IBM_Plex_Mono, Instrument_Sans } from 'next/font/google';
import { notFound } from 'next/navigation';
import { locales, isLocale, ogLocales, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppFab } from '@/components/WhatsAppFab';
import { siteUrl, alternatesFor } from '@/lib/seo';
import '../globals.css';

/** Signage-grotesque with a width axis — the lettering on a switchgear panel. */
const display = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-display',
});
const body = Instrument_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-body' });
/** Every measurement, part number and euro amount is set in this face. */
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-mono',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0B' },
    { media: '(prefers-color-scheme: light)', color: '#F3F0E7' },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);

  return {
    metadataBase: new URL(siteUrl()),
    title: { default: `Pupa Elektrotechniek — ${t.brandsub}`, template: '%s | Pupa Elektrotechniek' },
    description: t.lede,
    alternates: alternatesFor('/', locale),
    openGraph: {
      type: 'website',
      siteName: 'Pupa Elektrotechniek',
      locale: ogLocales[locale],
      title: `Pupa Elektrotechniek — ${t.brandsub}`,
      description: t.lede,
    },
    robots: { index: true, follow: true },
  };
}

/**
 * Applies the stored motion and theme preferences before first paint, so a
 * visitor who switched ambient animation off never sees a frame of it, and a
 * chosen theme never flashes the other one.
 */
const BOOT = `(function(){try{var d=document.documentElement;
var m=localStorage.getItem('pupa-motion');d.setAttribute('data-motion',m==='off'?'off':'on');
var t=localStorage.getItem('pupa-theme');if(t==='light'||t==='dark')d.setAttribute('data-theme',t)}catch(e){}})();`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale as Locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
        <a className="skip" href="#main">
          {t.skip}
        </a>
        <Header locale={locale} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
        <WhatsAppFab locale={locale} />
      </body>
    </html>
  );
}
