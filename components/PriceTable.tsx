import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { priceLines } from '@/content/pricing';
import { formatEuro, nbsp } from '@/lib/format';

export function PriceTable({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <div className="tbl-scroll">
      <table>
        <caption>{nbsp(t.pcap)}</caption>
        <thead>
          <tr>
            <th scope="col">{t.pth1}</th>
            <th scope="col" className="n">
              {t.pth2}
            </th>
          </tr>
        </thead>
        <tbody>
          {priceLines.map((line) => {
            const copy = line[locale];
            return (
              <tr className={line.kind} key={copy.label}>
                <td>
                  {copy.label}
                  {copy.note ? <small>{nbsp(copy.note)}</small> : null}
                </td>
                <td className="n">{formatEuro(line.amount, locale)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
