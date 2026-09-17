import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { hrefFor } from '@/i18n/routing';
import { company } from '@/content/company';
import { Todo } from './Todo';

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <footer className="ftr">
      <div className="wrap ftr-in">
        <div>
          <p className="brand-name" translate="no" style={{ fontSize: '1rem' }}>
            {company.name}
          </p>
          <p className="note" style={{ marginTop: 10 }}>
            {company.tagline[locale]}
          </p>
          <p className="note" style={{ marginTop: 14 }}>
            <Link href={hrefFor('about', locale)}>{t.navAbout}</Link>
            {' · '}
            <Link href={hrefFor('careers', locale)}>{t.navJobs}</Link>
            {' · '}
            <Link href={hrefFor('privacy', locale)}>{t.legalPrivacy}</Link>
            {' · '}
            <Link href={hrefFor('terms', locale)}>{t.legalTerms}</Link>
          </p>
        </div>
        <dl>
          <dt>{t.f1}</dt>
          <dd>
            <Todo value={company.phone} />
          </dd>
          <dt>{t.f2}</dt>
          <dd>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </dd>
          <dt>{t.fAddress}</dt>
          <dd>
            {company.address.street}
            <br />
            {company.address.postalCode} {company.address.city}
          </dd>
          <dt>{t.f3}</dt>
          <dd>
            {company.serviceArea[locale]}
          </dd>
          <dt>KvK</dt>
          <dd>
            <Todo value={company.kvk} />
          </dd>
          <dt>BTW</dt>
          <dd>
            <Todo value={company.vat} />
          </dd>
        </dl>
      </div>
    </footer>
  );
}
