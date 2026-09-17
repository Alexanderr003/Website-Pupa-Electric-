import type { Locale } from '@/i18n/config';
import { certifications } from '@/content/certifications';
import { nbsp } from '@/lib/format';

/**
 * Names and meaning only. The registration numbers and expiry dates were on
 * these cards, but most are issued in an individual engineer's name rather than
 * the company's, and a customer does not need them to decide anything — so they
 * are withheld and offered on request instead. The section heading says so; if
 * this ever comes back, the data is still in `content/certifications.ts` and the
 * labels are still in the dictionary.
 */
export function CertWall({ locale }: { locale: Locale }) {
  return (
    <div className="certs">
      {certifications.map((cert) => {
        const copy = cert[locale];
        return (
          <article className="cert" key={cert.name}>
            <div className="cert-nm" translate="no">
              {cert.name}
            </div>
            <p className="eyebrow">{copy.kind}</p>
            <p>{nbsp(copy.meaning)}</p>
          </article>
        );
      })}
    </div>
  );
}
