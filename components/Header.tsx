import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { hrefFor } from '@/i18n/routing';
import { LocaleSwitcher } from './LocaleSwitcher';
import { MotionToggle } from './MotionToggle';

export function Header({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const home = `/${locale}`;

  const nav = [
    { href: `${home}#diensten`, label: t.nav1 },
    { href: `${home}#opslag`, label: t.nav2 },
    { href: `${home}#dossier`, label: t.nav3 },
    { href: `${home}#prijs`, label: t.nav4 },
    { href: `${home}#certificaten`, label: t.nav5 },
  ];

  return (
    <header className="hdr">
      <div className="wrap hdr-in">
        <Link className="brand" href={home}>
          <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
            <circle cx="17" cy="17" r="8.5" fill="var(--zon)" />
            <g stroke="var(--zon)" strokeWidth="2.4" strokeLinecap="round">
              <path d="M17 1.5v4M17 28.5v4M1.5 17h4M28.5 17h4" />
              <path d="M6.2 6.2l2.8 2.8M25 25l2.8 2.8M27.8 6.2L25 9M9 25l-2.8 2.8" opacity=".55" />
            </g>
            <path d="M18.6 11.6l-4.4 6.2h3.1l-1.4 4.8 4.5-6.4h-3.2z" fill="var(--zwart)" />
          </svg>
          <span className="brand-txt">
            <span className="brand-name" translate="no">
              Pupa Electric
            </span>
            <span className="brand-sub">{t.brandsub}</span>
          </span>
        </Link>

        <nav className="nav" aria-label={t.mainmenu}>
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="tools">
          <MotionToggle pauseLabel={t.motionLabel} resumeLabel={t.motionResume} />
          <LocaleSwitcher current={locale} label="Taal / Language / Idioma" />
          <Link className="btn btn-p" href={hrefFor('quote', locale)}>
            {t.cta1}
          </Link>
        </div>
      </div>
    </header>
  );
}
