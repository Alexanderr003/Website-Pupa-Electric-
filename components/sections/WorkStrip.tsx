import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { hrefFor } from '@/i18n/routing';
import { PhotoWall } from '@/components/PhotoWall';
import { Section } from './Section';

/**
 * Three photographs from real jobs, captioned with what is in the frame.
 *
 * The front page had nothing on it that anyone could look at — four cards of
 * text between a hero and a contact band. This is the proof the site is built
 * around, shown rather than promised; the rest of the wall and the full job
 * dossier are one link away.
 */
export function WorkStrip({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <Section id="werk" ghost={t.g4} eyebrow={t.eb4} title={t.h2d}>
      <PhotoWall locale={locale} limit={3} />
      <p className="more">
        <Link href={hrefFor('work', locale)}>{t.moreWork}</Link>
      </p>
    </Section>
  );
}
