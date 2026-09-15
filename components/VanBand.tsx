import Image from 'next/image';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';

/** The van beside the battery cabinets it feeds — the company, photographed. */
export function VanBand({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <div className="van">
      <Image src="/img/van.webp" alt={t.vanAlt} fill sizes="(max-width: 1240px) 100vw, 1240px" />
      <div className="van-copy">
        <h3>{t.vanTitle}</h3>
        <p>{t.vanBody}</p>
        <span className="plate">{t.vanServices}</span>
      </div>
    </div>
  );
}
