import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { hrefFor } from '@/i18n/routing';
import { LocaleSwitcher } from './LocaleSwitcher';
import { MotionToggle } from './MotionToggle';
import { ThemeToggle } from './ThemeToggle';

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
          <svg width="36" height="36" viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="20.5" r="14.5" fill="var(--zon)" />
            {[0, 1].map((row) =>
              [0, 1, 2].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={9.2 + col * 10.5}
                  y={20.5 + row * 10.5}
                  width="9"
                  height="9"
                  rx="1.6"
                  fill="var(--zwart)"
                />
              )),
            )}
          </svg>
          <span className="brand-txt">
            <span className="brand-name" translate="no">
              Pupa
            </span>
            <span className="brand-sub" translate="no">
              Elektrotechniek
            </span>
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
          <ThemeToggle
            labels={{ auto: t.themeAuto, light: t.themeLight, dark: t.themeDark }}
          />
          <MotionToggle pauseLabel={t.motionLabel} resumeLabel={t.motionResume} />
          <LocaleSwitcher current={locale} label={t.langLabel} />
          <Link className="btn btn-p" href={hrefFor('quote', locale)}>
            {t.cta1}
          </Link>
        </div>
      </div>
    </header>
  );
}
