import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { PageShell } from '@/components/PageShell';
import { JsonLd } from '@/components/JsonLd';
import { mdxComponents } from '@/components/blog/MDXComponents';
import { getAllSlugs, getPostMeta } from '@/lib/blog';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const meta = getPostMeta(slug);
    const ogImage = meta.ogImage ?? `/og/blog-${slug}.png`;
    return {
      title: meta.title,
      description: meta.description,
      alternates: { canonical: `/blog/${slug}` },
      openGraph: {
        type: 'article',
        title: meta.title,
        description: meta.description,
        url: `https://prealgo.com/blog/${slug}`,
        publishedTime: meta.date,
        modifiedTime: meta.updatedDate ?? meta.date,
        tags: meta.tags,
        images: [{ url: ogImage, width: 1200, height: 630 }],
      },
      twitter: {
        card: 'summary_large_image',
        title: meta.title,
        description: meta.description,
        images: [ogImage],
      },
    };
  } catch {
    return { title: 'Post not found' };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) notFound();

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const meta = getPostMeta(slug);

  const { content: mdxContent } = await compileMDX({
    source: content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  const ogImage = meta.ogImage ?? `/og/blog-${slug}.png`;
  const dateLabel = new Date(meta.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <PageShell>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: meta.title,
          description: meta.description,
          datePublished: meta.date,
          dateModified: meta.updatedDate ?? meta.date,
          author: { '@type': 'Organization', name: 'PreAlgo' },
          publisher: {
            '@type': 'Organization',
            name: 'PreAlgo',
            logo: { '@type': 'ImageObject', url: 'https://prealgo.com/logo.svg' },
          },
          image: `https://prealgo.com${ogImage}`,
          mainEntityOfPage: `https://prealgo.com/blog/${slug}`,
          keywords: meta.tags?.join(', '),
        }}
      />
      {meta.faqs && meta.faqs.length > 0 && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: meta.faqs.map((q) => ({
              '@type': 'Question',
              name: q.q,
              acceptedAnswer: { '@type': 'Answer', text: q.a },
            })),
          }}
        />
      )}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://prealgo.com/' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://prealgo.com/blog' },
            { '@type': 'ListItem', position: 3, name: meta.title, item: `https://prealgo.com/blog/${slug}` },
          ],
        }}
      />

      <article className="container-tight max-w-3xl pb-16 pt-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to blog
        </Link>

        <header className="mb-10">
          {data.category && (
            <p className="font-mono text-[11px] uppercase tracking-widest text-primary-300 mb-3">
              {data.category}
            </p>
          )}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl leading-[1.1]">
            {meta.title}
          </h1>
          <p className="mt-5 text-lg text-white/65 leading-relaxed">{meta.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/45">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {dateLabel}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {meta.readingTime}
            </span>
            {meta.tags && meta.tags.length > 0 && (
              <span className="inline-flex flex-wrap gap-1.5">
                {meta.tags.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] uppercase tracking-widest font-mono text-white/55"
                  >
                    {t}
                  </span>
                ))}
              </span>
            )}
          </div>
        </header>

        <div className="prose prose-invert prose-neutral max-w-none prose-headings:text-white prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-p:text-white/75 prose-p:leading-relaxed prose-strong:text-white prose-li:text-white/75 prose-a:text-primary-300 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-primary-500/40 prose-blockquote:text-white/65 prose-code:text-primary-200 prose-code:bg-white/[0.04] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
          {mdxContent}
        </div>

        {meta.faqs && meta.faqs.length > 0 && (
          <section className="mt-16 border-t border-white/[0.08] pt-10">
            <h2 className="text-2xl font-bold tracking-tight text-white mb-6">FAQs</h2>
            <div className="space-y-3">
              {meta.faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-xl border border-white/[0.08] bg-white/[0.02] open:border-primary-500/30"
                >
                  <summary className="cursor-pointer list-none px-5 py-4 text-base font-semibold text-white flex items-center justify-between">
                    <span>{faq.q}</span>
                    <span className="font-mono text-xs text-white/40 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-white/65 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </section>
        )}

        <div className="mt-16 flex items-center justify-between border-t border-white/[0.08] pt-8">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            All posts
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-shadow"
          >
            Try PreAlgo free
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </article>
    </PageShell>
  );
}
