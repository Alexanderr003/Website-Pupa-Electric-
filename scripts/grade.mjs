/**
 * Regenerates every photograph in public/img from the originals.
 *
 * Kept in the repo so the grade is reproducible: when new site photography
 * arrives, drop it in, point U at the folder and re-run — never hand-edit the
 * files in public/img.
 *
 *   node scripts/grade.mjs
 */
import sharp from 'sharp';
import fs from 'node:fs';

const U = '/root/.claude/uploads/7486ea1f-f154-5912-9e23-73dd2c748354';
const OUT = 'public/img';
fs.mkdirSync(OUT, { recursive: true });

/**
 * One grade for every photograph on the site, so a wall of site pictures taken
 * on different phones in different light still reads as one company.
 * Deliberately a grade, not a recolour: the copper, the blue heat-shrink and
 * the green/yellow earth sleeving are the real signal in these frames.
 */
function overlay(w, h, { vignette = 0.55, bottom = 0.72, warm = 0.1 } = {}) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <radialGradient id="v" cx="50%" cy="46%" r="76%">
        <stop offset="45%" stop-color="#000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000" stop-opacity="${vignette}"/>
      </radialGradient>
      <linearGradient id="b" x1="0" y1="0" x2="0" y2="1">
        <stop offset="55%" stop-color="#050506" stop-opacity="0"/>
        <stop offset="100%" stop-color="#050506" stop-opacity="${bottom}"/>
      </linearGradient>
      <linearGradient id="w" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FFD200" stop-opacity="${warm}"/>
        <stop offset="60%" stop-color="#FF8A00" stop-opacity="${warm * 0.35}"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#w)"/>
    <rect width="${w}" height="${h}" fill="url(#v)"/>
    <rect width="${w}" height="${h}" fill="url(#b)"/>
  </svg>`);
}

function grain(w, h, opacity = 0.09) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/></filter>
    <rect width="${w}" height="${h}" filter="url(#n)" opacity="${opacity}"/></svg>`);
}


/**
 * Third-party marks that appear incidentally on site — a main contractor's logo
 * on a vest, an equipment maker's nameplate — are obscured before the photograph
 * is ever written out. Pupa's own work is the subject; nobody else's brand
 * should read as an endorsement, and no client is named without their say-so.
 *
 * Regions are in pixels of the EXIF-rotated original.
 */
const MASKS = {
  '571d0895-image.jpg': [{ left: 330, top: 1100, width: 380, height: 260 }],  // contractor logo on hi-vis
  '1a4cffec-image.jpg': [{ left: 2020, top: 1610, width: 780, height: 640 }], // maker's nameplate on a transformer
};

/**
 * Pixelate, blur, then feather the edges.
 *
 * A blur on its own leaves a legible silhouette, so the region is first
 * collapsed to about a dozen pixels across — past any hope of reconstruction.
 * The feathered alpha matters just as much: a hard-edged patch reads as a
 * censor box and draws the eye straight to what was removed, which is the
 * opposite of the point. The region is padded well beyond the mark so the
 * fully opaque core still covers all of it.
 */
async function obscure(src) {
  const regions = MASKS[src];
  if (!regions) return sharp(`${U}/${src}`).rotate().toBuffer();

  const patches = [];
  for (const r of regions) {
    const patch = await sharp(`${U}/${src}`)
      .rotate()
      .extract(r)
      // collapse to roughly a dozen pixels across — well past the point where
      // any lettering can be reconstructed — then smooth it back out
      .resize(Math.max(2, Math.round(r.width / 60)), Math.max(2, Math.round(r.height / 60)), { fit: 'fill' })
      .resize(r.width, r.height, { fit: 'fill', kernel: 'nearest' })
      .blur(Math.max(12, r.width / 10))
      .png()
      .toBuffer();

    const feather = Math.round(Math.min(r.width, r.height) * 0.1);
    const alpha = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${r.width}" height="${r.height}">
        <defs><filter id="f"><feGaussianBlur stdDeviation="${feather / 2}"/></filter></defs>
        <rect x="${feather}" y="${feather}" width="${r.width - feather * 2}"
              height="${r.height - feather * 2}" rx="${feather}" fill="#fff" filter="url(#f)"/>
      </svg>`,
    );
    const feathered = await sharp(patch)
      .composite([{ input: alpha, blend: 'dest-in' }])
      .png()
      .toBuffer();

    patches.push({ input: feathered, left: r.left, top: r.top });
  }
  return sharp(`${U}/${src}`).rotate().composite(patches).toBuffer();
}

async function grade(src, name, w, h, opts = {}) {
  const img = sharp(await obscure(src));
  const out = await img
    .resize(w, h, { fit: 'cover', position: opts.position ?? sharp.strategy.attention })
    // a gentle S-curve: deepen the blacks a switchgear cabinet already has
    .linear(opts.contrast ?? 1.13, opts.lift ?? -15)
    .modulate({ saturation: opts.saturation ?? 1.07, brightness: opts.brightness ?? 1.0 })
    // nudge the whole frame warm so every photo sits under the same sun
    .recomb([
      [1.035, 0.01, -0.02],
      [0.0, 1.0, -0.01],
      [-0.01, 0.0, 0.955],
    ])
    .composite([
      { input: overlay(w, h, opts), blend: 'over' },
      { input: grain(w, h, opts.grain), blend: 'overlay' },
    ])
    .sharpen({ sigma: 0.7 })
    .webp({ quality: 84, effort: 6 })
    .toFile(`${OUT}/${name}.webp`);
  console.log(name.padEnd(16), `${w}x${h}`, (out.size / 1024 | 0) + 'KB');
}

// hero: the bank of NH fuse switches — the brand yellow, found in the real world
await grade('347064ab-image.jpg', 'hero', 1600, 880, {
  // the page lays its own scrim over this one, so keep the file itself bright
  position: 'north', vignette: 0.3, bottom: 0.3, warm: 0.1,
  contrast: 1.1, brightness: 1.1, saturation: 1.12, grain: 0.06,
});

// the van, cropped to a wide band: it sits beside the battery cabinets it feeds
await grade('cbd43b26-image.jpg', 'van', 1800, 820, {
  position: 'centre', vignette: 0.42, bottom: 0.5, warm: 0.07, contrast: 1.1, saturation: 1.12,
});

// service cards — one photograph per discipline the van actually advertises
const SERVICES = [
  ['55b603c9-image.jpg', 'svc-elektra', 'centre'],
  ['f608e2db-image.jpg', 'svc-licht-kracht', 'centre'],
  ['2ae12131-image.jpg', 'svc-opslag', 'centre'],
  ['dd25937b-image.jpg', 'svc-laadinfra', 'north'],
  ['1e9fcb28-image.jpg', 'svc-service', 'centre'],
];
for (const [src, name, position] of SERVICES) {
  await grade(src, name, 900, 682, { position, vignette: 0.5, bottom: 0.82 });
}

// the close-up wall: craftsmanship a customer can actually inspect
const WORK = [
  ['51ccead3-image.jpg', 'work-01'], ['85255fb6-image.jpg', 'work-02'],
  ['8e3b0c3c-image.jpg', 'work-03'], ['484874b2-image.jpg', 'work-04'],
  ['1a4cffec-image.jpg', 'work-05'],
  ['e5bcde7b-image.jpg', 'work-07'], ['126fb076-image.jpg', 'work-08'],
  ['bd625ee2-image.jpg', 'work-09'],
];
for (const [src, name] of WORK) await grade(src, name, 800, 1000, { vignette: 0.48, bottom: 0.62 });
