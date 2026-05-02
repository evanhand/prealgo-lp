/**
 * Generates public/sitemap.xml at build time with today's date as lastmod.
 * Routes are listed manually so we control priority + changefreq per page.
 *
 * Run: npx tsx scripts/generate-sitemap.ts
 * Wired: build script (npm run build chains this first).
 */
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'public', 'sitemap.xml');
const BASE = 'https://prealgo.com';
const today = new Date().toISOString().slice(0, 10);

const ROUTES: { path: string; priority: string; changefreq: string }[] = [
  { path: '/',         priority: '1.0', changefreq: 'weekly' },
  { path: '/features', priority: '0.9', changefreq: 'weekly' },
  { path: '/pricing',  priority: '0.9', changefreq: 'weekly' },
  { path: '/sample',   priority: '0.8', changefreq: 'weekly' },
  { path: '/compare',  priority: '0.7', changefreq: 'monthly' },
  { path: '/about',    priority: '0.7', changefreq: 'monthly' },
  { path: '/faq',      priority: '0.7', changefreq: 'monthly' },
  { path: '/blog',     priority: '0.7', changefreq: 'weekly' },
  { path: '/signup',   priority: '0.8', changefreq: 'monthly' },
  { path: '/login',    priority: '0.4', changefreq: 'monthly' },
  { path: '/terms',    priority: '0.3', changefreq: 'yearly' },
  { path: '/privacy',  priority: '0.3', changefreq: 'yearly' },
];

const urls = ROUTES.map(
  (r) => `  <url>
    <loc>${BASE}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

if (!fs.existsSync(path.dirname(OUT))) fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, xml);
console.log(`✓ wrote ${OUT} (${ROUTES.length} URLs, lastmod=${today})`);
