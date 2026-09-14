import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { certifications } from '@/content/certifications';
import { nbsp } from '@/lib/format';
import { Todo } from './Todo';

export function CertWall({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

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
            <div className="cert-meta">
              <span>
                {t.certnr} <Todo value={cert.registration} />
              </span>
              <span>
                {t.certval} <Todo value={cert.validUntil} />
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
