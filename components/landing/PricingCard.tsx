'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  popular?: boolean;
  icon?: 'crown' | 'zap' | 'users';
  ctaText?: string;
  ctaLink?: string;
}

const planFeatures: Record<string, string[]> = {
  Free: [
    '1 analysis / month',
    'Full AI grading + retention forecast',
    'Hook & CTA feedback',
    'Email support',
  ],
  Creator: [
    '15 analyses / month',
    'Detailed retention analysis',
    'Hook & CTA optimization',
    'Priority email support',
  ],
  Pro: [
    '50 analyses / month',
    'Advanced retention heatmaps',
    'Competitor benchmarking',
    'Priority support (12h)',
    'Performance trend tracking',
  ],
  Agency: [
    '200 analyses / month',
    'White-label reports',
    'Multi-account dashboard',
    'Dedicated account manager',
    'API access & integrations',
  ],
};

const planCta: Record<string, { text: string; link: string }> = {
  Free: { text: 'Start free', link: '/signup' },
  Creator: { text: 'Start Creator', link: '/signup' },
  Pro: { text: 'Start Pro', link: '/signup' },
  Agency: { text: 'Contact sales', link: 'mailto:business@thecontentlabs.io' },
};

const perAnalysisCost: Record<string, string> = {
  Creator: '≈ $0.67/analysis',
  Pro: '≈ $0.50/analysis',
  Agency: '≈ $0.40/analysis',
};

export const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  period,
  description,
  popular = false,
  ctaText,
  ctaLink,
}) => {
  const features = planFeatures[name] ?? planFeatures['Free'];
  const defaultCta = planCta[name] ?? planCta['Free'];
  const resolvedCtaText = ctaText ?? defaultCta.text;
  const resolvedCtaLink = ctaLink ?? defaultCta.link;
  const perCost = perAnalysisCost[name];
  const isMailto = resolvedCtaLink.startsWith('mailto:');

  const cta = (
    <span className="inline-flex w-full items-center justify-center gap-2">
      {resolvedCtaText}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </span>
  );

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className={`group relative flex flex-col rounded-xl p-6 transition-all sm:p-7 ${
        popular
          ? 'border border-primary-500/50 bg-gradient-to-b from-primary-500/[0.12] via-primary-500/[0.04] to-transparent shadow-2xl shadow-primary-500/20'
          : 'border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'
      }`}
    >
      {/* popular card gets a bloom in the background */}
      {popular && (
        <>
          <div className="pointer-events-none absolute -top-24 -right-20 h-48 w-48 rounded-full bg-primary-500/20 blur-3xl" />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-xl"
            style={{
              background:
                'conic-gradient(from var(--pc-angle, 0deg), transparent 60%, rgba(168,85,247,0.6), transparent 100%)',
              animation: 'pcSpin 6s linear infinite',
              padding: '1px',
              WebkitMask:
                'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
          <style>{`
            @property --pc-angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
            @keyframes pcSpin { to { --pc-angle: 360deg; } }
          `}</style>
        </>
      )}

      {popular && (
        <span className="absolute -top-3 left-6 z-10 inline-flex items-center gap-1.5 rounded-full border border-primary-500/40 bg-neutral-950 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary-300 shadow-lg shadow-primary-500/30">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-400" />
          Most popular
        </span>
      )}

      <div className="mb-6 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-widest text-white/40">
          {name}
        </span>
      </div>

      <div className="mb-4 flex items-baseline gap-1">
        <span className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {price}
        </span>
        <span className="text-sm text-white/40">{period}</span>
      </div>

      {perCost && (
        <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-primary-400/80">
          {perCost}
        </p>
      )}

      <p className="mb-6 text-sm leading-relaxed text-white/50">{description}</p>

      <ul className="mb-8 flex-1 space-y-2.5 border-t border-white/5 pt-6">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-white/70">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" strokeWidth={2.5} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {isMailto ? (
        <a
          href={resolvedCtaLink}
          className={`relative block w-full rounded-lg px-4 py-3 text-center text-sm font-semibold transition-all ${
            popular
              ? 'bg-gradient-to-br from-primary-500 to-secondary-600 text-white shadow-lg shadow-primary-500/40 hover:shadow-xl hover:shadow-primary-500/60'
              : 'border border-white/10 bg-white/[0.03] text-white/80 hover:border-primary-400/30 hover:bg-primary-500/10 hover:text-white'
          }`}
        >
          {cta}
        </a>
      ) : (
        <Link
          href={resolvedCtaLink}
          className={`relative block w-full rounded-lg px-4 py-3 text-center text-sm font-semibold transition-all ${
            popular
              ? 'bg-gradient-to-br from-primary-500 to-secondary-600 text-white shadow-lg shadow-primary-500/40 hover:shadow-xl hover:shadow-primary-500/60'
              : 'border border-white/10 bg-white/[0.03] text-white/80 hover:border-primary-400/30 hover:bg-primary-500/10 hover:text-white'
          }`}
        >
          {cta}
        </Link>
      )}
    </motion.div>
  );
};
