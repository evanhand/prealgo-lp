import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { JsonLd } from '@/components/JsonLd';
import { ReviewsList } from '@/components/reviews/ReviewsList';
import { aggregateRating, getApprovedReviews } from '@/lib/reviews';

export const metadata: Metadata = {
  title: 'Reviews',
  description: 'Real creators on PreAlgo. Read every approved review.',
  alternates: { canonical: '/reviews' },
};

export default async function ReviewsPage() {
  const reviews = await getApprovedReviews();
  const { avg, count } = aggregateRating(reviews);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-white">
      <Navbar />

      {count > 0 && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'PreAlgo',
            description: 'AI-powered content analysis for creators',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: avg,
              reviewCount: count,
              bestRating: 5,
              worstRating: 1,
            },
            review: reviews.map((r) => ({
              '@type': 'Review',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: r.rating,
                bestRating: 5,
                worstRating: 1,
              },
              author: {
                '@type': 'Person',
                name: r.display_name || r.reviewer_full_name || 'Creator',
              },
              datePublished: r.approved_at ?? r.created_at,
              reviewBody: r.body,
              name: r.title,
            })),
          }}
        />
      )}

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 sm:pt-40 pb-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.18),transparent_70%)]" />
          <div className="absolute inset-0 bg-grid-tight mask-radial-fade opacity-30" />
        </div>

        <div className="container-tight relative text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary-300">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
            Reviews
          </span>
          <h1 className="mx-auto max-w-3xl text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.0] text-white">
            Real creators.{' '}
            <span className="accent-gradient">Real reviews.</span>
          </h1>

          {count > 0 ? (
            <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    className={`h-4 w-4 ${n <= Math.round(avg) ? 'fill-amber-400 text-amber-400' : 'text-white/20'}`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-white tabular-nums">{avg.toFixed(1)}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/45">
                {count} review{count === 1 ? '' : 's'}
              </span>
            </div>
          ) : (
            <p className="mt-6 mx-auto max-w-xl text-base sm:text-lg text-white/60 leading-relaxed">
              Reviews coming soon. Be the first to leave one.
            </p>
          )}
        </div>
      </section>

      {/* LIST */}
      <main className="container-tight pt-4 pb-20">
        <ReviewsList reviews={reviews} />
      </main>

      {/* CTA */}
      <section className="container-tight pb-24">
        <div className="rounded-2xl border border-white/[0.10] bg-gradient-to-br from-primary-500/[0.12] via-primary-500/[0.04] to-transparent p-8 sm:p-12 text-center">
          <h3 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-white">
            See for yourself.{' '}
            <span className="accent-gradient">First analysis is free.</span>
          </h3>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
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
