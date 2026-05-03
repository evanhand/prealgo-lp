import React from 'react';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import { ReviewCard } from './ReviewCard';
import type { Review } from '@/lib/reviews';
import { aggregateRating } from '@/lib/reviews';

export function ReviewsHomepageSection({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;

  const featured = reviews.filter((r) => r.is_featured).slice(0, 6);
  const display = featured.length >= 3 ? featured : reviews.slice(0, 6);
  const { avg, count } = aggregateRating(reviews);

  return (
    <section className="container-tight py-20 sm:py-28">
      <div className="text-center mb-10">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary-300">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
          Reviews
        </span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-white max-w-3xl mx-auto">
          Built by creators.{' '}
          <span className="accent-gradient">Reviewed by them too.</span>
        </h2>

        <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2">
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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {display.map((r) => (
          <ReviewCard key={r.id} review={r} featured={r.is_featured} />
        ))}
      </div>

      {count > display.length && (
        <div className="mt-10 text-center">
          <Link
            href="/reviews"
            className="group inline-flex items-center gap-2 rounded-md border border-white/12 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white/85 hover:bg-white/[0.06] transition-colors"
          >
            See all {count} reviews
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      )}
    </section>
  );
}
