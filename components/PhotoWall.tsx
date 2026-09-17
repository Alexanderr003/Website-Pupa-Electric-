import Image from 'next/image';
import type { Locale } from '@/i18n/config';
import { gallery } from '@/content/gallery';

/**
 * Real job photographs, each captioned with what is actually in the frame.
 * The captions are the section: anyone can post a picture of a cabinet, but
 * naming the torque marks and the phase labels invites the close look.
 */
export function PhotoWall({ locale, limit }: { locale: Locale; limit?: number }) {
  const shots = limit ? gallery.slice(0, limit) : gallery;
  return (
    <div className="wall">
      {shots.map((shot) => {
        const copy = shot[locale];
        return (
          <figure key={shot.image}>
            <div className="frame">
              <Image
                src={`/img/${shot.image}.webp`}
                alt={copy.alt}
                width={800}
                height={1000}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
              />
            </div>
            <figcaption>{copy.caption}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}
