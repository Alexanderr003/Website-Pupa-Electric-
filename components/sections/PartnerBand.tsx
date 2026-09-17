import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { partners } from '@/content/partners';
import { Section } from './Section';

/**
 * Partners are named in plain type, never with their logo: reproducing someone
 * else's mark implies an endorsement we have not been given.
 */
export function PartnerBand({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <Section id="partners" title={t.partnersTitle} lede={t.partnersNote}>
      <ul className="partners">
        {partners.map((p) => (
          <li key={p.name} className="partner">
            <span className="partner-nm" translate="no">
              {p.name}
            </span>
            <span className="partner-role">{p[locale].role}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
