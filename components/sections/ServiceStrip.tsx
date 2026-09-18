import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { hrefFor } from '@/i18n/routing';
import { services } from '@/content/services';
import { Section } from './Section';

/**
 * The five disciplines on the front page, as photographs.
 *
 * The full cards — ratings, what is included, what is not — stay on the
 * services page. This is the difference between showing the work and
 * explaining it, and the front page should be doing the first.
 */
export function ServiceStrip({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <Section id="wat" ghost={t.g1} eyebrow={t.eb1} title={t.h2a}>
      <ul className="svc-strip">
        {services.map((service) => {
          const copy = service[locale];
          return (
            <li key={service.id}>
              <Link className="svc-mini" href={hrefFor('services', locale)}>
                <span className="frame">
                  <Image
                    src={`/img/${service.image}.webp`}
                    alt={copy.alt}
                    width={520}
                    height={650}
                    sizes="(max-width: 680px) 50vw, (max-width: 1080px) 33vw, 20vw"
                  />
                </span>
                <span className="kop">{copy.tag}</span>
                <span className="lbl">{copy.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="more">
        <Link href={hrefFor('services', locale)}>{t.moreServices}</Link>
      </p>
    </Section>
  );
}
