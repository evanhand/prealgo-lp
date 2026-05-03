'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Brain,
  LineChart,
  Sparkles,
  ArrowRight,
  Zap,
  AlertTriangle,
  Target,
  Clock,
  TrendingDown,
  ChevronDown,
  Play,
  Pause,
} from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { PricingCard } from './PricingCard';
import { SocialProofBar } from './SocialProofBar';
import { HowItWorks } from './HowItWorks';
import { sampleAnalysis } from '@/lib/sampleAnalysis';
import { AnimatedCounter } from '../AnimatedCounter';

// Carousel of example analyses for the hero - shows range of outcomes as product surfaces
type HeroCardTheme = 'emerald' | 'primary' | 'rose';
interface HeroCardData {
  id: string;
  grade: string;
  gradeLabel: string;
  title: string;
  platform: 'TikTok' | 'Reels' | 'Shorts';
  views: string;
  hookPct: number;
  retentionPct: number;
  retentionPts: number[];
  dropoffLabel: string | null;
  topFix: string;
  caption: string;
  theme: HeroCardTheme;
}

const heroCards: HeroCardData[] = [
  {
    id: 'AV-0481',
    grade: 'A+',
    gradeLabel: 'Elite',
    title: 'I tried every viral trend for 24 hours',
    platform: 'TikTok',
    views: '2.4M - 4.8M',
    hookPct: 96,
    retentionPct: 84,
    retentionPts: [100, 98, 96, 94, 92, 89, 86, 82],
    dropoffLabel: null,
    topFix: 'No changes needed - post as-is.',
    caption: 'Elite tier - this one is going viral.',
    theme: 'emerald',
  },
  {
    id: 'AV-0482',
    grade: sampleAnalysis.grade as string,
    gradeLabel: 'Great',
    title: sampleAnalysis.title,
    platform: 'Reels',
    views: sampleAnalysis.estimated_views_range_as_is as string,
    hookPct: 92,
    retentionPct: sampleAnalysis.predicted_average_watch_percentage,
    retentionPts: [100, 94, 88, 82, 68, 65, 62, 48],
    dropoffLabel: '↓ 14s',
    topFix: 'Rewrite CTA for +18% profile visits.',
    caption: 'Strong performer - one fix away from viral.',
    theme: 'primary',
  },
  {
    id: 'AV-0483',
    grade: 'D',
    gradeLabel: 'Needs work',
    title: 'Random thoughts at 3am',
    platform: 'Shorts',
    views: '800 - 2.5K',
    hookPct: 18,
    retentionPct: 23,
    retentionPts: [100, 72, 48, 35, 28, 24, 21, 18],
    dropoffLabel: '↓ 2s',
    topFix: 'Rewrite hook - opening has no curiosity gap.',
    caption: "Don't post this - here's why.",
    theme: 'rose',
  },
];

const heroThemes: Record<HeroCardTheme, { grade: string; ring: string; accent: string; accentSoft: string; gradeBg: string; glow: string }> = {
  emerald: {
    grade: 'from-emerald-400 to-teal-500',
    ring: 'ring-emerald-500/40',
    accent: 'text-emerald-400',
    accentSoft: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    gradeBg: 'shadow-emerald-500/40',
    glow: 'rgba(16,185,129,0.5)',
  },
  primary: {
    grade: 'from-primary-400 to-secondary-500',
    ring: 'ring-primary-500/40',
    accent: 'text-primary-300',
    accentSoft: 'bg-primary-500/10 text-primary-300 border-primary-500/20',
    gradeBg: 'shadow-primary-500/40',
    glow: 'rgba(168,85,247,0.5)',
  },
  rose: {
    grade: 'from-rose-400 to-red-500',
    ring: 'ring-rose-500/40',
    accent: 'text-rose-400',
    accentSoft: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
    gradeBg: 'shadow-rose-500/40',
    glow: 'rgba(244,63,94,0.5)',
  },
};

const HeroShowcaseCard: React.FC<{ card: HeroCardData; active: boolean }> = ({ card, active }) => {
  const theme = heroThemes[card.theme];
  const pts = card.retentionPts;
  const pathD = `M 0 ${60 - (pts[0] / 100) * 50} ${pts
    .map((p, i) => `L ${(i / (pts.length - 1)) * 200} ${60 - (p / 100) * 50}`)
    .join(' ')}`;
  const areaD = `${pathD} L 200 60 L 0 60 Z`;

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/90 shadow-2xl backdrop-blur-xl ${active ? `ring-1 ${theme.ring}` : ''}`}
      animate={active ? { y: [0, -4, 0] } : { y: 0 }}
      transition={{ duration: 5, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
    >
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${theme.glow.replace('0.5', '0.12')}, transparent 70%)`,
        }}
      />
      {/* subtle grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid-tight opacity-30" />

      {/* top bar: analysis id + status light */}
      <div className="relative flex items-center justify-between border-b border-white/5 px-4 py-2.5">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
          <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-primary-500/20 text-primary-300">
            <Sparkles className="h-2.5 w-2.5" />
          </div>
          <span>Analysis · {card.id}</span>
        </div>
        <div className={`flex items-center gap-1.5 rounded-full border ${theme.accentSoft} px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest`}>
          <span className={`h-1.5 w-1.5 rounded-full ${active ? 'animate-pulse' : ''}`} style={{ backgroundColor: theme.glow.replace('0.5', '1') }} />
          Ready
        </div>
      </div>

      <div className="relative p-6">
        {/* Grade row */}
        <div className="flex items-center gap-4">
          <div
            className={`relative flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${theme.grade} shadow-lg ${theme.gradeBg}`}
            style={{ boxShadow: `0 0 36px ${theme.glow}` }}
          >
            <span className="text-3xl font-black text-white drop-shadow-md">{card.grade}</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                Grade
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">·</span>
              <span className="rounded border border-white/10 bg-white/5 px-1.5 py-[1px] font-mono text-[9px] uppercase tracking-wider text-white/60">
                {card.platform}
              </span>
            </div>
            <div className={`mt-0.5 text-base font-semibold ${theme.accent}`}>
              {card.gradeLabel}
            </div>
            <p className="mt-1 truncate text-xs font-medium text-white/70" title={card.title}>
              {card.title}
            </p>
          </div>
        </div>

        {/* Views prediction */}
        <div className="mt-4 flex items-baseline justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            Predicted views
          </span>
          <span className="text-sm font-bold text-white">{card.views}</span>
        </div>
      </div>

      {/* Retention forecast */}
      <div className="relative mx-5 rounded-lg border border-white/5 bg-white/[0.02] p-3">
        <div className="mb-1 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            Retention · {card.retentionPct}%
          </span>
          {card.dropoffLabel && (
            <span className="font-mono text-[10px] text-amber-400">{card.dropoffLabel} dropoff</span>
          )}
        </div>
        <svg viewBox="0 0 200 60" className="h-12 w-full">
          <defs>
            <linearGradient id={`hero-grad-${card.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={theme.glow.replace('0.5', '0.4')} />
              <stop offset="100%" stopColor={theme.glow.replace('0.5', '0')} />
            </linearGradient>
          </defs>
          <motion.path
            key={`${card.id}-area-${active ? 1 : 0}`}
            d={areaD}
            fill={`url(#hero-grad-${card.id})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 1 : 0.6 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <motion.path
            key={`${card.id}-line-${active ? 1 : 0}`}
            d={pathD}
            fill="none"
            stroke={theme.glow.replace('0.5', '1')}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: active ? 1 : 0.6 }}
            transition={{ duration: active ? 1.4 : 0.6, ease: 'easeOut' }}
          />
          {card.dropoffLabel && (
            <motion.line
              x1={((pts.findIndex((p, i) => i > 0 && p < pts[i - 1] * 0.85) / (pts.length - 1)) * 200) || 100}
              y1="0"
              x2={((pts.findIndex((p, i) => i > 0 && p < pts[i - 1] * 0.85) / (pts.length - 1)) * 200) || 100}
              y2="60"
              stroke="#f59e0b"
              strokeWidth="0.8"
              strokeDasharray="2 3"
              initial={{ opacity: 0 }}
              animate={{ opacity: active ? 0.8 : 0.4 }}
              transition={{ delay: 1.1 }}
            />
          )}
        </svg>
      </div>

      {/* Top fix row */}
      <div className="relative mx-5 mt-3 flex items-start gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-3">
        <div className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md ${theme.accentSoft}`}>
          <Zap className="h-3 w-3" />
        </div>
        <div className="min-w-0">
          <div className="font-mono text-[9px] uppercase tracking-widest text-white/30">Top fix</div>
          <p className="text-xs text-white/75">{card.topFix}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="relative flex items-center justify-between border-t border-white/5 px-5 py-2.5">
        <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">prealgo.com</span>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] tabular-nums text-white/30">
            Hook {card.hookPct}%
          </span>
          <div className="h-1 w-12 overflow-hidden rounded-full bg-white/10">
            <motion.div
              key={`hook-${card.id}-${active ? 1 : 0}`}
              className="h-full rounded-full"
              style={{ backgroundColor: theme.glow.replace('0.5', '1') }}
              initial={{ width: 0 }}
              animate={{ width: `${card.hookPct}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const painPoints = [
  {
    icon: TrendingDown,
    value: 90,
    suffix: '%',
    text: 'of videos get fewer than 1,000 views',
    color: 'rose',
    hex: '#f43f5e',
  },
  {
    icon: Clock,
    value: 6,
    suffix: '+ hrs',
    text: 'spent making content that flops',
    color: 'amber',
    hex: '#f59e0b',
  },
  {
    icon: AlertTriangle,
    value: 0,
    suffix: '',
    text: 'feedback until after you\'ve posted',
    color: 'orange',
    hex: '#f97316',
  },
];

type FeaturePreviewKey = 'predict' | 'retention' | 'fixes' | 'benchmark';

const features: Array<{
  icon: typeof Brain;
  title: string;
  description: string;
  preview: FeaturePreviewKey;
}> = [
  {
    icon: Brain,
    title: 'Predict before you post',
    description:
      'Predicted view range, hook rating, and viral probability - before you hit publish.',
    preview: 'predict',
  },
  {
    icon: LineChart,
    title: 'See where viewers drop off',
    description:
      'Retention forecast pinpoints the exact moments viewers lose interest so you can fix them.',
    preview: 'retention',
  },
  {
    icon: Sparkles,
    title: 'Specific fixes, not vague advice',
    description:
      'Actionable changes to your hook, pacing, CTA, and structure that actually move the numbers.',
    preview: 'fixes',
  },
  {
    icon: Target,
    title: 'Benchmark against winners',
    description:
      'See how your content stacks up against top performers in your niche, side by side.',
    preview: 'benchmark',
  },
];

/** Interactive mini-preview per feature - animates in view, animates more on hover */
const FeaturePreview: React.FC<{ kind: FeaturePreviewKey; active: boolean }> = ({ kind, active }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  if (kind === 'predict') {
    return (
      <div ref={ref} className="relative h-28 overflow-hidden rounded-lg border border-white/10 bg-neutral-950/60 p-4">
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">Predicted view range</div>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="bg-gradient-to-br from-primary-200 to-primary-500 bg-clip-text text-2xl font-bold text-transparent">
            {isInView ? <AnimatedCounter value={2.4} decimals={1} duration={1.4} /> : '0.0'}M
          </span>
          <span className="text-white/40">-</span>
          <span className="bg-gradient-to-br from-primary-200 to-primary-500 bg-clip-text text-2xl font-bold text-transparent">
            {isInView ? <AnimatedCounter value={4.8} decimals={1} duration={1.6} /> : '0.0'}M
          </span>
          <span className="ml-1 text-xs text-white/40">views</span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
            initial={{ width: 0 }}
            animate={isInView ? { width: active ? '92%' : '74%' } : { width: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>
      </div>
    );
  }

  if (kind === 'retention') {
    const pts = [100, 96, 88, 82, 68, 65, 62, 48];
    return (
      <div ref={ref} className="relative h-28 overflow-hidden rounded-lg border border-white/10 bg-neutral-950/60 p-4">
        <div className="mb-1 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Retention forecast</span>
          <span className="font-mono text-[10px] text-primary-400">72% avg</span>
        </div>
        <svg viewBox="0 0 200 60" className="h-16 w-full">
          <defs>
            <linearGradient id="feat-retention-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* baseline */}
          <line x1="0" y1="58" x2="200" y2="58" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          {/* dropoff marker */}
          <motion.line
            x1="100"
            y1="0"
            x2="100"
            y2="60"
            stroke="#f59e0b"
            strokeWidth="1"
            strokeDasharray="2 3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: active ? 0.8 : 0.5 } : { opacity: 0 }}
            transition={{ delay: 1.2 }}
          />
          {/* area under line */}
          <motion.path
            d={`M 0 ${60 - (pts[0] / 100) * 50} ${pts
              .map((p, i) => `L ${(i / (pts.length - 1)) * 200} ${60 - (p / 100) * 50}`)
              .join(' ')} L 200 60 L 0 60 Z`}
            fill="url(#feat-retention-grad)"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.path
            d={`M 0 ${60 - (pts[0] / 100) * 50} ${pts
              .map((p, i) => `L ${(i / (pts.length - 1)) * 200} ${60 - (p / 100) * 50}`)
              .join(' ')}`}
            fill="none"
            stroke="#a855f7"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          />
        </svg>
      </div>
    );
  }

  if (kind === 'fixes') {
    const target = '"This is the only cheese board recipe I make now."';
    const [typed, setTyped] = useState('');
    useEffect(() => {
      if (!isInView) return;
      if (!active && typed === target) return;
      let i = 0;
      const id = setInterval(() => {
        i += 1;
        setTyped(target.slice(0, i));
        if (i >= target.length) clearInterval(id);
      }, 35);
      return () => clearInterval(id);
    }, [isInView, active]);
    return (
      <div ref={ref} className="relative h-28 overflow-hidden rounded-lg border border-white/10 bg-neutral-950/60 p-4">
        <div className="font-mono text-[10px] uppercase tracking-widest text-primary-400/80">
          → Rewritten hook
        </div>
        <p className="mt-2 text-sm leading-snug text-white/80">
          {typed}
          <motion.span
            className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-primary-400"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
        </p>
      </div>
    );
  }

  // benchmark
  const rows = [
    { label: 'Your hook', value: 68, color: '#a855f7' },
    { label: 'Top 10% in niche', value: 91, color: '#10b981' },
  ];
  return (
    <div ref={ref} className="relative h-28 overflow-hidden rounded-lg border border-white/10 bg-neutral-950/60 p-4">
      <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
        Hook vs niche leaders
      </div>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div key={r.label} className="flex items-center gap-3">
            <span className="w-28 text-[11px] text-white/60">{r.label}</span>
            <div className="flex-1 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: r.color }}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${r.value}%` } : { width: 0 }}
                transition={{ duration: 1, ease: 'easeOut', delay: i * 0.15 }}
              />
            </div>
            <span className="font-mono text-[10px] tabular-nums text-white/60" style={{ color: r.color }}>
              {r.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{
  feature: (typeof features)[number];
  Icon: typeof Brain;
  index: number;
}> = ({ feature, Icon, index }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-6 transition-all hover:border-primary-500/40 hover:shadow-xl hover:shadow-primary-500/10 sm:p-7"
    >
      {/* hover bloom */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary-500/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative flex items-center justify-between">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/80 transition-all group-hover:border-primary-500/40 group-hover:bg-primary-500/10 group-hover:text-primary-300">
          <Icon className="h-5 w-5" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
          / FEATURE.{String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3 className="relative mt-5 text-xl font-semibold tracking-tight text-white sm:text-2xl">
        {feature.title}
      </h3>
      <p className="relative mt-2 text-sm leading-relaxed text-white/50 sm:text-base">
        {feature.description}
      </p>

      <div className="relative mt-5">
        <FeaturePreview kind={feature.preview} active={hovered} />
      </div>
    </motion.div>
  );
};

interface LandingPageContentProps {
  reviewsSlot?: React.ReactNode;
}

export const LandingPageContent: React.FC<LandingPageContentProps> = ({ reviewsSlot }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Hero carousel
  const [activeCard, setActiveCard] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  useEffect(() => {
    if (carouselPaused) return;
    const id = setInterval(() => {
      setActiveCard((i) => (i + 1) % heroCards.length);
    }, 4200);
    return () => clearInterval(id);
  }, [carouselPaused]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative isolate overflow-hidden bg-neutral-950 pt-28 pb-24 sm:pt-32 sm:pb-28 md:pt-40 md:pb-36">
        {/* Background layers */}
        <div className="pointer-events-none absolute inset-0">
          {/* deep purple bloom behind hero */}
          <div className="absolute left-1/2 top-0 h-[900px] w-[1100px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.35),rgba(99,102,241,0.15)_45%,transparent_75%)]" />
          {/* secondary side bloom */}
          <div className="absolute right-0 top-1/3 h-[600px] w-[600px] translate-x-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.25),transparent_70%)]" />
          {/* grid */}
          <div className="absolute inset-0 bg-grid-tech mask-fade-bottom opacity-60" />
          {/* animated scanning line */}
          <motion.div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-400/60 to-transparent"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: ['0%', '100%', '0%'], opacity: [0, 0.8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          {/* grain */}
          <div className="absolute inset-0 bg-noise" />
          {/* edge vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)]" />
        </div>

        <div className="container-tight relative">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-16">
            {/* Copy */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-mono tracking-widest uppercase text-white/60"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-400" />
                </span>
                V2 · Live Analysis Engine
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="text-[44px] font-bold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[82px]"
              >
                Know before
                <br className="hidden sm:block" />
                <span className="accent-gradient">
                  you post.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg lg:mx-0"
              >
                An AI engine trained on thousands of real short-form videos.
                It grades your content, predicts retention, and tells you
                exactly what to fix - before the algorithm decides.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
              >
                <Link
                  href="/signup"
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/40 transition-all hover:shadow-xl hover:shadow-primary-500/60 sm:w-auto"
                >
                  {/* shine sweep on hover */}
                  <span className="pointer-events-none absolute inset-y-0 -left-20 w-20 -skew-x-12 bg-white/30 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
                  <span className="relative z-10 flex items-center gap-2">
                    Analyze your first video
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
                <Link
                  href="/sample"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/80 backdrop-blur-sm transition-all hover:border-primary-400/30 hover:bg-primary-500/10 hover:text-white sm:w-auto"
                >
                  See a sample report
                  <ArrowRight className="h-4 w-4 text-white/40 transition-all group-hover:translate-x-0.5 group-hover:text-primary-400" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-white/30 lg:justify-start"
              >
                <span>→ Free forever tier</span>
                <span>→ No card required</span>
                <span>→ Results in &lt; 2 min</span>
              </motion.div>
            </div>

            {/* Product preview - stacked card carousel */}
            <div
              className="relative mx-auto w-full max-w-md lg:max-w-none"
              onMouseEnter={() => setCarouselPaused(true)}
              onMouseLeave={() => setCarouselPaused(false)}
            >
              {/* animated glow behind the active card */}
              <motion.div
                className="pointer-events-none absolute inset-8 rounded-3xl bg-primary-500/30 blur-3xl"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Card stack (three cards, rotating) */}
              <div className="relative h-[480px] [perspective:1800px] sm:h-[520px]">
                {heroCards.map((card, i) => {
                  const offset = (i - activeCard + heroCards.length) % heroCards.length;
                  // offset: 0 = front/active, 1 = behind-right, 2 = further-back-left
                  const positions = [
                    { x: '0%', y: '0%', rotateY: 0, rotateZ: 0, scale: 1, opacity: 1, blur: 0, z: 30 },
                    { x: '22%', y: '8%', rotateY: -14, rotateZ: 5, scale: 0.9, opacity: 0.5, blur: 2, z: 20 },
                    { x: '-18%', y: '14%', rotateY: 14, rotateZ: -4, scale: 0.82, opacity: 0.25, blur: 5, z: 10 },
                  ];
                  const pos = positions[offset] ?? positions[2];
                  return (
                    <motion.button
                      key={i}
                      type="button"
                      onClick={() => {
                        setActiveCard(i);
                        setCarouselPaused(true);
                      }}
                      className="absolute inset-x-0 mx-auto w-full max-w-[380px] cursor-pointer text-left sm:max-w-[440px]"
                      style={{ zIndex: pos.z, transformStyle: 'preserve-3d' }}
                      animate={{
                        x: pos.x,
                        y: pos.y,
                        rotateY: pos.rotateY,
                        rotateZ: pos.rotateZ,
                        scale: pos.scale,
                        opacity: pos.opacity,
                        filter: `blur(${pos.blur}px)`,
                      }}
                      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                    >
                      <HeroShowcaseCard card={card} active={offset === 0} />
                    </motion.button>
                  );
                })}
              </div>

              {/* Caption + dots */}
              <div className="relative z-40 mt-6 flex flex-col items-center gap-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCard}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-full border border-white/10 bg-neutral-950/80 px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-white/70 backdrop-blur-lg"
                  >
                    {heroCards[activeCard].caption}
                  </motion.div>
                </AnimatePresence>
                <div className="flex items-center gap-2">
                  {heroCards.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setActiveCard(i);
                        setCarouselPaused(true);
                      }}
                      aria-label={`Show card ${i + 1}`}
                      className="group relative h-1.5 overflow-hidden rounded-full bg-white/10"
                      style={{ width: i === activeCard ? 36 : 14 }}
                    >
                      {i === activeCard && !carouselPaused && (
                        <motion.span
                          key={`${activeCard}-pulse`}
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-400 to-primary-500"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 4.2, ease: 'linear' }}
                        />
                      )}
                      {i === activeCard && carouselPaused && (
                        <span className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-500" />
                      )}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setCarouselPaused((p) => !p)}
                    className="ml-2 flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/40 transition-colors hover:border-white/20 hover:text-white/70"
                    aria-label={carouselPaused ? 'Resume carousel' : 'Pause carousel'}
                  >
                    {carouselPaused ? <Play className="h-2.5 w-2.5" /> : <Pause className="h-2.5 w-2.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <SocialProofBar />

      {/* ── PROBLEM ── */}
      <section className="relative overflow-hidden border-t border-white/5 bg-neutral-950 py-24 sm:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-rose-500/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-0 h-[500px] w-[500px] translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-grid-tight opacity-30" />
        </div>

        <div className="container-tight relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="mb-16 max-w-2xl"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-rose-300">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
              01 · The Problem
            </span>
            <h2 className="text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
              Most creators{' '}
              <span className="bg-gradient-to-br from-rose-300 to-rose-500 bg-clip-text text-transparent">
                post and pray.
              </span>
            </h2>
            <p className="mt-4 text-base text-white/50 sm:text-lg">
              The algorithm decides your fate after it's too late to change anything.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
            {painPoints.map((point, index) => {
              const Icon = point.icon;
              const colorBorder = {
                rose: 'hover:border-rose-500/40 hover:shadow-rose-500/20',
                amber: 'hover:border-amber-500/40 hover:shadow-amber-500/20',
                orange: 'hover:border-orange-500/40 hover:shadow-orange-500/20',
              }[point.color];
              const colorBg = {
                rose: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
                amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
                orange: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
              }[point.color];
              const colorText = {
                rose: 'from-rose-200 to-rose-500',
                amber: 'from-amber-200 to-amber-500',
                orange: 'from-orange-200 to-orange-500',
              }[point.color];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={`group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-transparent p-6 transition-all hover:shadow-xl sm:p-7 ${colorBorder}`}
                >
                  {/* corner glow */}
                  <div
                    className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(closest-side, ${point.hex}30, transparent 70%)` }}
                  />

                  <div className="relative flex items-center justify-between">
                    <span
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${colorBg}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="relative mt-7">
                    <div
                      className={`flex items-baseline gap-1 bg-gradient-to-br bg-clip-text font-bold tracking-tight text-transparent ${colorText}`}
                    >
                      <AnimatedCounter
                        value={point.value}
                        duration={1.6}
                        className="text-5xl sm:text-6xl"
                      />
                      <span className="text-2xl sm:text-3xl">{point.suffix}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
                      {point.text}
                    </p>
                  </div>

                  {/* mini graphic per card */}
                  <div className="relative mt-6 h-12 overflow-hidden rounded-lg border border-white/[0.05] bg-neutral-950/60 p-2">
                    {point.color === 'rose' && (
                      // Downward trend line
                      <svg viewBox="0 0 200 32" className="h-full w-full">
                        <motion.path
                          d="M 0 6 L 30 8 L 60 12 L 90 18 L 120 22 L 150 26 L 180 28 L 200 30"
                          fill="none"
                          stroke={point.hex}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.6, ease: 'easeOut' }}
                        />
                      </svg>
                    )}
                    {point.color === 'amber' && (
                      // Ticking clock bars
                      <div className="flex h-full items-end gap-1">
                        {[40, 70, 55, 85, 60, 95, 50, 75, 45, 90, 65, 80].map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className="flex-1 rounded-sm"
                            style={{ backgroundColor: `${point.hex}80` }}
                          />
                        ))}
                      </div>
                    )}
                    {point.color === 'orange' && (
                      // Flat line then abrupt drop - nothing → feedback
                      <svg viewBox="0 0 200 32" className="h-full w-full">
                        <line
                          x1="0"
                          y1="16"
                          x2="200"
                          y2="16"
                          stroke={`${point.hex}80`}
                          strokeWidth="1"
                          strokeDasharray="3 3"
                        />
                        <motion.circle
                          cx="100"
                          cy="16"
                          r="3"
                          fill={point.hex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      </svg>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center text-lg font-medium text-white/70 sm:text-xl"
          >
            What if you could know{' '}
            <span className="accent-gradient font-bold">before</span> you post?
          </motion.p>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="relative overflow-hidden border-t border-white/5 bg-neutral-950 py-24 sm:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-grid-tight mask-fade-bottom opacity-30" />
        </div>
        <div className="container-tight relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="mb-16 max-w-2xl"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary-300">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
              02 · The Product
            </span>
            <h2 className="text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
              Stop guessing.{' '}
              <span className="accent-gradient">Start knowing.</span>
            </h2>
            <p className="mt-4 text-base text-white/50 sm:text-lg">
              Every prediction is backed by data from real high- and low-performing
              videos - so you know exactly what will work.
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <FeatureCard key={index} feature={feature} Icon={Icon} index={index} />
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* ── PRICING ── */}
      <section className="relative overflow-hidden border-t border-white/5 bg-neutral-950 py-24 sm:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary-500/15 blur-3xl" />
        </div>
        <div className="container-tight relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="mb-16 max-w-2xl"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary-300">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
              04 · Pricing
            </span>
            <h2 className="text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
              Simple pricing.{' '}
              <span className="accent-gradient">Powerful results.</span>
            </h2>
            <p className="mt-4 text-base text-white/50 sm:text-lg">
              Every plan includes the full AI analysis. Start with one free analysis, upgrade for more.
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <PricingCard
              name="Free"
              price="$0"
              period="/mo"
              description="Try it out - one full AI analysis every month, no strings attached."
            />
            <PricingCard
              name="Creator"
              price="$9.99"
              period="/mo"
              description="For creators who post regularly and want every video to perform."
            />
            <PricingCard
              name="Pro"
              price="$24.99"
              period="/mo"
              description="For serious creators who need deep insights and a competitive edge."
              popular
            />
            <PricingCard
              name="Agency"
              price="$79.99"
              period="/mo"
              description="For teams managing multiple creators and client accounts."
            />
          </div>

          <p className="mt-10 font-mono text-[11px] uppercase tracking-widest text-white/30">
            All plans include full AI analysis · cancel anytime · no card required for free
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative border-t border-white/5 bg-neutral-950 py-24 sm:py-28">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="mb-16 max-w-2xl"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary-300">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
              05 · FAQ
            </span>
            <h2 className="text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
              Common questions.
            </h2>
          </motion.div>

          <div className="mx-auto max-w-3xl space-y-2">
            {[
              {
                q: 'Is there really a free plan?',
                a: 'Yes. The free plan includes 1 full AI analysis per month with all features. No credit card required. Use it as long as you want.',
              },
              {
                q: 'How accurate are the predictions?',
                a: "Our AI is trained on 11,000+ real videos and their actual performance data. While no prediction is perfect, our analysis gives you data-backed insights into what works and what to improve. Think of it as a detailed second opinion from someone who has studied thousands of viral videos.",
              },
              {
                q: 'What does the analysis include?',
                a: 'Each analysis includes a content grade (A+ to F), predicted view range, retention graph, hook effectiveness score, platform-specific feedback for TikTok/Instagram/YouTube, AI-generated hook rewrite, CTA rating, and specific optimization recommendations.',
              },
              {
                q: 'How long does an analysis take?',
                a: 'Most analyses complete in about 1-2 minutes. Longer videos may take up to 2 minutes.',
              },
              {
                q: 'What platforms do you support?',
                a: 'PreAlgo provides analysis optimized for TikTok, Instagram Reels, and YouTube Shorts. Each analysis includes platform-specific feedback.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes. There are no long-term contracts. Cancel anytime and continue using the service until the end of your billing period.',
              },
              {
                q: 'Is my content kept private?',
                a: 'Yes. Your uploaded videos are only accessible to you and are used solely for analysis. We never share or publish your content.',
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="rounded-xl border border-white/5 bg-white/[0.02] transition-colors hover:border-white/10 hover:bg-white/[0.04]"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between p-5 text-left text-sm font-medium text-white/90 sm:text-base"
                >
                  <span>{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4 flex-shrink-0 text-white/40" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm text-white/70 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center text-sm font-medium text-white/50 hover:text-primary-300 transition-colors"
            >
              View all FAQs
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="relative overflow-hidden border-t border-white/5 bg-neutral-950 py-24 sm:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-1/3 h-[500px] w-[500px] -translate-x-1/3 rounded-full bg-primary-500/10 blur-3xl" />
          <div className="absolute right-0 bottom-1/4 h-[500px] w-[500px] translate-x-1/3 rounded-full bg-secondary-500/10 blur-3xl" />
        </div>
        <div className="container-tight relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="mb-16 max-w-2xl"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary-300">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
              03 · In the wild
            </span>
            <h2 className="text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
              Creators using{' '}
              <span className="accent-gradient">PreAlgo.</span>
            </h2>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {[
              {
                quote: "I built PreAlgo because I was tired of posting and praying. Now I test every video against thousands of others before I hit publish.",
                author: "Evan Hand",
                handle: "Founder · PreAlgo",
              },
              {
                quote: "The retention graph told me my hooks were losing people at 3 seconds. I rewrote them and my views more than doubled.",
                author: "Jeremy St Onge",
                handle: "Content Creator",
              },
              {
                quote: "I was posting 4× a week in the golf niche getting nowhere. PreAlgo showed me which videos actually had viral DNA before I posted them.",
                author: "Wunderpar",
                handle: "@wunderpar · YouTube",
              },
            ].map((t, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-transparent p-6 transition-all hover:border-primary-500/40 hover:shadow-xl hover:shadow-primary-500/10 sm:p-7"
              >
                <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-primary-500/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                <span
                  aria-hidden
                  className="absolute -top-4 left-4 font-mono text-[100px] font-bold leading-none text-primary-500/20 transition-all duration-300 group-hover:text-primary-400/40 group-hover:scale-110"
                >
                  "
                </span>
                <blockquote className="relative pt-8 text-sm leading-relaxed text-white/85 sm:text-base">
                  {t.quote}
                </blockquote>
                <figcaption className="relative mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-500/40 to-secondary-500/30 text-sm font-semibold text-white shadow-lg shadow-primary-500/20 ring-1 ring-primary-500/30">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{t.author}</div>
                    <div className="font-mono text-[11px] uppercase tracking-wider text-white/40">
                      {t.handle}
                    </div>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative border-t border-white/5 bg-neutral-950 py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 hero-pinlight opacity-50" />
          <div className="absolute inset-0 bg-grid-tech mask-radial-fade opacity-40" />
        </div>
        <div className="container-tight relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
              Ready when you are
            </span>

            <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
              Know before
              <br />
              <span className="bg-gradient-to-br from-primary-300 via-primary-400 to-primary-500 bg-clip-text text-transparent">
                you post.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base text-white/50 sm:text-lg">
              Your first analysis is free. No card, no friction - just upload a video
              and see what PreAlgo thinks before the algorithm does.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/40 transition-all hover:shadow-xl hover:shadow-primary-500/60 sm:w-auto"
              >
                <span className="pointer-events-none absolute inset-y-0 -left-20 w-20 -skew-x-12 bg-white/30 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
                <span className="relative z-10 flex items-center gap-2">
                  Get started free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
              <Link
                href="/sample"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/80 transition-all hover:border-primary-400/30 hover:bg-primary-500/10 hover:text-white sm:w-auto"
              >
                See a sample first
                <ArrowRight className="h-4 w-4 text-white/40 transition-all group-hover:translate-x-0.5 group-hover:text-primary-400" />
              </Link>
            </div>

            <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-white/30">
              → No card required · Cancel anytime · Results in &lt; 2 min
            </p>
          </motion.div>
        </div>
      </section>

      {reviewsSlot}

      <Footer />
    </div>
  );
};
