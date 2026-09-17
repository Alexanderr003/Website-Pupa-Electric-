import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { nbsp } from '@/lib/format';
import { PriceTable } from '@/components/PriceTable';
import { Section } from './Section';

export function PriceSection({ locale, head = true }: { locale: Locale; head?: boolean }) {
  const t = getDictionary(locale);
  return (
    <Section id="prijs" ghost={t.g5} eyebrow={head ? t.eb5 : undefined} title={head ? t.h2e : undefined} lede={head ? t.p5 : undefined}>
      {/*
        Stated before the numbers, not after them: by the time someone has read a
        table of euros they have already formed an expectation, and a caption
        underneath is too late to correct it.
      */}
      <p className="disclaimer">{nbsp(t.priceWarn)}</p>
      <PriceTable locale={locale} />
      <p className="caption">{nbsp(t.cap4)}</p>
    </Section>
  );
}
