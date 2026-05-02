import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BarChart3, CheckCircle2, Sparkles } from 'lucide-react';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Sample Analysis',
  description: 'See exactly what a PreAlgo analysis looks like before you upload your own video.',
  alternates: { canonical: '/sample' },
};

export default function SamplePage() {
  return (
    <PageShell>
      <section className="container-tight pb-4 pt-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary-300 mb-3">
          Sample
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Here&apos;s what an analysis looks like.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/60 leading-relaxed">
          Real analysis on a real posted video. This is exactly what you get for every video you upload.
        </p>
      </section>

      <section className="container-tight max-w-3xl py-12 space-y-6">
        {/* Grade hero */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
          <div className="flex items-baseline justify-between mb-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">Content Grade</p>
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-mono uppercase tracking-widest text-emerald-200">
              <CheckCircle2 className="h-3 w-3" /> Ready to post
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-7xl font-black tracking-tight text-white">A</span>
            <span className="text-base text-white/55">300K-500K predicted</span>
          </div>
          <p className="mt-4 text-sm text-white/65 leading-relaxed border-t border-white/[0.06] pt-4">
            Killer hot take, sharp greenscreen format, and the U-R Bernard example is an incredible share-trigger. It&apos;s exceptionally well-executed and will likely resonate widely within your niche, hitting top-tier performance.
          </p>
        </div>

        {/* Per-platform reach */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-4">
            Estimated Reach by Platform
          </p>
          <div className="space-y-2">
            {[
              { platform: 'TikTok', typical: '3K-5K', creator: '300K-500K', best: '3M-5M', best_platform: true },
              { platform: 'Instagram', typical: '3K-5K', creator: '300K-500K', best: '5M+', best_platform: false },
              { platform: 'YouTube', typical: '1K-3K', creator: '150K-300K', best: '1M-3M', best_platform: false },
            ].map((row) => (
              <div
                key={row.platform}
                className={`grid grid-cols-2 sm:grid-cols-[110px_1fr_1.15fr_1fr] gap-3 items-stretch`}
              >
                <div className="col-span-2 sm:col-span-1 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-sm font-semibold text-white/85">
                  {row.platform}
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3">
                  <p className="text-base font-semibold text-white/65">{row.typical}</p>
                </div>
                <div
                  className={`rounded-xl border px-3.5 py-3 ${
                    row.best_platform
                      ? 'border-primary-400/50 bg-gradient-to-br from-primary-500/[0.18] to-primary-500/[0.04]'
                      : 'border-primary-500/30 bg-primary-500/[0.07]'
                  }`}
                >
                  <p className="text-base font-bold text-white">{row.creator}</p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3">
                  <p className="text-base font-semibold text-white/65">{row.best}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality breakdown */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">
                Quality Breakdown
              </p>
              <h3 className="text-base font-semibold text-white">How well this video is built</h3>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-emerald-400">94<span className="text-sm text-white/30">/100</span></p>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {[
              ['Hook', '25/25'],
              ['X-Factor', '24/30'],
              ['Emotion', '20/20'],
              ['Format', '10/10'],
              ['Execution', '10/10'],
              ['Value', '5/5'],
            ].map(([label, val]) => (
              <li key={label} className="flex items-center justify-between border-b border-white/[0.04] pb-1.5">
                <span className="text-white/60">{label}</span>
                <span className="font-mono text-white/85">{val}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action items teaser */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-300">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">Top fix</p>
              <h3 className="text-base font-semibold text-white">Strengthen the visual hook</h3>
            </div>
          </div>
          <p className="text-sm text-white/65 leading-relaxed">
            The verbal hook lands but the first frame is a static medium shot. Replace with the U-R Bernard photo as a cold open at frame 1 — pattern-interrupt + immediate context. Predicted impact: <span className="font-semibold text-amber-200">High</span>.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/signup"
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-shadow w-full sm:w-auto"
        >
          <BarChart3 className="h-4 w-4" />
          Get this on your own video
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </section>
    </PageShell>
  );
}
