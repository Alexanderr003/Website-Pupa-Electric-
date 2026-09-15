import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { hrefFor } from '@/i18n/routing';
import { nbsp } from '@/lib/format';

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const meta = [
    { k: t.hm1, v: 'NEN 1010 / 3140' },
    { k: t.hm2, v: '5 – 250 kWh' },
    { k: t.hm3, v: '11 – 400 kW' },
    { k: t.hm4, v: 'tot 4000 A' },
  ];

  return (
    <section className="hero">
      <Image
        className="hero-img anim-drift"
        src="/img/hero.webp"
        alt={t.heroalt}
        fill
        priority
        sizes="100vw"
      />
      <div className="wrap">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>
          <span>{t.h1a}</span> <span className="hl">{t.h1b}</span>
        </h1>
        <p className="lede">{nbsp(t.lede)}</p>
        <div className="hero-cta">
          <Link className="btn btn-p" href={hrefFor('quote', locale)}>
            {t.cta2}
          </Link>
          <Link className="btn btn-s" href={`/${locale}#dossier`}>
            {t.cta3}
          </Link>
        </div>
        <div className="hero-meta">
          {meta.map((m) => (
            <div key={m.k}>
              <span className="k">{m.k}</span>
              <span className="v">{nbsp(m.v)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
