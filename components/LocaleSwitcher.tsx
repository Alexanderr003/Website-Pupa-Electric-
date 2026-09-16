'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { translatePath } from '@/i18n/routing';

/**
 * A disclosure, because five languages no longer fit in the header as a row.
 * The panel holds real links, not scripted navigation: they can be opened in a
 * new tab, prefetched, and they survive Back/Forward. Switching keeps you on
 * the page you were reading, translating the slug on the way.
 */
export function LocaleSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname() ?? `/${current}`;
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  /** set while closing by keyboard, so focus returns to the trigger — but not on a mouse dismiss */
  const restoreFocus = useRef(false);

  /**
   * Right-aligned with the trigger, but never off the edge of the screen: on a
   * phone the header wraps and the trigger sits close to the left, so a panel
   * pinned to its right edge would hang outside the viewport.
   */
  const place = useCallback(() => {
    const root = rootRef.current;
    const panel = panelRef.current;
    if (!root || !panel) return;
    const gutter = 12;
    const rect = root.getBoundingClientRect();
    const width = panel.offsetWidth;
    const min = gutter - rect.left;
    const max = window.innerWidth - gutter - width - rect.left;
    panel.style.left = `${Math.max(min, Math.min(rect.width - width, max))}px`;
  }, []);

  const close = useCallback((returnFocus: boolean) => {
    restoreFocus.current = returnFocus;
    setOpen(false);
  }, []);

  // Escape closes from anywhere; a press outside dismisses without stealing focus.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.stopPropagation();
        close(true);
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) close(false);
    }
    // A Tab out of the panel is a dismissal too, not a trap.
    function onFocusIn(event: FocusEvent) {
      if (!rootRef.current?.contains(event.target as Node)) close(false);
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('focusin', onFocusIn);
    window.addEventListener('resize', place);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('focusin', onFocusIn);
      window.removeEventListener('resize', place);
    };
  }, [open, close, place]);

  // Opening lands focus on the language you are already reading in.
  useEffect(() => {
    if (open) {
      panelRef.current?.querySelector<HTMLAnchorElement>('[aria-current="true"]')?.focus();
      return;
    }
    if (restoreFocus.current) {
      restoreFocus.current = false;
      triggerRef.current?.focus();
    }
  }, [open]);

  /** Up/Down walk the list, Home/End jump to its ends — the usual menu keys. */
  function onPanelKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const keys = ['ArrowDown', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    const items = Array.from(
      panelRef.current?.querySelectorAll<HTMLAnchorElement>('a.lang') ?? [],
    );
    if (items.length === 0) return;
    const index = items.indexOf(document.activeElement as HTMLAnchorElement);
    const last = items.length - 1;
    const next =
      event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : event.key === 'ArrowDown' ? (index < 0 || index === last ? 0 : index + 1)
      : index <= 0 ? last
      : index - 1;
    event.preventDefault();
    items[next]?.focus();
  }

  function choose(locale: Locale) {
    document.cookie = `pupa-locale=${locale}; path=/; max-age=31536000; samesite=lax`;
    close(false);
  }

  return (
    <div className="langs" ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className="lang-btn"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${label}: ${localeNames[current]}`}
        onClick={() => {
          if (open) return close(true);
          place();
          setOpen(true);
        }}
      >
        <span className="lang-code" aria-hidden="true">
          {current.toUpperCase()}
        </span>
        <svg className="lang-caret" width="9" height="6" viewBox="0 0 9 6" aria-hidden="true">
          <path d="M1 1.5 4.5 5 8 1.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        id={panelId}
        ref={panelRef}
        className="lang-panel"
        data-open={open ? 'true' : 'false'}
        /* the panel stays laid out so it can be measured; `inert` keeps it out
           of the tab order and the a11y tree the instant it closes, without
           waiting for the fade-out */
        inert={!open}
        onKeyDown={onPanelKeyDown}
      >
        <ul aria-label={label}>
          {locales.map((locale) => (
            <li key={locale}>
              <Link
                href={translatePath(pathname, locale)}
                hrefLang={locale}
                lang={locale}
                className="lang"
                aria-current={locale === current ? 'true' : undefined}
                onClick={() => choose(locale)}
              >
                <span className="lang-code" aria-hidden="true">
                  {locale.toUpperCase()}
                </span>
                <span className="lang-name">{localeNames[locale]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
