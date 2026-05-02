'use client';

import React from 'react';
import { ArrowRight, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { getDistinctId, getFirstTouch, track } from '@/lib/analytics';

const TCL_HOME = 'https://thecontentlabs.app';

type Variant = 'hero' | 'banner' | 'card' | 'inline' | 'footer' | 'sidebar';

interface TCLPromoCardProps {
  variant?: Variant;
  source: string; // utm_medium, be specific about the placement
  className?: string;
  headline?: string;
  subheadline?: string;
  cta?: string;
}

function buildHref(source: string): string {
  const params = new URLSearchParams({
    utm_source: 'prealgo',
    utm_medium: source,
  });

  const distinctId = getDistinctId();
  if (distinctId) params.set('ph_distinct_id', distinctId);

  // Forward original acquisition source so TCL signups carry the true origin,
  // not just "prealgo". e.g. someone arriving via google → prealgo → TCL still
  // shows google as their original source on the TCL side.
  const firstTouch = getFirstTouch();
  if (firstTouch?.utm_source) params.set('prealgo_first_utm_source', firstTouch.utm_source);
  if (firstTouch?.utm_medium) params.set('prealgo_first_utm_medium', firstTouch.utm_medium);
  if (firstTouch?.utm_campaign) params.set('prealgo_first_utm_campaign', firstTouch.utm_campaign);
  if (firstTouch?.referring_domain) params.set('prealgo_first_referrer_domain', firstTouch.referring_domain);

  return `${TCL_HOME}?${params.toString()}`;
}

function fireCtaClick(source: string, variant: Variant) {
  track('prealgo_tcl_cta_clicked', {
    placement: source,
    variant,
  });
}

export const TCLPromoCard: React.FC<TCLPromoCardProps> = ({
  variant = 'card',
  source,
  className = '',
  headline,
  subheadline,
  cta,
}) => {
  const href = buildHref(source);
  const onCtaClick = () => fireCtaClick(source, variant);

  if (variant === 'hero') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onCtaClick}
        className={`group relative block overflow-hidden rounded-2xl border border-coral-500/20 bg-gradient-to-br from-coral-600/[0.08] via-coral-500/[0.04] to-transparent p-6 transition-all hover:border-coral-500/40 hover:from-coral-600/[0.12] ${className}`}
      >
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-coral-500/15 blur-3xl pointer-events-none" />
        <div className="absolute right-0 top-0 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-coral-300 bg-coral-500/10 border-l border-b border-coral-500/20 rounded-bl-lg">
          Trusted by 47,598 creators
        </div>
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-coral-500 to-coral-600 shadow-lg shadow-coral-500/30">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-widest text-coral-400 mb-1">The Content Labs</p>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
              {headline || 'Stop guessing what to post.'}
            </h3>
            <p className="text-sm text-white/60 mt-1.5 leading-relaxed">
              {subheadline || 'Connect your TikTok, Instagram, and YouTube. TCL audits your content, breaks down your competitors\' best videos, and hands you a 30-day calendar with full scripts. Free in under 60 seconds.'}
            </p>
          </div>
          <div className="flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-coral-500 to-coral-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-coral-500/30 group-hover:shadow-coral-500/50 group-hover:scale-[1.02] transition-all">
              {cta || 'Get Free Audit'}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </a>
    );
  }

  if (variant === 'banner') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onCtaClick}
        className={`group block rounded-xl border border-coral-500/20 bg-gradient-to-r from-coral-600/[0.08] via-coral-500/[0.04] to-transparent p-4 transition-all hover:border-coral-500/40 ${className}`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-coral-500 to-coral-600 shadow-md shadow-coral-500/25">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">
              {headline || 'Want a full content strategy, not just a grade?'}
            </p>
            <p className="text-xs text-white/55 mt-0.5">
              {subheadline || 'Connect TT/IG/YouTube. TCL audits your content + competitors and builds your 30-day calendar with scripts.'}
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-coral-500 px-4 py-2 text-xs font-bold text-white whitespace-nowrap group-hover:bg-coral-400 transition-colors">
            {cta || 'Try Free'}
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
          <ArrowRight className="sm:hidden h-4 w-4 text-coral-400 flex-shrink-0" />
        </div>
      </a>
    );
  }

  if (variant === 'card') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onCtaClick}
        className={`group block rounded-2xl border border-coral-500/20 bg-gradient-to-br from-coral-600/[0.06] to-transparent p-5 transition-all hover:border-coral-500/40 hover:bg-coral-600/[0.10] ${className}`}
      >
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-coral-500 to-coral-600 shadow-md shadow-coral-500/25">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-widest text-coral-400 mb-1">The Content Labs</p>
            <p className="text-base font-bold text-white leading-snug">
              {headline || 'Get your full content strategy free'}
            </p>
            <p className="text-sm text-white/55 mt-1.5 leading-relaxed">
              {subheadline || 'PreAlgo grades single uploads. TCL connects to your TikTok, Instagram, and YouTube to audit your content, break down competitors, and build your 30-day plan with full scripts.'}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-md bg-coral-500/10 px-2 py-0.5 text-[10px] font-medium text-coral-300">
                <Sparkles className="h-2.5 w-2.5" /> TT / IG / YT audit
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-coral-500/10 px-2 py-0.5 text-[10px] font-medium text-coral-300">
                <TrendingUp className="h-2.5 w-2.5" /> Competitor breakdown
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-coral-500/10 px-2 py-0.5 text-[10px] font-medium text-coral-300">
                <Zap className="h-2.5 w-2.5" /> 30-day calendar
              </span>
            </div>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-coral-300 group-hover:text-coral-200 transition-colors">
              {cta || 'Get Free Audit'}
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </a>
    );
  }

  if (variant === 'inline') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onCtaClick}
        className={`group inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-coral-500 to-coral-600 px-4 py-2 text-sm font-bold text-white shadow-md shadow-coral-500/25 hover:shadow-coral-500/40 hover:scale-[1.02] transition-all ${className}`}
      >
        <Sparkles className="h-3.5 w-3.5" />
        {cta || 'Try The Content Labs'}
        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
      </a>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`rounded-2xl border border-coral-500/20 bg-gradient-to-br from-coral-600/[0.06] via-transparent to-coral-500/[0.04] p-6 ${className}`}>
        <div className="flex flex-col items-center text-center">
          <div className="font-mono text-[10px] uppercase tracking-widest text-coral-400 mb-2">Powered by The Content Labs</div>
          <h3 className="text-xl font-bold text-white mb-2 leading-tight">
            {headline || 'Want this for your own content?'}
          </h3>
          <p className="text-sm text-white/60 max-w-md mb-5">
            {subheadline || 'Connect your TikTok, Instagram, and YouTube. TCL audits your videos, breaks down your competitors, and builds your 30-day content strategy with hooks + scripts. PreAlgo grades single uploads using TCL\'s 11,000+ video database.'}
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onCtaClick}
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-coral-500 to-coral-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-coral-500/30 hover:shadow-coral-500/50 hover:scale-[1.02] transition-all"
          >
            Get your free audit
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <p className="text-[11px] text-white/30 mt-3">Free · No credit card required · 60 seconds</p>
        </div>
      </div>
    );
  }

  // sidebar variant: compact persistent CTA for the nav rail
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onCtaClick}
      className={`group block rounded-xl border border-coral-500/20 bg-gradient-to-br from-coral-600/[0.10] to-coral-500/[0.04] p-3 transition-all hover:border-coral-500/40 hover:from-coral-600/[0.18] ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-coral-500 to-coral-600 shadow shadow-coral-500/30">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-white leading-tight">The Content Labs</p>
          <p className="text-[10px] text-coral-300/80 leading-tight mt-0.5">Get your free strategy →</p>
        </div>
      </div>
    </a>
  );
};
