import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { company } from '@/content/company';
import { isTodo } from '@/content/todo';
import { hrefFor } from '@/i18n/routing';

/**
 * Only offers a tel: link once a real number exists; until then it sends people
 * to the quote form rather than to a link that does nothing.
 */
export function CallLink({ locale, className }: { locale: Locale; className?: string }) {
  const t = getDictionary(locale);
  if (isTodo(company.phone)) {
    return (
      <Link className={className} href={hrefFor('quote', locale)}>
        {t.cta5}
      </Link>
    );
  }
  return (
    <a className={className} href={`tel:${company.phone.replace(/[^+\d]/g, '')}`}>
      {t.cta5}
    </a>
  );
}
