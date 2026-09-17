import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { CertWall } from '@/components/CertWall';
import { Section } from './Section';

export function CertSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <Section id="certificaten" ghost={t.g6} eyebrow={t.eb6} title={t.h2f} lede={t.p6}>
      <CertWall locale={locale} />
    </Section>
  );
}
