import type { Metadata } from 'next';
import Link from 'next/link';
import fs from 'node:fs';
import path from 'node:path';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { PageShell } from '@/components/PageShell';
import { JsonLd } from '@/components/JsonLd';
import { getAllPosts, type PostMeta } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Data-driven content strategy, viral video patterns, and creator insights from PreAlgo. Built on 10,000+ analyzed videos.',
  alternates: { canonical: '/blog' },
};

function resolveOgUrl(post: PostMeta): string | null {
  if (post.ogImage) return post.ogImage;
  const local = path.join(process.cwd(), 'public', 'og', `blog-${post.slug}.png`);
  if (fs.existsSync(local)) return `/og/blog-${post.slug}.png`;
  return null;
}

export default function BlogIndexPage() {
  const posts = getAllPosts().map((p) => ({ ...p, ogUrl: resolveOgUrl(p) }));

  return (
    <PageShell>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'PreAlgo Blog',
          url: 'https://prealgo.com/blog',
          description:
            'Data-driven content strategy, viral video patterns, and creator insights from PreAlgo.',
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

      <section className="container-tight pb-2 pt-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary-300 mb-3">
          Blog
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Patterns, data, and viral teardowns.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/60 leading-relaxed">
          Built on 10,000+ analyzed TikTok and Instagram videos. Useful whether you use PreAlgo or not.
        </p>
      </section>

      <section className="container-tight py-12">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-12 text-center">
            <p className="text-base text-white/55">New posts coming soon.</p>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
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
                        className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[1200/630] w-full bg-gradient-to-br from-primary-500/[0.10] via-secondary-500/[0.05] to-transparent" />
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-primary-300 mb-2">
                      {p.category}
                    </p>
                    <h2 className="text-base font-semibold text-white leading-snug group-hover:text-primary-100 transition-colors">
                      {p.title}
                    </h2>
                    <p className="mt-2 text-sm text-white/55 leading-relaxed line-clamp-3 flex-1">
                      {p.description}
                    </p>
                    <div className="mt-4 flex items-center gap-3 text-[11px] text-white/40">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {p.readingTime}
                      </span>
                      <span className="ml-auto inline-flex items-center gap-1 text-primary-300 group-hover:gap-2 transition-all">
                        Read
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </PageShell>
  );
}
