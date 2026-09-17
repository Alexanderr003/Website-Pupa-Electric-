import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { hrefFor, type PageId } from '@/i18n/routing';
import { services } from '@/content/services';
import { Section } from './Section';

/**
 * The home page's whole middle: four doors, not four sections. Each card is one
 * link with a real destination, so the front page presents the company and then
 * gets out of the way instead of unrolling the entire site underneath it.
 *
 * The services card still names the five disciplines in text — those are the
 * words people search for, and losing them from the front page to save space
 * would be an expensive tidy-up.
 */
export function NavCards({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const cards: { page: PageId; title: string; body: string }[] = [
    { page: 'services', title: t.nav1, body: t.cardServices },
    { page: 'work', title: t.nav3, body: t.cardWork },
    { page: 'about', title: t.navAbout, body: t.cardAbout },
    { page: 'careers', title: t.navJobs, body: t.cardJobs },
  ];

  return (
    <Section id="verder" ghost={t.g1} eyebrow={t.exploreEb} title={t.exploreH}>
      <ul className="doors">
        {cards.map((card) => (
          <li key={card.page}>
            <Link className="door" href={hrefFor(card.page, locale)}>
              <span className="door-h">{card.title}</span>
              <span className="door-p">{card.body}</span>
              {card.page === 'services' ? (
                <span className="door-list">
                  {services.map((s) => s[locale].tag).join(' · ')}
                </span>
              ) : null}
              <span className="door-go" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
