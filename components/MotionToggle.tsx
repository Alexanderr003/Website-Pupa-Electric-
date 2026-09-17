'use client';

import { useEffect, useState } from 'react';

/**
 * One switch for every ambient loop on the page — the hero drift, the ticker,
 * the pulsing arrow on the chart. Vercel's interface guidelines require a
 * control for autoplaying motion that runs longer than five seconds; rather
 * than bolting a button onto each animation, they all read one flag.
 */
export function MotionToggle({ pauseLabel, resumeLabel }: { pauseLabel: string; resumeLabel: string }) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setPaused(document.documentElement.getAttribute('data-motion') === 'off');
  }, []);

  function toggle() {
    const next = !paused;
    setPaused(next);
    document.documentElement.setAttribute('data-motion', next ? 'off' : 'on');
    try {
      localStorage.setItem('pupa-motion', next ? 'off' : 'on');
    } catch {
      /* private mode — the preference simply does not persist */
    }
  }

  return (
    <button
      type="button"
      className="iconbtn"
      onClick={toggle}
      aria-pressed={paused}
      aria-label={paused ? resumeLabel : pauseLabel}
    >
      {paused ? (
        <svg width="13" height="13" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M1.5 1 L11 6 L1.5 11 Z" fill="currentColor" />
        </svg>
      ) : (
        <svg width="13" height="13" viewBox="0 0 12 12" aria-hidden="true">
          <rect x="0" y="0" width="4" height="12" rx="1" fill="currentColor" />
          <rect x="8" y="0" width="4" height="12" rx="1" fill="currentColor" />
        </svg>
      )}
    </button>
  );
}
