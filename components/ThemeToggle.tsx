'use client';

import { useEffect, useState } from 'react';

type Mode = 'auto' | 'light' | 'dark';
const ORDER: Mode[] = ['auto', 'light', 'dark'];

const ICON: Record<Mode, React.ReactNode> = {
  // half-filled disc: the page follows whatever the device is set to
  auto: (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 1.8a6.2 6.2 0 0 1 0 12.4z" fill="currentColor" />
    </svg>
  ),
  light: (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="3.4" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M8 .8v1.8M8 13.4v1.8M.8 8h1.8M13.4 8h1.8M2.9 2.9l1.3 1.3M11.8 11.8l1.3 1.3M13.1 2.9l-1.3 1.3M4.2 11.8l-1.3 1.3" />
      </g>
    </svg>
  ),
  dark: (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M13.4 10.3A5.8 5.8 0 0 1 5.7 2.6a5.9 5.9 0 1 0 7.7 7.7z"
        fill="currentColor"
      />
    </svg>
  ),
};

/**
 * Light, dark, or whatever the device says.
 *
 * The stylesheet already answered all four combinations of stamp and system
 * preference, so this only has to set or clear `data-theme` — no class
 * juggling, no second palette. "Auto" stays the default because a visitor who
 * has told their phone they want dark should not have to tell us as well.
 */
export function ThemeToggle({ labels }: { labels: Record<Mode, string>; }) {
  const [mode, setMode] = useState<Mode>('auto');

  useEffect(() => {
    const stamped = document.documentElement.getAttribute('data-theme');
    setMode(stamped === 'light' || stamped === 'dark' ? stamped : 'auto');
  }, []);

  function cycle() {
    const next = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length] as Mode;
    setMode(next);
    const root = document.documentElement;
    if (next === 'auto') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', next);
    try {
      if (next === 'auto') localStorage.removeItem('pupa-theme');
      else localStorage.setItem('pupa-theme', next);
    } catch {
      /* private mode — the choice simply does not persist */
    }
  }

  return (
    <button type="button" className="iconbtn" onClick={cycle} aria-label={labels[mode]}>
      {ICON[mode]}
    </button>
  );
}
