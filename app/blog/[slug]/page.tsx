import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { JsonLd } from '@/components/JsonLd';
import { mdxComponents } from '@/components/blog/MDXComponents';
import { BlogFaqList } from '@/components/blog/BlogFaqList';
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
    <div className="flex min-h-screen flex-col bg-neutral-950 text-white">
      <Navbar />

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

      {/* HEADER */}
      <section className="relative overflow-hidden pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.14),transparent_70%)]" />
        </div>

        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 relative">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-white/55 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to blog
          </Link>

          <header className="mb-10">
            {data.category && (
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary-300 mb-5">
                <span>{data.category}</span>
                <span className="h-px w-6 bg-primary-300/40" />
                <span className="text-white/40">{dateLabel}</span>
              </div>
            )}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05]">
              {meta.title}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-white/65 leading-relaxed">
              {meta.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-white/40">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                {dateLabel}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                {meta.readingTime}
              </span>
              {meta.tags && meta.tags.length > 0 && (
                <span className="inline-flex flex-wrap gap-1.5">
                  {meta.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[10px] tracking-widest text-white/55"
                    >
                      {t}
                    </span>
                  ))}
                </span>
              )}
            </div>
          </header>
        </div>
      </section>

      {/* BODY */}
      <article className="mx-auto w-full max-w-3xl px-4 sm:px-6 pb-12">
        <div className="prose prose-invert prose-neutral max-w-none prose-headings:text-white prose-headings:tracking-tight prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-14 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-10 prose-h3:mb-3 prose-p:text-white/75 prose-p:leading-relaxed prose-strong:text-white prose-li:text-white/75 prose-a:text-primary-300 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-primary-500/40 prose-blockquote:text-white/65 prose-code:text-primary-200 prose-code:bg-white/[0.04] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
          {mdxContent}
        </div>

        {meta.faqs && meta.faqs.length > 0 && (
          <section className="mt-16 border-t border-white/[0.06] pt-12">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary-300 mb-6">
              <span>FAQ</span>
              <span className="h-px w-6 bg-primary-300/40" />
              <span className="text-white/40">{meta.faqs.length}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-6">
              Common questions.
            </h2>
            <BlogFaqList faqs={meta.faqs} />
          </section>
        )}
      </article>

      {/* FOOTER NAV + CTA */}
      <section className="mx-auto w-full max-w-3xl px-4 sm:px-6 pb-12 pt-4 border-t border-white/[0.06] mt-4">
        <div className="flex items-center justify-between pt-8">
          <Link href="/blog" className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-white/55 hover:text-white transition-colors">
            <ArrowLeft className="h-3 w-3" />
            All posts
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 hover:bg-white/90 transition-colors"
          >
            Try PreAlgo free
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      <section className="container-tight pb-24">
        <div className="rounded-2xl border border-white/[0.10] bg-gradient-to-br from-primary-500/[0.12] via-primary-500/[0.04] to-transparent p-8 sm:p-12 text-center">
          <h3 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-white">
            Run your next video through it{' '}
            <span className="accent-gradient">before you post.</span>
          </h3>
          <p className="mt-4 mx-auto max-w-md text-sm sm:text-base text-white/60 leading-relaxed">
            First analysis is free. No credit card.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-neutral-950 hover:bg-white/90 transition-colors"
            >
              Start free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/sample"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/12 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-white/85 hover:bg-white/[0.06] transition-colors"
            >
              See a sample
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
