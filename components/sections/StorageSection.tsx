import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { nbsp } from '@/lib/format';
import { LoadChart } from '@/components/LoadChart';
import { Section } from './Section';

export function StorageSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <Section id="opslag" ghost={t.g2} eyebrow={t.eb2} title={t.h2b}>
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
              <span className="sw sw-pos" />
              <span>{t.lg1}</span>
            </div>
            <div>
              <span className="sw sw-bat" />
              <span>{t.lg2}</span>
            </div>
            <div>
              <span className="sw sw-net" />
              <span>{t.lg3}</span>
            </div>
          </div>
          <p className="caption">{nbsp(t.cap1)}</p>
        </div>
      </div>
    </Section>
  );
}
