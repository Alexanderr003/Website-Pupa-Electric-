import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { locales, isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { hrefFor } from '@/i18n/routing';
import { alternatesFor } from '@/lib/seo';
import { nbsp } from '@/lib/format';
import { Hero } from '@/components/Hero';
import { Ticker } from '@/components/Ticker';
import { PhotoWall } from '@/components/PhotoWall';
import { LocalBusinessJsonLd } from '@/components/JsonLd';
import { Section } from '@/components/sections/Section';
import { ServicesSection } from '@/components/sections/ServicesSection';
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
 * The home page introduces each thread and hands off. Everything that used to
 * live here in full — the storage chart, the job dossier, the photo wall, the
 * price breakdown, the certifications — now has its own route, because a single
 * page carrying all of it asked a visitor to scroll past four subjects to reach
 * the one they came for.
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);

  return (
    <>
      <LocalBusinessJsonLd locale={locale} />
      <Hero locale={locale} />
      <Ticker />

      <div className="wrap">
        <ServicesSection locale={locale} />
        <p className="more">
          <Link href={hrefFor('services', locale)}>{t.moreServices}</Link>
        </p>

        <Section id="opslag" ghost={t.g2} eyebrow={t.eb2} title={t.h2b} lede={t.p2}>
          <div className="numstack numstack-row">
            <span className="bignum">
              72<small>{nbsp(t.bn1)}</small>
            </span>
            <span className="bignum">
              78&nbsp;%<small>{nbsp(t.bn2)}</small>
            </span>
            <span className="bignum">
              ≥50&nbsp;%<small>{nbsp(t.bn3)}</small>
            </span>
          </div>
          <p className="more">
            <Link href={`${hrefFor('services', locale)}#opslag`}>{t.moreServices}</Link>
          </p>
        </Section>

        <Section id="dossier" ghost={t.g3} eyebrow={t.eb3} title={t.h2c} lede={t.p3}>
          <PhotoWall locale={locale} limit={3} />
          <p className="more">
            <Link href={hrefFor('work', locale)}>{t.moreWork}</Link>
          </p>
        </Section>

        <CtaBand locale={locale} />
      </div>
    </>
  );
}
