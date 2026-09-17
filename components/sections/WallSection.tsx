import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { PhotoWall } from '@/components/PhotoWall';
import { Section } from './Section';

export function WallSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <Section id="voorna" ghost={t.g4} eyebrow={t.eb4} title={t.h2d} lede={t.p4}>
      <PhotoWall locale={locale} />
      <p className="caption">{t.cap3}</p>
    </Section>
  );
}
