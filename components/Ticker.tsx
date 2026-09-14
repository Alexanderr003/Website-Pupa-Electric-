import { tickerItems } from '@/content/ticker';
import { nbsp } from '@/lib/format';

/**
 * Decorative strip of the norms and services we work to. Duplicated once so
 * the translate(-50%) loop is seamless; hidden from assistive tech because the
 * same claims appear as real content in the certification wall below.
 */
export function Ticker() {
  const run = [...tickerItems, ...tickerItems];

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track anim-ticker">
        {run.map((item, i) => (
          <span key={`${item}-${i}`}>{nbsp(item)}</span>
        ))}
      </div>
    </div>
  );
}
