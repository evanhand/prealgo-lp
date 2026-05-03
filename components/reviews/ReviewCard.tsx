import React from 'react';
import { Star, Music2, Instagram, Youtube } from 'lucide-react';
import type { Review } from '@/lib/reviews';

const SOCIAL_ICONS: Record<string, React.ElementType> = {
  tiktok: Music2,
  instagram: Instagram,
  youtube: Youtube,
};

const SOCIAL_URLS: Record<string, (h: string) => string> = {
  tiktok:    (h) => `https://tiktok.com/@${h}`,
  instagram: (h) => `https://instagram.com/${h}`,
  youtube:   (h) => `https://youtube.com/@${h}`,
  x:         (h) => `https://x.com/${h}`,
};

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

export function ReviewCard({ review, featured }: { review: Review; featured?: boolean }) {
  const name = review.display_name || review.reviewer_full_name || 'Anonymous';
  const Icon = review.social_platform === 'x' ? XIcon : SOCIAL_ICONS[review.social_platform ?? ''];
  const socialUrl =
    review.social_platform && review.social_handle
      ? SOCIAL_URLS[review.social_platform](review.social_handle)
      : null;

  return (
    <article
      className={`flex h-full flex-col rounded-2xl border p-5 sm:p-6 transition-colors ${
        featured
          ? 'border-primary-400/40 bg-gradient-to-br from-primary-500/[0.10] via-primary-500/[0.02] to-transparent'
          : 'border-white/[0.08] bg-white/[0.02]'
      }`}
    >
      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className={`h-4 w-4 ${n <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-white/15'}`}
          />
        ))}
      </div>

      <h3 className="text-base sm:text-lg font-bold tracking-tight text-white leading-snug mb-2">
        {review.title}
      </h3>

      <p className="text-sm text-white/70 leading-relaxed flex-1 whitespace-pre-line">
        {review.body}
      </p>

      <div className="mt-5 pt-5 border-t border-white/[0.06] flex items-center gap-3">
        {review.reviewer_avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.reviewer_avatar}
            alt=""
            className="h-9 w-9 rounded-full object-cover ring-1 ring-white/10 flex-shrink-0"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500/20 border border-primary-500/30 text-sm font-bold text-primary-200 flex-shrink-0">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-white truncate">{name}</div>
          {socialUrl && Icon && review.social_handle && (
            <a
              href={socialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-white/45 hover:text-primary-300 transition-colors"
            >
              <Icon className="h-3 w-3" />
              @{review.social_handle}
            </a>
          )}
        </div>
        {featured && (
          <span className="inline-flex items-center rounded border border-primary-500/40 bg-primary-500/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-primary-200 flex-shrink-0">
            Featured
          </span>
        )}
      </div>
    </article>
  );
}
