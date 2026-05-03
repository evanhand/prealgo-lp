'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Music2, Instagram, Youtube, Sparkles, Zap, MessageSquare, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { Navbar } from '../landing/Navbar';
import { Footer } from '../landing/Footer';

// ─── Mockup 1: per-platform 3x3 grid ──────────────────────────────────
function PredictionGridMock() {
  const rows = [
    { p: 'TikTok',    Icon: Music2,    typical: '3K-5K', creator: '300K-500K', best: '3M-5M', top: true },
    { p: 'Instagram', Icon: Instagram, typical: '3K-5K', creator: '300K-500K', best: '5M+',  top: false },
    { p: 'YouTube',   Icon: Youtube,   typical: '1K-3K', creator: '150K-300K', best: '1M-3M', top: false },
  ];
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-neutral-950/85 backdrop-blur-xl p-5 sm:p-6 shadow-2xl">
      <div className="grid grid-cols-[100px_1fr_1.1fr_1fr] gap-2 mb-2.5">
        <span />
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Typical</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary-300">Your account</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Best case</span>
      </div>
      <div className="space-y-2">
        {rows.map((r) => {
          const Ico = r.Icon;
          return (
            <div key={r.p} className="grid grid-cols-[100px_1fr_1.1fr_1fr] gap-2 items-stretch">
              <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-3">
                <Ico className="h-3.5 w-3.5 text-white/55" />
                <span className="text-sm font-semibold text-white/85">{r.p}</span>
              </div>
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-3 flex items-center">
                <span className="text-sm font-semibold text-white/55 tabular-nums">{r.typical}</span>
              </div>
              <div className={`relative rounded-lg border px-3 py-3 flex items-center ${r.top ? 'border-primary-400/50 bg-gradient-to-br from-primary-500/[0.18] to-primary-500/[0.04]' : 'border-primary-500/30 bg-primary-500/[0.06]'}`}>
                <span className="text-base font-bold text-white tabular-nums">{r.creator}</span>
                {r.top && (
                  <span className="absolute -top-2 right-2 rounded-full bg-primary-500 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-white">
                    Best
                  </span>
                )}
              </div>
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-3 flex items-center">
                <span className="text-sm font-semibold text-white/55 tabular-nums">{r.best}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Mockup 2: hook diagnosis ─────────────────────────────────────────
function HookMock() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-neutral-950/85 backdrop-blur-xl p-5 sm:p-6 shadow-2xl space-y-5">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Hook archetype</span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 px-2.5 py-0.5 text-xs font-semibold text-primary-200">
          <Sparkles className="h-3 w-3" /> Investigator
        </span>
      </div>
      <div className="space-y-3">
        {[
          { label: 'Execution',         v: 5 },
          { label: 'Curiosity gap',     v: 4 },
          { label: 'Pattern interrupt', v: 4 },
          { label: 'Premise (0-3s)',    v: 5 },
        ].map((r) => (
          <div key={r.label} className="grid grid-cols-[150px_1fr_36px] items-center gap-3">
            <span className="text-xs font-medium text-white/70">{r.label}</span>
            <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(r.v / 5) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-500"
              />
            </div>
            <span className="text-[11px] font-mono text-white/55 tabular-nums">{r.v}/5</span>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-primary-500/30 bg-gradient-to-br from-primary-500/[0.10] to-transparent p-4">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="h-3.5 w-3.5 text-primary-300" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary-300">Suggested rewrite</span>
        </div>
        <p className="text-sm text-white leading-snug font-medium">
          &ldquo;I went deep on Diego Pavia and found something nobody&apos;s saying.&rdquo;
        </p>
      </div>
    </div>
  );
}

// ─── Mockup 3: retention curve ────────────────────────────────────────
function RetentionMock() {
  const pts = [100, 92, 84, 76, 70, 50, 44, 40, 36, 32];
  const w = 320;
  const h = 130;
  const path = pts
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i / (pts.length - 1)) * w} ${h - (p / 100) * (h - 12)}`)
    .join(' ');
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  const dropX = (4.5 / (pts.length - 1)) * w;
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-neutral-950/85 backdrop-blur-xl p-5 sm:p-6 shadow-2xl">
      <div className="flex items-baseline justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Predicted retention</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary-300">avg 64%</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h + 24}`} className="w-full h-auto">
        <defs>
          <linearGradient id="ret-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1={h} x2={w} y2={h} stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <motion.path
          d={area}
          fill="url(#ret-grad)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        <motion.path
          d={path}
          fill="none"
          stroke="#c084fc"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <line x1={dropX} y1="0" x2={dropX} y2={h} stroke="#fbbf24" strokeWidth="0.8" strokeDasharray="3 3" />
        <text x={dropX + 6} y={20} fontSize="10" fontFamily="monospace" letterSpacing="0.18em" fill="#fcd34d" fontWeight="600">
          DROPOFF · 0:11
        </text>
        <text x={w - 4} y={h + 18} textAnchor="end" fontSize="9" fontFamily="monospace" letterSpacing="0.18em" fill="rgba(255,255,255,0.40)">
          0:30
        </text>
        <text x={4} y={h + 18} fontSize="9" fontFamily="monospace" letterSpacing="0.18em" fill="rgba(255,255,255,0.40)">
          0:00
        </text>
      </svg>
    </div>
  );
}

// ─── Mockup 4: ranked fix list ────────────────────────────────────────
function FixesMock() {
  const fixes = [
    { rank: '01', title: 'Strengthen the visual hook', impact: 'High',   tone: 'rose' as const,    icon: AlertTriangle },
    { rank: '02', title: 'Cut 0:11 to 0:14',           impact: 'High',   tone: 'rose' as const,    icon: AlertTriangle },
    { rank: '03', title: 'Replace direct CTA',         impact: 'Medium', tone: 'amber' as const,   icon: Zap },
    { rank: '04', title: 'Add text overlay at 0:05',   impact: 'Medium', tone: 'amber' as const,   icon: Zap },
    { rank: '05', title: 'Tighten end frame',          impact: 'Low',    tone: 'emerald' as const, icon: Sparkles },
  ];
  const toneCls: Record<string, string> = {
    rose: 'border-rose-500/40 bg-rose-500/[0.10] text-rose-200',
    amber: 'border-amber-500/40 bg-amber-500/[0.10] text-amber-200',
    emerald: 'border-emerald-500/40 bg-emerald-500/[0.10] text-emerald-200',
  };
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-neutral-950/85 backdrop-blur-xl p-5 sm:p-6 shadow-2xl space-y-2">
      <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2 inline-block">Ranked fixes · 5 of 12</span>
      {fixes.map((f) => {
        const Ico = f.icon;
        return (
          <div key={f.rank} className="grid grid-cols-[28px_24px_1fr_auto] items-center gap-3 py-2 border-b border-white/[0.06] last:border-b-0">
            <span className="font-mono text-xs text-primary-300 tabular-nums">{f.rank}</span>
            <Ico className="h-3.5 w-3.5 text-white/45" />
            <span className="text-sm font-medium text-white/85">{f.title}</span>
            <span className={`font-mono text-[10px] uppercase tracking-widest rounded border px-1.5 py-0.5 ${toneCls[f.tone]}`}>
              {f.impact}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Hero analysis card ──────────────────────────────────────────────
function HeroAnalysisCard() {
  return (
    <div className="relative">
      <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-primary-500/20 via-primary-500/[0.04] to-transparent blur-2xl pointer-events-none" />
      <div className="relative rounded-2xl border border-white/[0.10] bg-neutral-950/90 backdrop-blur-xl p-5 sm:p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">Analysis · AV-0481</div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Ready
          </span>
        </div>
        <div className="flex items-center gap-4 mb-5">
          <div
            className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500"
            style={{ boxShadow: '0 0 36px rgba(16,185,129,0.45)' }}
          >
            <span className="text-4xl font-black text-white">A</span>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">Predicted views</div>
            <div className="text-3xl font-bold text-white tabular-nums tracking-tight">300K - 500K</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-emerald-300 mt-1">Best platform · TikTok</div>
          </div>
        </div>
        <PredictionGridMock />
      </div>
    </div>
  );
}

// ─── Feature row ─────────────────────────────────────────────────────
type FeatureSection = {
  number: string;
  eyebrow: string;
  headline: React.ReactNode;
  caption: string;
  mockup: React.ReactNode;
  flip?: boolean;
};

function FeatureRow({ s }: { s: FeatureSection }) {
  const text = (
    <div>
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary-300 mb-5">
        <span>{s.number}</span>
        <span className="h-px w-6 bg-primary-300/40" />
        <span>{s.eyebrow}</span>
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] text-white">
        {s.headline}
      </h2>
      <p className="mt-4 text-sm sm:text-base text-white/55 max-w-md leading-relaxed">{s.caption}</p>
    </div>
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center py-16 sm:py-24 border-t border-white/[0.06]"
    >
      {s.flip ? (
        <>
          <div className="lg:order-2">{text}</div>
          <div className="lg:order-1">{s.mockup}</div>
        </>
      ) : (
        <>
          {text}
          {s.mockup}
        </>
      )}
    </motion.section>
  );
}

const FEATURES: FeatureSection[] = [
  {
    number: '01',
    eyebrow: 'Prediction',
    headline: (
      <>
        Three numbers per platform.{' '}
        <span className="accent-gradient">Honest ones.</span>
      </>
    ),
    caption: 'Typical creator. Your account. Best case if it lands.',
    mockup: <PredictionGridMock />,
  },
  {
    number: '02',
    eyebrow: 'Hook',
    headline: (
      <>
        Names your hook.{' '}
        <span className="accent-gradient">Rewrites it.</span>
      </>
    ),
    caption: 'One of eight archetypes, scored on four dimensions.',
    mockup: <HookMock />,
    flip: true,
  },
  {
    number: '03',
    eyebrow: 'Retention',
    headline: (
      <>
        Pinpoints the second{' '}
        <span className="accent-gradient">they scroll.</span>
      </>
    ),
    caption: 'Curve plotted second by second. Dropoff timestamp called out.',
    mockup: <RetentionMock />,
  },
  {
    number: '04',
    eyebrow: 'Fixes',
    headline: (
      <>
        Specific changes.{' '}
        <span className="accent-gradient">Ranked by impact.</span>
      </>
    ),
    caption: 'Not "improve your hook." A list with timestamps and predicted lift.',
    mockup: <FixesMock />,
    flip: true,
  },
];

export const FeaturesPageContent: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 sm:pt-40 pb-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.18),transparent_70%)]" />
          <div className="absolute inset-0 bg-grid-tight mask-radial-fade opacity-30" />
        </div>

        <div className="container-tight relative grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary-300">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
              What you get
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.0] text-white">
              The grade.
              <br />
              The forecast.
              <br />
              <span className="accent-gradient">The fix list.</span>
            </h1>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-neutral-950 hover:bg-white/90 transition-colors"
              >
                Analyze a video free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/sample"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/12 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-white/85 hover:bg-white/[0.06] transition-colors"
              >
                See a sample
              </Link>
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-white/35">
              Free plan · No credit card · 60 to 120 second turnaround
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <HeroAnalysisCard />
          </motion.div>
        </div>
      </section>

      {/* STAT STRIP */}
      <section className="container-tight">
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-b border-white/[0.06] divide-x divide-white/[0.06]">
          {[
            { v: '< 90s',    l: 'Avg turnaround' },
            { v: '3',        l: 'Predictions / platform' },
            { v: '10,000+',  l: 'Comparable videos' },
            { v: 'All plans',l: 'Same full pipeline' },
          ].map((s) => (
            <div key={s.l} className="px-4 sm:px-5 py-6">
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white tabular-nums">{s.v}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/45 mt-1.5">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURE ROWS */}
      <main className="container-tight">
        {FEATURES.map((s) => (
          <FeatureRow key={s.number} s={s} />
        ))}
      </main>

      {/* CTA */}
      <section className="container-tight pt-12 pb-24">
        <div className="rounded-2xl border border-white/[0.10] bg-gradient-to-br from-primary-500/[0.12] via-primary-500/[0.04] to-transparent p-8 sm:p-12 text-center">
          <h3 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-white">
            Run your next video through it{' '}
            <span className="accent-gradient">before you post.</span>
          </h3>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-neutral-950 hover:bg-white/90 transition-colors"
            >
              Analyze a video free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/12 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-white/85 hover:bg-white/[0.06] transition-colors"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
