'use client';

import React, { useMemo, useState } from 'react';
import { Star } from 'lucide-react';
import { ReviewCard } from './ReviewCard';
import type { Review } from '@/lib/reviews';

type Filter = 'all' | 5 | 4 | 3 | 2 | 1;

export function ReviewsList({ reviews }: { reviews: Review[] }) {
  const [filter, setFilter] = useState<Filter>('all');

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: reviews.length, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      c[String(r.rating)] = (c[String(r.rating)] ?? 0) + 1;
    });
    return c;
  }, [reviews]);

  const filtered = useMemo(() => {
    return filter === 'all' ? reviews : reviews.filter((r) => r.rating === filter);
  }, [reviews, filter]);

  if (reviews.length === 0) {
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] py-16 text-center">
        <p className="text-base text-white/55">No reviews yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center gap-1 rounded-xl border border-white/[0.08] bg-white/[0.02] p-1.5 w-fit mx-auto">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-widest transition-colors ${
            filter === 'all' ? 'bg-white text-neutral-950' : 'text-white/65 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          All
          <span className={`ml-1.5 font-mono ${filter === 'all' ? 'text-neutral-500' : 'text-white/35'}`}>
            {counts.all}
          </span>
        </button>
        {[5, 4, 3, 2, 1].map((n) => (
          <button
            key={n}
            onClick={() => setFilter(n as Filter)}
            disabled={counts[String(n)] === 0}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
              filter === n ? 'bg-white text-neutral-950' : 'text-white/65 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Star className={`h-3 w-3 ${filter === n ? 'fill-amber-500 text-amber-500' : 'fill-amber-400 text-amber-400'}`} />
            {n}
            <span className={`font-mono ${filter === n ? 'text-neutral-500' : 'text-white/35'}`}>
              {counts[String(n)]}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((r) => (
          <ReviewCard key={r.id} review={r} featured={r.is_featured && filter === 'all'} />
        ))}
      </div>
    </>
  );
}
