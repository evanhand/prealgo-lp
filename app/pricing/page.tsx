import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { PageShell } from '@/components/PageShell';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple plans. Start with 1 free analysis per month. Paid plans from $9.99/month.',
  alternates: { canonical: '/pricing' },
};

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    cadence: '/month',
    description: 'Try AI-powered analysis on one video.',
    features: ['1 analysis per month', 'Full AI grade + fix list', 'Per-platform view prediction', 'Community support'],
    cta: 'Start free',
    href: '/signup',
  },
  {
    name: 'Creator',
    price: '$9.99',
    cadence: '/month',
    description: 'For hobbyists and small creators building their audience.',
    features: ['15 analyses per month', 'Full AI grade + fix list', 'Per-platform view prediction', 'Priority support (24h)'],
    cta: 'Start Creator',
    href: '/signup?plan=creator',
    highlighted: true,
  },
  {
    name: 'Pro',
    price: '$24.99',
    cadence: '/month',
    description: 'For growing creators with 1K-100K followers.',
    features: ['50 analyses per month', 'Full AI grade + fix list', 'Per-platform view prediction', 'Priority support (12h)'],
    cta: 'Go Pro',
    href: '/signup?plan=pro',
  },
  {
    name: 'Agency',
    price: '$79.99',
    cadence: '/month',
    description: 'For agencies and multi-account managers.',
    features: ['200 analyses per month', 'Full AI grade + fix list', 'Per-platform view prediction', 'Multi-account management', 'Priority support (4h)'],
    cta: 'Contact us',
    href: '/signup?plan=agency',
  },
];

const PRICE_VALUES: Record<string, string> = {
  Free: '0',
  Creator: '9.99',
  Pro: '24.99',
  Agency: '79.99',
};

export default function PricingPage() {
  return (
    <PageShell>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'PreAlgo',
          description: 'AI video analysis tool. Grades short-form videos and predicts views before posting.',
          brand: { '@type': 'Brand', name: 'PreAlgo' },
          offers: PLANS.map((p) => ({
            '@type': 'Offer',
            name: p.name,
            description: p.description,
            price: PRICE_VALUES[p.name],
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: `https://prealgo.com${p.href}`,
          })),
        }}
      />

      <section className="container-tight pb-4 pt-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary-300 mb-3">
          Pricing
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Simple plans. No upsell on the analysis itself.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/60 leading-relaxed">
          Every plan, including Free, runs the full AI pipeline on your video. The only thing that scales is how many videos you can analyze per month.
        </p>
      </section>

      <section className="container-tight py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-2xl border p-6 ${
                p.highlighted
                  ? 'border-primary-500/40 bg-gradient-to-b from-primary-500/[0.10] via-primary-500/[0.04] to-transparent'
                  : 'border-white/[0.08] bg-white/[0.02]'
              }`}
            >
              {p.highlighted && (
                <span className="absolute -top-2.5 left-6 inline-flex items-center rounded-full bg-primary-500 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-white">
                  Most popular
                </span>
              )}
              <p className="text-base font-semibold text-white">{p.name}</p>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-white">{p.price}</span>
                <span className="text-sm text-white/40">{p.cadence}</span>
              </div>
              <p className="mt-2 text-sm text-white/55 leading-relaxed">{p.description}</p>

              <ul className="mt-5 space-y-2 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/75">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-300" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={p.href}
                className={`mt-6 inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                  p.highlighted
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40'
                    : 'border border-white/10 bg-white/[0.03] text-white/85 hover:bg-white/[0.06]'
                }`}
              >
                {p.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
