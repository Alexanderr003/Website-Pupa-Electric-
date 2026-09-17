import type { ReactNode } from 'react';
import { nbsp } from '@/lib/format';

/**
 * The shared shell for every content block: the ghosted word in the corner, the
 * eyebrow, the heading and an optional lede. Pulled out of the home page when
 * the sections were split across routes, so the same block reads identically
 * wherever it lands.
 */
export function Section({
  id,
  ghost,
  eyebrow,
  title,
  lede,
  children,
}: {
  id?: string;
  ghost?: string;
  eyebrow?: string;
  title?: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <section className="sec" id={id}>
      {ghost ? (
        <span className="sec-num" aria-hidden="true">
          {ghost}
        </span>
      ) : null}
      {eyebrow || title || lede ? (
        <div className="sec-head">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          {title ? <h2>{title}</h2> : null}
          {lede ? <p className="lede">{nbsp(lede)}</p> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
