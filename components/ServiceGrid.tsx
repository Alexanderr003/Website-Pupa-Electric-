import Image from 'next/image';
import type { Locale } from '@/i18n/config';
import { services } from '@/content/services';
import { nbsp } from '@/lib/format';

export function ServiceGrid({ locale }: { locale: Locale }) {
  return (
    <div className="svc-grid">
      {services.map((service) => {
        const copy = service[locale];
        return (
          <article className="svc" key={service.image}>
            <figure className="svc-fig" style={{ margin: 0 }}>
              <Image
                src={`/img/svc-${service.image}.webp`}
                alt=""
                width={660}
                height={500}
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
              />
              <span className="svc-tag">{copy.tag}</span>
              <h3 className="svc-title">{copy.name}</h3>
            </figure>
            <div className="svc-body">
              <p>{nbsp(copy.description)}</p>
              <ul className="svc-spec">
                {copy.specs.map((spec) => (
                  <li key={spec}>
                    <span>{nbsp(spec)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        );
      })}
    </div>
  );
}
