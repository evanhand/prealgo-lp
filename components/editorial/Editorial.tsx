/**
 * Editorial design primitives. Used across the revamped LP sub-pages
 * (Features, Pricing, Sample, Blog, About) to give them a consistent
 * magazine-style look, Fraunces display serif headlines, mono section
 * markers, asymmetric editorial layouts.
 */
import React from 'react';

// ── Eyebrow + index marker (e.g. "01 / 04, Features"). ──
export function PageMarker({
  index,
  total,
  label,
}: {
  index?: string;
  total?: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 page-marker text-white/55">
      {index && total && (
        <span className="text-primary-300">
          {index} <span className="text-white/30">/</span> {total}
        </span>
      )}
      <span className="h-px w-6 bg-white/20" />
      <span>{label}</span>
    </div>
  );
}

// ── Big editorial headline. Use as the page-top hed. ──
export function DisplayHed({
  children,
  emphasis,
  size = 'lg',
}: {
  children: React.ReactNode;
  emphasis?: React.ReactNode; // shows the emphasis word in italic display
  size?: 'md' | 'lg' | 'xl';
}) {
  const cls =
    size === 'xl'
      ? 'text-5xl sm:text-7xl lg:text-[8rem]'
      : size === 'lg'
      ? 'text-5xl sm:text-6xl lg:text-7xl'
      : 'text-4xl sm:text-5xl';
  return (
    <h1
      className={`font-display font-medium text-white leading-[1.0] tracking-[-0.03em] ${cls}`}
    >
      {children}
      {emphasis && (
        <>
          {' '}
          <span className="display-italic text-primary-200">{emphasis}</span>
        </>
      )}
    </h1>
  );
}

// ── Standfirst (subhead under the hed). ──
export function Standfirst({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-white/65">
      {children}
    </p>
  );
}

// ── Section heading with a leading number marker. ──
export function NumberedSection({
  number,
  eyebrow,
  title,
  italicTitle,
  children,
}: {
  number: string;
  eyebrow?: string;
  title: string;
  italicTitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-x-10 gap-y-6 py-14 sm:py-20 border-t border-white/[0.08]">
      <div>
        <div className="page-marker text-primary-300 mb-2">{number}</div>
        {eyebrow && <div className="page-marker text-white/40">{eyebrow}</div>}
      </div>
      <div>
        <h2 className="font-display font-medium text-white text-3xl sm:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05] max-w-3xl">
          {title}{' '}
          {italicTitle && <span className="display-italic text-primary-200">{italicTitle}</span>}
        </h2>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

// ── Pull quote with a shimmering vertical bar. ──
export function PullQuote({
  children,
  attribution,
}: {
  children: React.ReactNode;
  attribution?: string;
}) {
  return (
    <figure className="my-12 grid grid-cols-[2px_1fr] gap-6 items-start">
      <div className="h-full w-[2px] bg-gradient-to-b from-primary-300 via-primary-500 to-transparent bar-shimmer rounded-full" />
      <div>
        <blockquote className="font-display italic font-normal text-2xl sm:text-3xl leading-snug text-white/90 tracking-[-0.015em]">
          {children}
        </blockquote>
        {attribution && (
          <figcaption className="mt-4 page-marker text-white/45">{attribution}</figcaption>
        )}
      </div>
    </figure>
  );
}

// ── Editorial rule with center ticks. ──
export function Rule() {
  return <div className="editorial-rule my-16" />;
}

// ── Stat card used in tabular sections. ──
export function StatCell({
  value,
  label,
  caption,
  emphasized,
}: {
  value: string;
  label: string;
  caption?: string;
  emphasized?: boolean;
}) {
  return (
    <div
      className={`relative px-5 py-6 ${
        emphasized ? 'crosshair-frame bg-primary-500/[0.06]' : ''
      }`}
    >
      <div className="page-marker text-white/40 mb-2">{label}</div>
      <div
        className={`font-display font-medium tracking-[-0.025em] tabular-nums text-3xl sm:text-4xl ${
          emphasized ? 'text-white' : 'text-white/85'
        }`}
      >
        {value}
      </div>
      {caption && (
        <div className="mt-2 text-xs text-white/45 leading-relaxed">{caption}</div>
      )}
    </div>
  );
}

// ── Editorial caption (figure caption / footnote). ──
export function Caption({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 page-marker text-white/40 max-w-2xl">{children}</p>
  );
}

// ── Annotation: a small mono label pointing at a feature. ──
export function Annotation({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-baseline gap-1.5 align-baseline">
      <span className="page-marker rounded-sm bg-primary-500/15 border border-primary-500/30 px-1 py-0.5 text-primary-200">
        {index}
      </span>
      <span className="text-xs text-white/55 leading-relaxed">{children}</span>
    </span>
  );
}
