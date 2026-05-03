import type { Metadata } from 'next';
import Link from 'next/link';
import fs from 'node:fs';
import path from 'node:path';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { JsonLd } from '@/components/JsonLd';
import { getAllPosts, type PostMeta } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Data-driven content strategy, viral video patterns, and creator insights from PreAlgo. Built on 11,000+ analyzed videos.',
  alternates: { canonical: '/blog' },
};

function resolveOgUrl(post: PostMeta): string | null {
  if (post.ogImage) return post.ogImage;
  const local = path.join(process.cwd(), 'public', 'og', `blog-${post.slug}.png`);
  if (fs.existsSync(local)) return `/og/blog-${post.slug}.png`;
  return null;
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function BlogIndexPage() {
  const posts = getAllPosts().map((p) => ({ ...p, ogUrl: resolveOgUrl(p) }));
  const [featured, ...rest] = posts;

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-white">
      <Navbar />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'PreAlgo Blog',
          url: 'https://prealgo.com/blog',
          description: 'Data-driven content strategy, viral video patterns, and creator insights from PreAlgo.',
          blogPost: posts.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            description: p.description,
            url: `https://prealgo.com/blog/${p.slug}`,
            datePublished: p.date,
            dateModified: p.updatedDate ?? p.date,
            author: { '@type': 'Organization', name: 'PreAlgo' },
          })),
        }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 sm:pt-40 pb-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.18),transparent_70%)]" />
          <div className="absolute inset-0 bg-grid-tight mask-radial-fade opacity-30" />
        </div>

        <div className="container-tight relative">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary-300">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
            Blog
          </span>
          <h1 className="max-w-4xl text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.0] text-white">
            Patterns, data, and{' '}
            <span className="accent-gradient">viral teardowns.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base sm:text-lg text-white/60 leading-relaxed">
            Built on 11,000+ analyzed TikTok and Instagram videos. Useful whether you use PreAlgo or not.
          </p>
        </div>
      </section>

      {/* FEATURED + REST */}
      <main className="container-tight pt-4 pb-20">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-12 text-center">
            <p className="text-base text-white/55">New posts coming soon.</p>
          </div>
        ) : (
          <>
            {/* Featured */}
            {featured && (
              <Link
                href={`/blog/${featured.slug}`}
                className="group block rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden transition-colors hover:border-primary-500/30 mb-12"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-0">
                  <div className="aspect-[1200/630] lg:aspect-auto lg:min-h-[340px] overflow-hidden bg-neutral-950 relative">
                    {featured.ogUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={featured.ogUrl}
                        alt={featured.title}
                        loading="eager"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/[0.18] via-secondary-500/[0.08] to-transparent" />
                    )}
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                    <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary-300 mb-4">
                      <span>Featured</span>
                      <span className="h-px w-6 bg-primary-300/40" />
                      <span>{featured.category}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.1] text-white group-hover:text-primary-100 transition-colors">
                      {featured.title}
                    </h2>
                    <p className="mt-4 text-sm sm:text-base text-white/60 leading-relaxed line-clamp-3">
                      {featured.description}
                    </p>
                    <div className="mt-6 flex items-center gap-4 text-[11px] font-mono uppercase tracking-widest text-white/40">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        {fmtDate(featured.date)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        {featured.readingTime}
                      </span>
                      <span className="ml-auto inline-flex items-center gap-1.5 text-primary-300 group-hover:gap-2.5 transition-all">
                        Read post
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Rest */}
            {rest.length > 0 && (
              <>
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary-300 mb-6">
                  <span>All posts</span>
                  <span className="h-px w-6 bg-primary-300/40" />
                  <span className="text-white/40">{rest.length}</span>
                </div>
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blog/${p.slug}`}
                        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] transition-colors hover:border-primary-500/30"
                      >
                        {p.ogUrl ? (
                          <div className="aspect-[1200/630] w-full overflow-hidden bg-neutral-950">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={p.ogUrl}
                              alt={p.title}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                          </div>
                        ) : (
                          <div className="aspect-[1200/630] w-full bg-gradient-to-br from-primary-500/[0.10] via-secondary-500/[0.05] to-transparent" />
                        )}
                        <div className="flex flex-1 flex-col p-5">
                          <p className="font-mono text-[10px] uppercase tracking-widest text-primary-300 mb-2">
                            {p.category}
                          </p>
                          <h3 className="text-base font-semibold text-white leading-snug group-hover:text-primary-100 transition-colors">
                            {p.title}
                          </h3>
                          <p className="mt-2 text-sm text-white/55 leading-relaxed line-clamp-3 flex-1">
                            {p.description}
                          </p>
                          <div className="mt-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-white/40">
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {fmtDate(p.date)}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {p.readingTime}
                            </span>
                            <span className="ml-auto inline-flex items-center gap-1 text-primary-300 group-hover:gap-2 transition-all normal-case">
                              <ArrowRight className="h-3 w-3" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </main>

      {/* CTA */}
      <section className="container-tight pb-24">
        <div className="rounded-2xl border border-white/[0.10] bg-gradient-to-br from-primary-500/[0.12] via-primary-500/[0.04] to-transparent p-8 sm:p-12 text-center">
          <h3 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-white">
            The patterns we wrote about?{' '}
            <span className="accent-gradient">Run them on your video.</span>
          </h3>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-neutral-950 hover:bg-white/90 transition-colors"
            >
              Analyze a video free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/sample"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/12 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-white/85 hover:bg-white/[0.06] transition-colors"
            >
              See a sample analysis
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
