import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { company } from '@/content/company';
import { isTodo } from '@/content/todo';
import { services } from '@/content/services';
import { certifications } from '@/content/certifications';
import { absolute, siteUrl } from '@/lib/seo';

/**
 * ElectricalContractor is a real schema.org LocalBusiness subtype, so search
 * engines get the trade rather than a generic business. Placeholder values are
 * omitted rather than published — an invented phone number is worse than none.
 */
export function LocalBusinessJsonLd({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ElectricalContractor',
    '@id': `${siteUrl()}/#business`,
    name: company.name,
    description: t.lede,
    url: absolute(`/${locale}`),
    image: absolute('/img/hero.webp'),
    knowsAbout: services.map((s) => s[locale].name),
    hasCredential: certifications
      .filter((c) => !isTodo(c.registration))
      .map((c) => ({ '@type': 'EducationalOccupationalCredential', name: c.name })),
  };

  if (!isTodo(company.phone)) data.telephone = company.phone;
  if (!isTodo(company.email)) data.email = company.email;
  if (!isTodo(company.kvk)) data.identifier = company.kvk;
  if (!isTodo(company.vat)) data.vatID = company.vat;
  if (!isTodo(company.serviceArea)) data.areaServed = company.serviceArea;

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped so a stray "</script>" in content cannot break out
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
