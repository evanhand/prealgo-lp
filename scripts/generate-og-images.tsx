/**
 * Build-time OG image generator. Generates the default 1200x630 PNG
 * (public/og-image.png) used by every page that doesn't override its own.
 *
 * Add per-page OG images by adding entries to JOBS below. Future blog posts
 * will be auto-discovered via content/blog/ scanning (TBD when blog content
 * lands).
 */
import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const OUT_DIR = path.join(process.cwd(), 'public');
const FONT_CACHE = path.join(process.cwd(), '.fonts-cache');

const PURPLE_500 = '#a855f7';
const PURPLE_600 = '#9333ea';
const SLATE_950 = '#020617';
const SLATE_100 = '#f1f5f9';
const SLATE_400 = '#94a3b8';

interface Job {
  outFile: string;
  eyebrow: string;
  title: string;
  footnote?: string;
}

const JOBS: Job[] = [
  {
    outFile: 'og-image.png',
    eyebrow: 'CONTENT ANALYSIS · BEFORE YOU POST',
    title: 'Know what your video will do before you post it.',
    footnote: 'AI grader · view prediction · 10,000+ comparable videos',
  },
];

async function getFont(weight: 400 | 700): Promise<ArrayBuffer> {
  if (!fs.existsSync(FONT_CACHE)) fs.mkdirSync(FONT_CACHE, { recursive: true });
  const cachePath = path.join(FONT_CACHE, `inter-${weight}.ttf`);
  if (fs.existsSync(cachePath)) {
    const buf = fs.readFileSync(cachePath);
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  }
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&display=swap`,
    { headers: { 'User-Agent': 'Mozilla/5.0' } },
  ).then((r) => r.text());
  const url = css.match(/url\((https:\/\/[^)]+\.ttf)\)/)?.[1];
  if (!url) throw new Error(`Couldn't extract Inter ${weight} TTF URL`);
  const buf = await fetch(url).then((r) => r.arrayBuffer());
  fs.writeFileSync(cachePath, Buffer.from(buf));
  return buf;
}

function gridDataUri(): string {
  const tile = 40;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${tile}" height="${tile}"><circle cx="1" cy="1" r="1" fill="${PURPLE_500}" opacity="0.18"/></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

function glowDataUri(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900">
    <defs>
      <radialGradient id="g" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${PURPLE_500}" stop-opacity="0.55"/>
        <stop offset="60%" stop-color="${PURPLE_600}" stop-opacity="0.10"/>
        <stop offset="100%" stop-color="${PURPLE_600}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <circle cx="450" cy="450" r="450" fill="url(#g)"/>
  </svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

function template(job: Job) {
  return {
    type: 'div',
    props: {
      style: {
        width: 1200,
        height: 630,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: SLATE_950,
        backgroundImage: `url("${gridDataUri()}")`,
        backgroundRepeat: 'repeat',
        position: 'relative',
        padding: '60px 72px',
        fontFamily: 'Inter',
      },
      children: [
        {
          type: 'img',
          props: {
            src: glowDataUri(),
            width: 900,
            height: 900,
            style: { position: 'absolute', top: -300, right: -300 },
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', alignItems: 'center', gap: 14, position: 'relative' },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    border: '1px solid rgba(168,85,247,0.35)',
                    backgroundColor: 'rgba(168,85,247,0.10)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    color: PURPLE_500,
                    fontWeight: 700,
                  },
                  children: 'P',
                },
              },
              {
                type: 'span',
                props: {
                  style: { fontSize: 26, fontWeight: 700, color: SLATE_100, letterSpacing: '-0.02em' },
                  children: 'PreAlgo',
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', position: 'relative' },
            children: [
              {
                type: 'span',
                props: {
                  style: {
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: PURPLE_500,
                    marginBottom: 18,
                  },
                  children: job.eyebrow,
                },
              },
              {
                type: 'h1',
                props: {
                  style: {
                    fontSize: 84,
                    fontWeight: 700,
                    lineHeight: 1.05,
                    color: SLATE_100,
                    letterSpacing: '-0.03em',
                    margin: 0,
                    maxWidth: 1000,
                  },
                  children: job.title,
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
              paddingTop: 28,
              borderTop: '1px solid rgba(255,255,255,0.08)',
            },
            children: [
              {
                type: 'span',
                props: {
                  style: { fontSize: 18, color: SLATE_400 },
                  children: job.footnote ?? '',
                },
              },
              {
                type: 'span',
                props: {
                  style: { fontSize: 18, fontWeight: 700, color: PURPLE_500 },
                  children: 'prealgo.com',
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function main() {
  const [regular, bold] = await Promise.all([getFont(400), getFont(700)]);
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const job of JOBS) {
    const svg = await satori(template(job) as any, {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: regular, weight: 400, style: 'normal' },
        { name: 'Inter', data: bold, weight: 700, style: 'normal' },
      ],
    });
    const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
    const out = path.join(OUT_DIR, job.outFile);
    fs.writeFileSync(out, png);
    console.log(`✓ wrote ${out} (${(png.length / 1024).toFixed(1)} KB)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
