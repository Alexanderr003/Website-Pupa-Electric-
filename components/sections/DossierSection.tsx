import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { nbsp } from '@/lib/format';
import { DossierList } from '@/components/DossierList';
import { Section } from './Section';

export function DossierSection({ locale, head = true }: { locale: Locale; head?: boolean }) {
  const t = getDictionary(locale);
  return (
    <Section id="dossier" ghost={t.g3} eyebrow={head ? t.eb3 : undefined} title={head ? t.h2c : undefined} lede={head ? t.p3 : undefined}>
      <DossierList locale={locale} />
      <p className="caption">{nbsp(t.cap2)}</p>
    </Section>
  );
}
