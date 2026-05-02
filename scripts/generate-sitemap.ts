/**
 * Generates public/sitemap.xml at build time. Includes static marketing
 * routes plus every blog post discovered in content/blog/.
 *
 * Run: npx tsx scripts/generate-sitemap.ts (chained from npm run build)
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const OUT = path.join(process.cwd(), 'public', 'sitemap.xml');
const BASE = 'https://prealgo.com';
const today = new Date().toISOString().slice(0, 10);
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

const STATIC_ROUTES: { path: string; priority: string; changefreq: string }[] = [
  { path: '/',         priority: '1.0', changefreq: 'weekly' },
  { path: '/features', priority: '0.9', changefreq: 'weekly' },
  { path: '/pricing',  priority: '0.9', changefreq: 'weekly' },
  { path: '/sample',   priority: '0.8', changefreq: 'weekly' },
  { path: '/compare',  priority: '0.7', changefreq: 'monthly' },
  { path: '/about',    priority: '0.7', changefreq: 'monthly' },
  { path: '/faq',      priority: '0.7', changefreq: 'monthly' },
  { path: '/blog',     priority: '0.8', changefreq: 'weekly' },
  { path: '/signup',   priority: '0.8', changefreq: 'monthly' },
  { path: '/login',    priority: '0.4', changefreq: 'monthly' },
  { path: '/terms',    priority: '0.3', changefreq: 'yearly' },
  { path: '/privacy',  priority: '0.3', changefreq: 'yearly' },
];

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

const urls: SitemapUrl[] = STATIC_ROUTES.map((r) => ({
  loc: `${BASE}${r.path}`,
  lastmod: today,
  changefreq: r.changefreq,
  priority: r.priority,
}));

if (fs.existsSync(BLOG_DIR)) {
  const slugs = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));

  for (const slug of slugs) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), 'utf-8');
    const { data } = matter(raw);
    const lastmod = (data.updatedDate ?? data.date ?? today) as string;
    urls.push({
      loc: `${BASE}/blog/${slug}`,
      lastmod,
      changefreq: 'monthly',
      priority: '0.7',
    });
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

if (!fs.existsSync(path.dirname(OUT))) fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, xml);
console.log(`✓ wrote ${OUT} (${urls.length} URLs total, ${urls.length - STATIC_ROUTES.length} blog posts)`);
