import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { alternatesFor } from '@/lib/seo';
import { Hero } from '@/components/Hero';
import { Ticker } from '@/components/Ticker';
import { LocalBusinessJsonLd } from '@/components/JsonLd';
import { NavCards } from '@/components/sections/NavCards';
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
 * An introduction, and nothing else. The hero says what the company does, the
 * four doors say where to go, and the band at the bottom says how to get in
 * touch. Every subject — the services, the job dossier, the photographs, the
 * price breakdown, the certifications, who we are, the vacancies — is a page of
 * its own, reached from here rather than unrolled underneath.
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
        <CtaBand locale={locale} />
      </div>
    </>
  );
}
