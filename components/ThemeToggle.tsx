'use client';

import { useEffect, useState } from 'react';

type Mode = 'light' | 'dark';

const ICON: Record<Mode, React.ReactNode> = {
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
      <path d="M13.4 10.3A5.8 5.8 0 0 1 5.7 2.6a5.9 5.9 0 1 0 7.7 7.7z" fill="currentColor" />
    </svg>
  ),
};

/**
 * Two states, and every press changes the colour.
 *
 * This used to cycle auto → light → dark. On a phone already set to light, the
 * first press moved auto → light and nothing visibly happened, so the control
 * read as frozen and people pressed it two or three times. One press in three
 * was always a no-op, whichever way the device was set.
 *
 * The device preference still decides what you see before you have chosen
 * anything — the stylesheet answers the unstamped case — but once you press the
 * button you have made a choice, and it is honoured from then on.
 */
export function ThemeToggle({ labels }: { labels: Record<Mode, string> }) {
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    const stamped = document.documentElement.getAttribute('data-theme');
    if (stamped === 'light' || stamped === 'dark') {
      setMode(stamped);
      return;
    }
    // Nothing stamped: read what the device is actually showing right now.
    setMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }, []);

  function flip() {
    const next: Mode = mode === 'dark' ? 'light' : 'dark';
    setMode(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('pupa-theme', next);
    } catch {
      /* private mode — the choice simply does not persist */
    }
  }

  // Before the effect runs we do not know which way round the device is, and
  // guessing would show the wrong icon for a frame.
  const shown: Mode = mode ?? 'dark';

  return (
    <button
      type="button"
      className="iconbtn"
      onClick={flip}
      aria-label={labels[shown]}
      aria-pressed={undefined}
    >
      {ICON[shown]}
    </button>
  );
}
