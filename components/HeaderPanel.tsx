'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react';

/**
 * Everything in the header except the logo, in one box.
 *
 * On a phone that box is a dropdown behind a menu button, because the header
 * was wrapping onto three rows — logo, then the links over two lines, then the
 * controls — and taking a third of the screen before any content. On a wide
 * screen the same box lays out inline and the menu button disappears.
 *
 * The links live here once, not twice: a second copy for mobile would put two
 * navigations in the accessibility tree and two targets under every shortcut.
 */
export function HeaderPanel({
  items,
  navLabel,
  menuLabel,
  closeLabel,
  quick,
  children,
}: {
  items: { href: string; label: string }[];
  navLabel: string;
  menuLabel: string;
  closeLabel: string;
  /** appearance and language: small, used often, so they never go behind the menu */
  quick: ReactNode;
  /** the rest: motion, and the quote button */
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  // Following a link is the point of the menu, so the route change closes it.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') close(true);
    }
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) close(false);
    }
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open, close]);

  return (
    <div className="hdr-rest" ref={rootRef}>
      <div className="tools tools-quick">{quick}</div>

      <button
        ref={triggerRef}
        type="button"
        className="menubtn"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : menuLabel}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="17" height="13" viewBox="0 0 18 14" aria-hidden="true">
          {open ? (
            <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M2 2l14 10M16 2L2 12" />
            </g>
          ) : (
            <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 1.6h16M1 7h16M1 12.4h16" />
            </g>
          )}
        </svg>
      </button>

      <div className="hdr-panel" id={panelId} data-open={open ? 'true' : 'false'}>
        <nav className="nav" aria-label={navLabel}>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="tools tools-extra">{children}</div>
      </div>
    </div>
  );
}
