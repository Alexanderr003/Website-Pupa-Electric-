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
import { ServiceGrid } from '@/components/ServiceGrid';
import { LoadChart } from '@/components/LoadChart';
import { DossierList } from '@/components/DossierList';
import { BeforeAfter } from '@/components/BeforeAfter';
import { PriceTable } from '@/components/PriceTable';
import { CertWall } from '@/components/CertWall';
import { LocalBusinessJsonLd } from '@/components/JsonLd';
import { CallLink } from '@/components/CallLink';

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
        <section className="sec" id="diensten">
          <span className="sec-num" aria-hidden="true">
            {t.g1}
          </span>
          <div className="sec-head">
            <p className="eyebrow">{t.eb1}</p>
            <h2>{t.h2a}</h2>
            <p className="lede">{nbsp(t.p1)}</p>
          </div>
          <ServiceGrid locale={locale} />
        </section>

        <section className="sec" id="opslag">
          <span className="sec-num" aria-hidden="true">
            {t.g2}
          </span>
          <div className="sec-head">
            <p className="eyebrow">{t.eb2}</p>
            <h2>{t.h2b}</h2>
          </div>
          <div className="split">
            <div>
              <p className="lede">{nbsp(t.p2)}</p>
              <div className="numstack">
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
            </div>
            <div className="chart-card">
              <div className="chart-scroll">
                <LoadChart locale={locale} />
              </div>
              <div className="legend">
                <div>
                  <span className="sw" style={{ background: 'var(--zon)' }} />
                  <span>{t.lg1}</span>
                </div>
                <div>
                  <span
                    className="sw"
                    style={{ background: 'rgba(255,196,0,.3)', border: '1.5px solid var(--zon)' }}
                  />
                  <span>{t.lg2}</span>
                </div>
                <div>
                  <span className="sw" style={{ border: '1.5px solid var(--grijs2)' }} />
                  <span>{t.lg3}</span>
                </div>
              </div>
              <p className="caption">{nbsp(t.cap1)}</p>
            </div>
          </div>
        </section>

        <section className="sec" id="dossier">
          <span className="sec-num" aria-hidden="true">
            {t.g3}
          </span>
          <div className="sec-head">
            <p className="eyebrow">{t.eb3}</p>
            <h2>{t.h2c}</h2>
            <p className="lede">{nbsp(t.p3)}</p>
          </div>
          <DossierList locale={locale} />
          <p className="caption">{nbsp(t.cap2)}</p>
        </section>

        <section className="sec" id="voorna">
          <span className="sec-num" aria-hidden="true">
            {t.g4}
          </span>
          <div className="sec-head">
            <p className="eyebrow">{t.eb4}</p>
            <h2>{t.h2d}</h2>
            <p className="lede">{nbsp(t.p4)}</p>
          </div>
          <BeforeAfter
            labels={{
              before: t.tagA,
              after: t.tagB,
              control: t.cmplabel,
              unit: t.cmpunit,
              beforeAlt: t.voorAlt,
              afterAlt: t.naAlt,
              hint: t.cap3,
            }}
          />
        </section>

        <section className="sec" id="prijs">
          <span className="sec-num" aria-hidden="true">
            {t.g5}
          </span>
          <div className="sec-head">
            <p className="eyebrow">{t.eb5}</p>
            <h2>{t.h2e}</h2>
            <p className="lede">{nbsp(t.p5)}</p>
          </div>
          <PriceTable locale={locale} />
          <p className="caption">{nbsp(t.cap4)}</p>
        </section>

        <section className="sec" id="certificaten">
          <span className="sec-num" aria-hidden="true">
            {t.g6}
          </span>
          <div className="sec-head">
            <p className="eyebrow">{t.eb6}</p>
            <h2>{t.h2f}</h2>
            <p className="lede">{nbsp(t.p6)}</p>
          </div>
          <CertWall locale={locale} />
        </section>

        <section className="sec" id="offerte">
          <div className="cta">
            <div>
              <h2>{t.h2g}</h2>
              <p>{nbsp(t.p7)}</p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn-dark" href={hrefFor('quote', locale)}>
                {t.cta4}
              </Link>
              <CallLink locale={locale} className="btn btn-line" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
