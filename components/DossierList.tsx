import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { dossier } from '@/content/dossier';
import { formatLongDate, nbsp } from '@/lib/format';

export function DossierList({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <ol className="dossier">
      {dossier.map((phase, index) => {
        const copy = phase[locale];
        return (
          <li className="step" key={phase.date}>
            <span className="step-n">{String(index + 1).padStart(2, '0')}</span>
            <div className="step-body">
              <div className="step-hd">
                <h3>{copy.title}</h3>
                <span className="step-date">
                  {formatLongDate(phase.date, locale)} · {t.crew} {phase.crew}
                </span>
              </div>
              <p>{nbsp(copy.summary)}</p>
              <span className="norm">
                <svg width="12" height="10" viewBox="0 0 11 9" aria-hidden="true">
                  <path
                    d="M1 4.6 L4 7.6 L10 1.2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{nbsp(copy.norm)}</span>
              </span>
              <div className="shots">
                {Array.from({ length: phase.photos }, (_, i) => (
                  <div className="shot" key={i}>
                    <span>{t.photo}</span>
                  </div>
                ))}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
