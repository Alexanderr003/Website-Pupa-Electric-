import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { netProfile, batteryHours } from '@/content/company';
import { nbsp } from '@/lib/format';

const LEFT = 68;
const SLOT = 33.4;
const BAR = 21;
const ZERO = 224;
const PX_PER_KW = 4.6;

/**
 * Net position across a working day: solid bars are surplus going into the
 * battery, outlined bars are demand taken from the grid, and the half-filled
 * evening bars are that same midday surplus coming back out. The dashed arc is
 * the whole commercial argument in one gesture.
 */
export function LoadChart({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <svg className="chart" viewBox="0 0 900 400" role="img" aria-label={t.chartdesc}>
      {[
        ['+20 kW', ZERO - 92],
        ['0', ZERO],
        ['−20 kW', ZERO + 92],
      ].map(([label, y]) => (
        <text key={String(label)} x={58} y={Number(y) + 4} textAnchor="end" className="tick">
          {nbsp(String(label))}
        </text>
      ))}

      <line x1={LEFT} y1={ZERO} x2={870} y2={ZERO} className="zeroline" />

      {netProfile.map((value, hour) => {
        const x = LEFT + hour * SLOT + (SLOT - BAR) / 2;
        const height = Math.max(2, Math.abs(value) * PX_PER_KW);
        const y = value >= 0 ? ZERO - height : ZERO;
        const cls = value > 0 ? 'bar-pos' : batteryHours.has(hour) ? 'bar-bat' : 'bar-net';
        return (
          <g key={hour}>
            <rect x={x} y={y} width={BAR} height={height} rx={2.5} className={cls} />
            {hour % 4 === 0 && (
              <text x={x + BAR / 2} y={366} textAnchor="middle" className="tick">
                {String(hour).padStart(2, '0')}:00
              </text>
            )}
          </g>
        );
      })}

      <g className="anim-glow">
        <path d="M478 128 C 566 74, 676 96, 712 198" className="flow" />
        <polygon points="712,212 705,194 719,194" fill="var(--zon)" />
      </g>
    </svg>
  );
}
