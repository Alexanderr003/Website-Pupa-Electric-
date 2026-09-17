import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { ServiceGrid } from '@/components/ServiceGrid';
import { Section } from './Section';

export function ServicesSection({ locale, head = true }: { locale: Locale; head?: boolean }) {
  const t = getDictionary(locale);
  return (
    <Section id="diensten" ghost={t.g1} eyebrow={head ? t.eb1 : undefined} title={head ? t.h2a : undefined} lede={head ? t.p1 : undefined}>
      <ServiceGrid locale={locale} />
    </Section>
  );
}
