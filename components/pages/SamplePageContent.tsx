'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Music2, Instagram, Youtube, Sparkles, AlertTriangle, Zap, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../landing/Navbar';
import { Footer } from '../landing/Footer';

// Real-ish analysis data, sample only.
const SAMPLE = {
  videoTitle: 'Diego Pavia, the unreceivers',
  grade: 'A',
  summary:
    "Killer hot take, sharp greenscreen format, and the U-R Bernard example is an incredible share-trigger. Exceptionally well-executed and likely to resonate widely within your niche.",
  predicted: '300K - 500K',
  bestPlatform: 'TikTok',
  perPlatform: [
    { p: 'TikTok',    Icon: Music2,    typical: '3K-5K',  creator: '300K-500K', best: '3M-5M', isBest: true },
    { p: 'Instagram', Icon: Instagram, typical: '3K-5K',  creator: '300K-500K', best: '5M+',  isBest: false },
    { p: 'YouTube',   Icon: Youtube,   typical: '1K-3K',  creator: '150K-300K', best: '1M-3M', isBest: false },
  ],
  hook: {
    archetype: 'Investigator',
    rewrite: '"I went deep on Diego Pavia and found something nobody\'s saying."',
    scores: [
      { l: 'Execution',         v: 5 },
      { l: 'Curiosity gap',     v: 4 },
      { l: 'Pattern interrupt', v: 4 },
      { l: 'Premise (0-3s)',    v: 5 },
    ],
  },
  retention: [100, 92, 84, 76, 70, 50, 44, 40, 36, 32],
  fixes: [
    { rank: '01', title: 'Strengthen the visual hook',     impact: 'High',   tone: 'rose' as const,    icon: AlertTriangle, why: 'First frame is a static medium shot. Replace with the U-R Bernard photo as a cold open.' },
    { rank: '02', title: 'Cut 0:11 to 0:14',               impact: 'High',   tone: 'rose' as const,    icon: AlertTriangle, why: 'Predicted dropoff cliff. Tighten the second-act setup.' },
    { rank: '03', title: 'Replace direct CTA',             impact: 'Medium', tone: 'amber' as const,   icon: Zap,           why: 'Direct asks underperform on this format. Soften with curiosity loop instead.' },
    { rank: '04', title: 'Add text overlay at 0:05',       impact: 'Medium', tone: 'amber' as const,   icon: Zap,           why: 'Reinforces the comparison for muted viewers.' },
    { rank: '05', title: 'Tighten end frame',              impact: 'Low',    tone: 'emerald' as const, icon: Sparkles,      why: 'Trim final 0.5s to encourage replay.' },
  ],
  quality: [
    ['Hook',      '25/25'],
    ['X-Factor',  '24/30'],
    ['Emotion',   '20/20'],
    ['Format',    '10/10'],
    ['Execution', '10/10'],
    ['Value',     '5/5'],
  ] as const,
};

const toneCls: Record<string, string> = {
  rose: 'border-rose-500/40 bg-rose-500/[0.10] text-rose-200',
  amber: 'border-amber-500/40 bg-amber-500/[0.10] text-amber-200',
  emerald: 'border-emerald-500/40 bg-emerald-500/[0.10] text-emerald-200',
};

// Retention SVG curve.
function RetentionSVG() {
  const pts = SAMPLE.retention;
  const w = 560;
  const h = 200;
  const path = pts
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i / (pts.length - 1)) * w} ${h - (p / 100) * (h - 16)}`)
    .join(' ');
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  const dropX = (4.5 / (pts.length - 1)) * w;
  return (
    <svg viewBox={`0 0 ${w} ${h + 28}`} className="w-full h-auto">
      <defs>
        <linearGradient id="ret-grad-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1={h} x2={w} y2={h} stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      <motion.path d={area} fill="url(#ret-grad-2)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
      <motion.path d={path} fill="none" stroke="#c084fc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeOut' }} />
      <line x1={dropX} y1="0" x2={dropX} y2={h} stroke="#fbbf24" strokeWidth="0.8" strokeDasharray="3 3" />
      <text x={dropX + 6} y={20} fontSize="10" fontFamily="monospace" letterSpacing="0.18em" fill="#fcd34d" fontWeight="600">DROPOFF · 0:11</text>
      <text x={4} y={h + 22} fontSize="9" fontFamily="monospace" letterSpacing="0.18em" fill="rgba(255,255,255,0.40)">0:00</text>
      <text x={w - 4} y={h + 22} textAnchor="end" fontSize="9" fontFamily="monospace" letterSpacing="0.18em" fill="rgba(255,255,255,0.40)">0:30</text>
    </svg>
  );
}

// Section header (number + label).
function SectionMarker({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary-300 mb-4">
      <span>{n}</span>
      <span className="h-px w-6 bg-primary-300/40" />
      <span>{label}</span>
    </div>
  );
}

export const SamplePageContent: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 sm:pt-40 pb-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.18),transparent_70%)]" />
          <div className="absolute inset-0 bg-grid-tight mask-radial-fade opacity-30" />
        </div>

        <div className="container-tight relative">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary-300">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
              Sample analysis · real video
            </span>
            <h1 className="max-w-4xl text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.0] text-white">
              This is what you get for{' '}
              <span className="accent-gradient">every video.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base sm:text-lg text-white/60 leading-relaxed">
              No teaser screenshots. The full report on a real posted video.
            </p>
          </motion.div>
        </div>
      </section>

      {/* GRADE HERO CARD */}
      <section className="container-tight pt-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-emerald-500/15 via-primary-500/10 to-transparent blur-2xl pointer-events-none" />
          <div className="relative rounded-2xl border border-white/[0.10] bg-neutral-950/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-baseline justify-between mb-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                Analysis · AV-0481 · {SAMPLE.videoTitle}
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-emerald-200">
                <CheckCircle2 className="h-3 w-3" /> Ready to post
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 items-center">
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative flex h-32 w-32 sm:h-40 sm:w-40 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-500 mx-auto lg:mx-0"
                style={{ boxShadow: '0 0 60px rgba(16,185,129,0.45)' }}
              >
                <span className="text-7xl sm:text-8xl font-black text-white">{SAMPLE.grade}</span>
              </motion.div>

              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">Predicted views</div>
                <div className="text-4xl sm:text-5xl font-bold text-white tabular-nums tracking-tight">{SAMPLE.predicted}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-emerald-300 mt-1.5">Best platform · {SAMPLE.bestPlatform}</div>
                <p className="mt-5 max-w-xl text-sm sm:text-base text-white/70 leading-relaxed border-t border-white/[0.06] pt-5">
                  {SAMPLE.summary}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* PER-PLATFORM */}
      <section className="container-tight pt-16">
        <SectionMarker n="01" label="Forecast" />
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] text-white max-w-3xl">
          Three numbers per platform.{' '}
          <span className="accent-gradient">Not a vibe.</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6"
        >
          <div className="grid grid-cols-[100px_1fr_1.1fr_1fr] gap-2 mb-2.5">
            <span />
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Typical</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary-300">Your account</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Best case</span>
          </div>
          <div className="space-y-2">
            {SAMPLE.perPlatform.map((r) => {
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
                  <div className={`relative rounded-lg border px-3 py-3 flex items-center ${r.isBest ? 'border-primary-400/50 bg-gradient-to-br from-primary-500/[0.18] to-primary-500/[0.04]' : 'border-primary-500/30 bg-primary-500/[0.06]'}`}>
                    <span className="text-base font-bold text-white tabular-nums">{r.creator}</span>
                    {r.isBest && (
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
        </motion.div>
      </section>

      {/* HOOK */}
      <section className="container-tight pt-20">
        <SectionMarker n="02" label="Hook" />
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] text-white max-w-3xl">
          Names your hook.{' '}
          <span className="accent-gradient">Rewrites it.</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6 space-y-5"
        >
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Archetype</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 px-2.5 py-0.5 text-xs font-semibold text-primary-200">
              <Sparkles className="h-3 w-3" /> {SAMPLE.hook.archetype}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {SAMPLE.hook.scores.map((r) => (
              <div key={r.l} className="grid grid-cols-[140px_1fr_36px] items-center gap-3">
                <span className="text-xs font-medium text-white/70">{r.l}</span>
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
            <p className="text-sm text-white leading-snug font-medium">{SAMPLE.hook.rewrite}</p>
          </div>
        </motion.div>
      </section>

      {/* RETENTION + QUALITY GRID */}
      <section className="container-tight pt-20">
        <SectionMarker n="03" label="Retention + quality" />
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] text-white max-w-3xl">
          The exact second{' '}
          <span className="accent-gradient">they scroll.</span>
        </h2>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6"
          >
            <div className="flex items-baseline justify-between mb-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Predicted retention curve</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary-300">avg 64%</span>
            </div>
            <RetentionSVG />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Quality breakdown</span>
              <span className="text-2xl font-bold text-emerald-400 tabular-nums">94<span className="text-xs text-white/30">/100</span></span>
            </div>
            <ul className="space-y-2 text-sm">
              {SAMPLE.quality.map(([label, val]) => (
                <li key={label} className="flex items-center justify-between border-b border-white/[0.04] pb-2 last:border-b-0">
                  <span className="text-white/65">{label}</span>
                  <span className="font-mono text-white/85 tabular-nums">{val}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* RANKED FIXES */}
      <section className="container-tight pt-20">
        <SectionMarker n="04" label="Fix list" />
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] text-white max-w-3xl">
          Specific changes.{' '}
          <span className="accent-gradient">Ranked by impact.</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6 space-y-3"
        >
          {SAMPLE.fixes.map((f) => {
            const Ico = f.icon;
            return (
              <div key={f.rank} className="grid grid-cols-[28px_24px_1fr_auto] items-start gap-3 py-3 border-b border-white/[0.06] last:border-b-0">
                <span className="font-mono text-xs text-primary-300 tabular-nums pt-0.5">{f.rank}</span>
                <Ico className="h-3.5 w-3.5 text-white/45 mt-1" />
                <div>
                  <div className="text-sm font-semibold text-white">{f.title}</div>
                  <div className="text-xs text-white/55 leading-snug mt-0.5">{f.why}</div>
                </div>
                <span className={`font-mono text-[10px] uppercase tracking-widest rounded border px-1.5 py-0.5 ${toneCls[f.tone]}`}>
                  {f.impact}
                </span>
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="container-tight pt-16 pb-24">
        <div className="rounded-2xl border border-white/[0.10] bg-gradient-to-br from-primary-500/[0.12] via-primary-500/[0.04] to-transparent p-8 sm:p-12 text-center">
          <h3 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-white">
            This is what your next video gets.{' '}
            <span className="accent-gradient">First one is free.</span>
          </h3>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-neutral-950 hover:bg-white/90 transition-colors"
            >
              <BarChart3 className="h-4 w-4" />
              Run my video free
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

export default SamplePageContent;
