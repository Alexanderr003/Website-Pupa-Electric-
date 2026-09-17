import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { hrefFor } from '@/i18n/routing';
import { nbsp } from '@/lib/format';
import { VanBand } from '@/components/VanBand';
import { CallLink } from '@/components/CallLink';

export function CtaBand({ locale, withVan = true }: { locale: Locale; withVan?: boolean }) {
  const t = getDictionary(locale);
  return (
    <section className="sec" id="offerte">
      {withVan ? <VanBand locale={locale} /> : null}
      <div className="cta" style={withVan ? { marginTop: 'clamp(22px,3vw,34px)' } : undefined}>
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
  );
}
