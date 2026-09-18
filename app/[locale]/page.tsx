import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { alternatesFor } from '@/lib/seo';
import { Hero } from '@/components/Hero';
import { Ticker } from '@/components/Ticker';
import { LocalBusinessJsonLd } from '@/components/JsonLd';
import { NavCards } from '@/components/sections/NavCards';
import { ServiceStrip } from '@/components/sections/ServiceStrip';
import { WorkStrip } from '@/components/sections/WorkStrip';
import { CtaBand } from '@/components/sections/CtaBand';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return { description: t.lede, alternates: alternatesFor('/', locale) };
}

/**
 * An introduction — but one with something to look at.
 *
 * The first version was the hero, four cards of text and a contact band, which
 * was correct in structure and empty on screen: a company whose whole argument
 * is "look at the work" was showing none of it. So the five disciplines and
 * three job photographs are here as pictures, each one a link to the page that
 * explains it.
 *
 * What is still not here is the explaining: no price table, no dossier, no
 * certification wall, no specifications. Those are pages, reached from here
 * rather than unrolled underneath.
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <>
      <LocalBusinessJsonLd locale={locale} />
      <Hero locale={locale} />
      <Ticker />
      <div className="wrap">
        <NavCards locale={locale} />
        <ServiceStrip locale={locale} />
        <WorkStrip locale={locale} />
        <CtaBand locale={locale} />
      </div>
    </>
  );
}
