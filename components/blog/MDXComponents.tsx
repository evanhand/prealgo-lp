import Link from 'next/link';
import { Music2, Instagram, Youtube, Check, X, AlertTriangle, Sparkles } from 'lucide-react';
import React from 'react';

// ─── Layout primitives ─────────────────────────────────────────────────

export function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="not-prose text-xl sm:text-2xl text-white/80 leading-relaxed font-light tracking-tight my-8 first-of-type:mt-2">
      {children}
    </p>
  );
}

export function Section({
  n,
  label,
  title,
  emphasis,
  children,
}: {
  n: string;
  label?: string;
  title: string;
  emphasis?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="not-prose mt-16 mb-10">
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary-300 mb-5">
        <span>{n}</span>
        <span className="h-px w-6 bg-primary-300/40" />
        {label && <span>{label}</span>}
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] text-white">
        {title}
        {emphasis && (
          <>
            {' '}
            <span className="accent-gradient">{emphasis}</span>
          </>
        )}
      </h2>
      <div className="prose prose-invert prose-neutral max-w-none mt-5 prose-p:text-white/75 prose-p:leading-relaxed prose-strong:text-white prose-li:text-white/75 prose-a:text-primary-300 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-primary-500/40 prose-blockquote:text-white/65">
        {children}
      </div>
    </section>
  );
}

// ─── Stat primitives ───────────────────────────────────────────────────

export function HeroStat({
  value,
  label,
  caption,
}: {
  value: string;
  label: string;
  caption?: string;
}) {
  return (
    <div className="not-prose my-10 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-primary-500/[0.10] via-primary-500/[0.02] to-transparent p-6 sm:p-8">
      <div className="font-mono text-[10px] uppercase tracking-widest text-primary-300 mb-2">
        {label}
      </div>
      <div className="text-5xl sm:text-7xl font-bold tracking-tight text-white tabular-nums leading-none">
        {value}
      </div>
      {caption && (
        <div className="mt-3 text-sm sm:text-base text-white/65 leading-relaxed max-w-xl">
          {caption}
        </div>
      )}
    </div>
  );
}

export function StatGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose grid grid-cols-2 gap-3 sm:grid-cols-3 my-8">
      {children}
    </div>
  );
}

export function StatCard({
  stat,
  label,
  caption,
}: {
  stat: string;
  label: string;
  caption?: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-4">
      <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white tabular-nums">{stat}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-primary-300">
        {label}
      </div>
      {caption && (
        <div className="mt-2 text-xs text-white/55 leading-snug">{caption}</div>
      )}
    </div>
  );
}

// ─── Quotes + callouts ─────────────────────────────────────────────────

export function PullQuote({
  children,
  attribution,
}: {
  children: React.ReactNode;
  attribution?: string;
}) {
  return (
    <figure className="not-prose my-12 grid grid-cols-[3px_1fr] gap-5 items-start">
      <div className="h-full w-[3px] bg-gradient-to-b from-primary-300 via-primary-500 to-transparent rounded-full" />
      <div>
        <blockquote className="text-2xl sm:text-3xl leading-snug text-white/90 font-medium tracking-tight">
          {children}
        </blockquote>
        {attribution && (
          <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-widest text-white/45">
            {attribution}
          </figcaption>
        )}
      </div>
    </figure>
  );
}

export function Callout({
  type = 'info',
  title,
  children,
}: {
  type?: 'info' | 'warning' | 'success' | 'note';
  title?: string;
  children: React.ReactNode;
}) {
  const tones: Record<string, { border: string; bg: string; eyebrow: string; defaultTitle: string; Icon: React.ElementType }> = {
    info:    { border: 'border-primary-500/30', bg: 'bg-primary-500/[0.06]',  eyebrow: 'text-primary-300',  defaultTitle: 'Note',     Icon: Sparkles },
    note:    { border: 'border-white/[0.10]',   bg: 'bg-white/[0.03]',        eyebrow: 'text-white/55',     defaultTitle: 'Note',     Icon: Sparkles },
    warning: { border: 'border-amber-500/30',   bg: 'bg-amber-500/[0.06]',    eyebrow: 'text-amber-300',    defaultTitle: 'Watch out', Icon: AlertTriangle },
    success: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/[0.06]',  eyebrow: 'text-emerald-300',  defaultTitle: 'Works',    Icon: Check },
  };
  const t = tones[type];
  const Icon = t.Icon;
  return (
    <div className={`not-prose my-8 rounded-xl border ${t.border} ${t.bg} px-5 py-4`}>
      <div className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest ${t.eyebrow} mb-2`}>
        <Icon className="h-3.5 w-3.5" />
        {title ?? t.defaultTitle}
      </div>
      <div className="text-sm text-white/85 leading-relaxed">{children}</div>
    </div>
  );
}

// ─── Comparison: good vs bad ───────────────────────────────────────────

export function Compare({
  badLabel = 'Weak',
  goodLabel = 'Strong',
  bad,
  good,
}: {
  badLabel?: string;
  goodLabel?: string;
  bad: React.ReactNode;
  good: React.ReactNode;
}) {
  return (
    <div className="not-prose my-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="rounded-xl border border-rose-500/30 bg-rose-500/[0.04] p-5">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-rose-300 mb-3">
          <X className="h-3.5 w-3.5" />
          {badLabel}
        </div>
        <div className="text-base text-white/85 leading-relaxed">{bad}</div>
      </div>
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.04] p-5">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-emerald-300 mb-3">
          <Check className="h-3.5 w-3.5" />
          {goodLabel}
        </div>
        <div className="text-base text-white/85 leading-relaxed">{good}</div>
      </div>
    </div>
  );
}

// ─── Bar list (e.g. archetype median performance) ──────────────────────

export function BarList({ children }: { children: React.ReactNode }) {
  return <div className="not-prose my-8 space-y-2.5">{children}</div>;
}

export function Bar({
  label,
  value,
  display,
  tone = 'primary',
}: {
  label: string;
  value: number;
  display?: string;
  tone?: 'primary' | 'emerald' | 'rose' | 'amber';
}) {
  const fills: Record<string, string> = {
    primary: 'from-primary-400 to-primary-500',
    emerald: 'from-emerald-400 to-emerald-500',
    rose:    'from-rose-400 to-rose-500',
    amber:   'from-amber-400 to-amber-500',
  };
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="grid grid-cols-[160px_1fr_60px] items-center gap-3">
      <span className="text-sm font-medium text-white/80">{label}</span>
      <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${fills[tone]}`}
          style={{ width: `${v}%` }}
        />
      </div>
      <span className="font-mono text-[11px] text-white/55 tabular-nums text-right">{display ?? `${v}%`}</span>
    </div>
  );
}

// ─── Hook archetype card ───────────────────────────────────────────────

export function Archetype({
  number,
  name,
  example,
  bestOn = [],
  caution,
  median,
}: {
  number: string;
  name: string;
  example: string;
  bestOn?: ('TikTok' | 'Instagram' | 'YouTube')[];
  caution: string;
  median?: string;
}) {
  const ICONS: Record<string, React.ElementType> = {
    TikTok: Music2,
    Instagram: Instagram,
    YouTube: Youtube,
  };
  return (
    <div className="not-prose my-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6">
      <div className="flex items-baseline justify-between mb-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-primary-300 tabular-nums">{number}</span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{name}</h3>
        </div>
        {median && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/45">
            Median: {median}
          </span>
        )}
      </div>

      <div className="rounded-lg border border-white/[0.08] bg-neutral-950/60 px-4 py-3 mb-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 block mb-1">Sounds like</span>
        <span className="text-base text-white/90 leading-snug italic">&ldquo;{example}&rdquo;</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-emerald-300 mb-1.5">Best on</div>
          <div className="flex flex-wrap gap-1.5">
            {bestOn.map((p) => {
              const Ico = ICONS[p];
              return (
                <span
                  key={p}
                  className="inline-flex items-center gap-1 rounded border border-emerald-500/30 bg-emerald-500/[0.08] px-2 py-0.5 text-xs font-semibold text-emerald-200"
                >
                  <Ico className="h-3 w-3" /> {p}
                </span>
              );
            })}
          </div>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-amber-300 mb-1.5">Watch out</div>
          <div className="text-xs text-white/70 leading-snug">{caution}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Platform comparison row ───────────────────────────────────────────

export function PlatformGrid({ children }: { children: React.ReactNode }) {
  return <div className="not-prose my-8 grid grid-cols-1 sm:grid-cols-3 gap-3">{children}</div>;
}

export function PlatformCard({
  platform,
  rewards,
  pacing,
  hook,
}: {
  platform: 'TikTok' | 'Instagram' | 'YouTube';
  rewards: string;
  pacing: string;
  hook: string;
}) {
  const ICONS: Record<string, React.ElementType> = {
    TikTok: Music2,
    Instagram: Instagram,
    YouTube: Youtube,
  };
  const Ico = ICONS[platform];
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
      <div className="flex items-center gap-2 mb-4">
        <Ico className="h-4 w-4 text-primary-300" />
        <span className="text-sm font-bold text-white">{platform}</span>
      </div>
      <div className="space-y-3 text-sm">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/40 block mb-0.5">Rewards</span>
          <span className="text-white/85 leading-snug">{rewards}</span>
        </div>
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/40 block mb-0.5">Pacing</span>
          <span className="text-white/85 leading-snug">{pacing}</span>
        </div>
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/40 block mb-0.5">Hook</span>
          <span className="text-white/85 leading-snug">{hook}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Forecast 3x3 grid (used in how-prealgo-predicts-views) ────────────

export function ForecastGrid({
  rows,
}: {
  rows: { platform: 'TikTok' | 'Instagram' | 'YouTube'; typical: string; creator: string; best: string; isBest?: boolean }[];
}) {
  const ICONS: Record<string, React.ElementType> = {
    TikTok: Music2,
    Instagram: Instagram,
    YouTube: Youtube,
  };
  return (
    <div className="not-prose my-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6">
      <div className="grid grid-cols-[100px_1fr_1.1fr_1fr] gap-2 mb-2.5">
        <span />
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Typical</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary-300">Your account</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Best case</span>
      </div>
      <div className="space-y-2">
        {rows.map((r) => {
          const Ico = ICONS[r.platform];
          return (
            <div key={r.platform} className="grid grid-cols-[100px_1fr_1.1fr_1fr] gap-2 items-stretch">
              <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-3">
                <Ico className="h-3.5 w-3.5 text-white/55" />
                <span className="text-sm font-semibold text-white/85">{r.platform}</span>
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
    </div>
  );
}

// ─── Retention curve mini SVG ──────────────────────────────────────────

export function RetentionCurve({
  pts,
  dropoffPct,
  dropoffLabel,
  height = 180,
}: {
  pts: number[];
  dropoffPct?: number; // 0-100 horizontal position of dropoff line
  dropoffLabel?: string;
  height?: number;
}) {
  const w = 600;
  const h = height;
  const path = pts
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i / (pts.length - 1)) * w} ${h - (p / 100) * (h - 16)}`)
    .join(' ');
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  const dropX = dropoffPct !== undefined ? (dropoffPct / 100) * w : null;

  return (
    <div className="not-prose my-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
      <svg viewBox={`0 0 ${w} ${h + 28}`} className="w-full h-auto">
        <defs>
          <linearGradient id="ret-curve-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1={h} x2={w} y2={h} stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <path d={area} fill="url(#ret-curve-grad)" />
        <path d={path} fill="none" stroke="#c084fc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        {dropX !== null && (
          <>
            <line x1={dropX} y1="0" x2={dropX} y2={h} stroke="#fbbf24" strokeWidth="0.8" strokeDasharray="3 3" />
            {dropoffLabel && (
              <text x={dropX + 6} y={20} fontSize="10" fontFamily="monospace" letterSpacing="0.18em" fill="#fcd34d" fontWeight="600">
                {dropoffLabel.toUpperCase()}
              </text>
            )}
          </>
        )}
        <text x={4} y={h + 22} fontSize="9" fontFamily="monospace" letterSpacing="0.18em" fill="rgba(255,255,255,0.40)">0%</text>
        <text x={w - 4} y={h + 22} textAnchor="end" fontSize="9" fontFamily="monospace" letterSpacing="0.18em" fill="rgba(255,255,255,0.40)">100%</text>
      </svg>
    </div>
  );
}

// ─── Numbered steps ────────────────────────────────────────────────────

export function Steps({ children }: { children: React.ReactNode }) {
  return <div className="not-prose my-8 space-y-3">{children}</div>;
}

export function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[44px_1fr] gap-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/15 border border-primary-500/30 font-mono text-sm font-bold text-primary-200 tabular-nums">
        {n}
      </div>
      <div>
        <h4 className="text-base font-bold text-white mb-1.5">{title}</h4>
        <div className="text-sm text-white/70 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

// ─── Checklist ─────────────────────────────────────────────────────────

export function CheckList({ children }: { children: React.ReactNode }) {
  return <ul className="not-prose my-8 space-y-2.5">{children}</ul>;
}

export function CheckItem({
  ok = true,
  children,
}: {
  ok?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3">
      <div
        className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border ${
          ok ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300' : 'border-rose-500/40 bg-rose-500/15 text-rose-300'
        }`}
      >
        {ok ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
      </div>
      <span className="text-sm text-white/80 leading-relaxed">{children}</span>
    </li>
  );
}

// ─── CTA ───────────────────────────────────────────────────────────────

export function CTA({
  headline,
  emphasis,
  sub,
  primary = 'Try PreAlgo free',
  primaryHref = '/signup',
  secondary,
  secondaryHref = '/pricing',
}: {
  headline: string;
  emphasis?: string;
  sub?: string;
  primary?: string;
  primaryHref?: string;
  secondary?: string;
  secondaryHref?: string;
}) {
  return (
    <div className="not-prose my-12 rounded-2xl border border-white/[0.10] bg-gradient-to-br from-primary-500/[0.12] via-primary-500/[0.04] to-transparent p-8 sm:p-10 text-center">
      <h3 className="text-2xl sm:text-4xl font-bold tracking-tight leading-[1.1] text-white">
        {headline}
        {emphasis && (
          <>
            {' '}
            <span className="accent-gradient">{emphasis}</span>
          </>
        )}
      </h3>
      {sub && <p className="mt-4 mx-auto max-w-md text-sm sm:text-base text-white/60 leading-relaxed">{sub}</p>}
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href={primaryHref}
          className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-neutral-950 hover:bg-white/90 transition-colors"
        >
          {primary}
        </Link>
        {secondary && (
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center rounded-md border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/85 hover:bg-white/[0.06] transition-colors"
          >
            {secondary}
          </Link>
        )}
      </div>
    </div>
  );
}

export const mdxComponents = {
  Lede,
  Section,
  HeroStat,
  StatGrid,
  StatCard,
  PullQuote,
  Callout,
  Compare,
  BarList,
  Bar,
  Archetype,
  PlatformGrid,
  PlatformCard,
  ForecastGrid,
  RetentionCurve,
  Steps,
  Step,
  CheckList,
  CheckItem,
  CTA,
  a: ({ href, children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith('http');
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href ?? '#'} {...(rest as Record<string, unknown>)}>
        {children}
      </Link>
    );
  },
};
