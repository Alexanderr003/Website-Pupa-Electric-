'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

type Labels = {
  before: string;
  after: string;
  control: string;
  unit: string;
  beforeAlt: string;
  afterAlt: string;
  hint: string;
};

/**
 * The control is a native range input, deliberately.
 *
 * Vercel's guidelines require a keyboard alternative for any drag gesture —
 * with a real <input type="range"> the arrow keys, Home/End and touch all work
 * for free, and the focus ring is the browser's own. Dragging on the image is
 * a convenience layered on top, never the only way in.
 */
export function BeforeAfter({ labels }: { labels: Labels }) {
  const [position, setPosition] = useState(52);
  const boxRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  function fromPointer(clientX: number) {
    const rect = boxRef.current?.getBoundingClientRect();
    if (!rect?.width) return;
    const pct = Math.round(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
    setPosition(pct);
  }

  // The seam sits at `position`; the readout is how much of the finished board is on show.
  const shown = `${100 - position} ${labels.unit}`;

  return (
    <>
      <div
        className="cmp"
        ref={boxRef}
        style={{ '--pos': `${position}%` } as React.CSSProperties}
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && fromPointer(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <Image src="/img/board-voor.webp" alt={labels.beforeAlt} fill sizes="(max-width: 1100px) 100vw, 1140px" />
        <div className="cmp-over">
          <Image src="/img/board-na.webp" alt={labels.afterAlt} fill sizes="(max-width: 1100px) 100vw, 1140px" />
        </div>
        <div className="cmp-div" />
        <span className="cmp-tag a">{labels.before}</span>
        <span className="cmp-tag b">{labels.after}</span>
      </div>

      <div className="cmp-ctl">
        <label htmlFor="cmprange">{labels.control}</label>
        <input
          type="range"
          id="cmprange"
          min={0}
          max={100}
          step={1}
          value={position}
          aria-describedby="cmphint"
          aria-valuetext={shown}
          onChange={(e) => setPosition(Number(e.target.value))}
        />
        <span className="mono" style={{ fontSize: 'var(--t-xs)', color: 'var(--grijs)', minWidth: '9ch' }}>
          {shown}
        </span>
      </div>
      <p className="caption" id="cmphint">
        {labels.hint}
      </p>
    </>
  );
}
