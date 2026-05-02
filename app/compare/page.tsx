import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, X, ArrowRight } from 'lucide-react';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'PreAlgo vs Other Tools',
  description: 'How PreAlgo compares to VidIQ, ContentStudio, and other content optimization tools.',
  alternates: { canonical: '/compare' },
};

const ROWS: { feature: string; prealgo: boolean; vidiq: boolean; cs: boolean; tubebuddy: boolean }[] = [
  { feature: 'Pre-post AI grading',                   prealgo: true,  vidiq: false, cs: false, tubebuddy: false },
  { feature: 'Per-platform view prediction (TT/IG/YT)', prealgo: true,  vidiq: false, cs: false, tubebuddy: false },
  { feature: 'Anchored on real posted-video data',     prealgo: true,  vidiq: false, cs: false, tubebuddy: false },
  { feature: 'Hook archetype + rewrite',               prealgo: true,  vidiq: false, cs: false, tubebuddy: false },
  { feature: 'Retention curve prediction',             prealgo: true,  vidiq: false, cs: false, tubebuddy: false },
  { feature: 'Free plan (full pipeline)',              prealgo: true,  vidiq: true,  cs: false, tubebuddy: true },
  { feature: 'Keyword research',                       prealgo: false, vidiq: true,  cs: true,  tubebuddy: true },
  { feature: 'Multi-platform scheduler',               prealgo: false, vidiq: false, cs: true,  tubebuddy: false },
];

export default function ComparePage() {
  return (
    <PageShell>
      <section className="container-tight pb-4 pt-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary-300 mb-3">
          Compare
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          PreAlgo vs other content tools.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/60 leading-relaxed">
          Most tools help you optimize <em>after</em> you&apos;ve posted: keyword research, scheduling, performance dashboards. PreAlgo grades the video <em>before</em> you post it.
        </p>
      </section>

      <section className="container-tight py-12">
        <div className="overflow-x-auto rounded-2xl border border-white/[0.08]">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.04]">
              <tr>
                <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-white/45">
                  Feature
                </th>
                <th className="px-4 py-3 text-center font-semibold text-primary-300">PreAlgo</th>
                <th className="px-4 py-3 text-center font-semibold text-white/55">VidIQ</th>
                <th className="px-4 py-3 text-center font-semibold text-white/55">ContentStudio</th>
                <th className="px-4 py-3 text-center font-semibold text-white/55">TubeBuddy</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.feature} className="border-t border-white/[0.06]">
                  <td className="px-4 py-3 text-white/85">{r.feature}</td>
                  <td className="px-4 py-3 text-center">{r.prealgo ? <Check className="mx-auto h-4 w-4 text-emerald-400" /> : <X className="mx-auto h-4 w-4 text-white/25" />}</td>
                  <td className="px-4 py-3 text-center">{r.vidiq ? <Check className="mx-auto h-4 w-4 text-emerald-400" /> : <X className="mx-auto h-4 w-4 text-white/25" />}</td>
                  <td className="px-4 py-3 text-center">{r.cs ? <Check className="mx-auto h-4 w-4 text-emerald-400" /> : <X className="mx-auto h-4 w-4 text-white/25" />}</td>
                  <td className="px-4 py-3 text-center">{r.tubebuddy ? <Check className="mx-auto h-4 w-4 text-emerald-400" /> : <X className="mx-auto h-4 w-4 text-white/25" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs text-white/35 max-w-3xl leading-relaxed">
          Comparison reflects the public feature sets of each product as of May 2026. PreAlgo focuses narrowly on pre-post analysis and prediction; the others are broader content-marketing platforms that don&apos;t do this specific job.
        </p>

        <Link
          href="/signup"
          className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-shadow"
        >
          Try PreAlgo free
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </section>
    </PageShell>
  );
}
