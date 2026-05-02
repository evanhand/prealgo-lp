# prealgo-lp

Next.js 16 marketing site for prealgo.com. SSR-ready static export. Pairs
with the existing Vite dashboard app at [`prealgo`](../prealgo) — this repo
serves the public marketing routes; the Vite repo serves the authenticated
product (login, dashboard, upload, analysis, etc).

## Architecture

prealgo.com is served by **two** sites behind Netlify:

| Surface | Served by | Repo |
|---|---|---|
| `/`, `/features`, `/pricing`, `/about`, `/faq`, `/blog`, `/sample`, `/compare`, `/terms`, `/privacy` | this repo (Next.js static export) | `prealgo-lp` |
| `/login`, `/signup`, `/onboarding`, `/dashboard/*`, `/upload`, `/analysis/*`, `/shared/*`, `/history`, `/progress`, `/settings`, `/admin/*` | proxied to a separate Netlify site | `prealgo` (Vite) |

`netlify.toml` does the proxying. **Before deploy**, edit `netlify.toml`
and replace the `VITE_APP_URL` placeholder with the actual Netlify subdomain
of the Vite app (e.g. `https://prealgo-app.netlify.app`).

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

The build chain:
1. `tsx scripts/generate-sitemap.ts` → writes `public/sitemap.xml` with current date as lastmod.
2. `tsx scripts/generate-og-images.tsx` → writes `public/og-image.png` (and any per-page OG images defined in the script's `JOBS` array).
3. `next build` → static export to `out/`.

Netlify serves `out/`.

## SEO checklist

- [x] Per-page `<title>` and `<meta description>` (Next.js `metadata` API)
- [x] Per-page canonical
- [x] Open Graph + Twitter card meta
- [x] Real PNG OG image (not SVG)
- [x] Auto-generated `sitemap.xml` with current `lastmod` per build
- [x] `robots.txt` with sitemap link + dashboard route disallows
- [x] JSON-LD: Organization + SoftwareApplication on /, FAQPage on /faq, Product+Offer on /pricing
- [ ] Submit `https://prealgo.com/sitemap.xml` to Google Search Console (manual)
- [ ] Submit to Bing Webmaster Tools (manual)
- [ ] Per-blog-post OG images (when blog content lands)

## Adding a marketing page

1. Create `app/<slug>/page.tsx` with a `metadata` export and `<PageShell>` wrapper.
2. Add the route to `scripts/generate-sitemap.ts`.
3. (Optional) Add a per-page OG image entry to `scripts/generate-og-images.tsx`.

## Adding a blog post

Phase 2 will scaffold MDX blog support. For now `/blog` shows a placeholder.
