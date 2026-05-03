'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles, Mail } from 'lucide-react';
import { Navbar } from '../landing/Navbar';
import { Footer } from '../landing/Footer';
import { FaqItem } from '../landing/FaqItem';

interface Plan {
  name: string;
  priceId: string;
  price: number;
  analyses: number | string;
  blurb: string;
  highlight?: boolean;
  cta: string;
}

const PLANS: Plan[] = [
  {
    name: 'Free',
    priceId: 'price_1RNeN0RtB0k9odPOLiyuzoGx',
    price: 0,
    analyses: 1,
    blurb: 'Try the full pipeline.',
    cta: 'Start free',
  },
  {
    name: 'Creator',
    priceId: 'price_1Smho3RtB0k9odPO5MdQr6kL',
    price: 9.99,
    analyses: 15,
    blurb: 'For solo creators.',
    cta: 'Start Creator',
    highlight: true,
  },
  {
    name: 'Pro',
    priceId: 'price_1SmhovRtB0k9odPOH30FyYsv',
    price: 24.99,
    analyses: 50,
    blurb: 'For growing channels.',
    cta: 'Go Pro',
  },
  {
    name: 'Agency',
    priceId: 'price_1SmhsnRtB0k9odPOgUo0BYGE',
    price: 79.99,
    analyses: 200,
    blurb: 'Multi-account managers.',
    cta: 'Go Agency',
  },
];

const FAQS = [
  { q: 'What counts as one analysis?', a: 'Each video you upload counts as one. Re-viewing a completed analysis is free.' },
  { q: 'Can I upgrade or downgrade?',  a: 'Yes, anytime. Upgrades are immediate. Downgrades take effect at the next billing cycle.' },
  { q: 'Do unused analyses roll over?', a: 'No. Counts reset at the start of each billing period.' },
  { q: 'Is my content private?',        a: 'Yes. Your videos are only used for your analysis and never shared without explicit permission.' },
  { q: 'Can I cancel anytime?',         a: 'Yes. One click in settings. You keep access through the end of the period.' },
];

export const PricingPageContent: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubscribe = (priceId: string) => {
    setLoading(priceId);
    router.push(`/signup?plan=${encodeURIComponent(priceId)}`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 sm:pt-40 pb-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.18),transparent_70%)]" />
          <div className="absolute inset-0 bg-grid-tight mask-radial-fade opacity-30" />
        </div>

        <div className="container-tight relative text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary-300">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
              Pricing
            </span>
            <h1 className="mx-auto max-w-3xl text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.0] text-white">
              Same analysis on every plan.{' '}
              <span className="accent-gradient">Different volume.</span>
            </h1>
            <p className="mt-6 mx-auto max-w-xl text-base sm:text-lg text-white/60 leading-relaxed">
              Free covers your first video. Paid plans scale how many you can run per month.
            </p>
          </motion.div>
        </div>
      </section>

      {/* TIERS */}
      <section className="container-tight pt-4 pb-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p, i) => {
            const isLoading = loading === p.priceId;
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`relative flex flex-col rounded-2xl border p-6 sm:p-7 ${
                  p.highlight
                    ? 'border-primary-400/50 bg-gradient-to-br from-primary-500/[0.14] via-primary-500/[0.04] to-transparent shadow-2xl shadow-primary-500/10'
                    : 'border-white/[0.08] bg-white/[0.02]'
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-2.5 left-6 inline-flex items-center gap-1 rounded-full bg-primary-500 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-white shadow-lg shadow-primary-500/40">
                    <Sparkles className="h-3 w-3" /> Most popular
                  </span>
                )}

                <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">
                  {p.name}
                </div>

                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl sm:text-5xl font-bold tracking-tight text-white tabular-nums">
                    ${p.price === 0 ? '0' : p.price}
                  </span>
                  <span className="text-sm text-white/40">/mo</span>
                </div>

                <p className="mt-3 text-sm text-white/55 leading-snug">{p.blurb}</p>

                <div className="mt-6 mb-6 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">Analyses included</div>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-white tabular-nums">{p.analyses}</span>
                    <span className="text-xs text-white/45">/ month</span>
                  </div>
                </div>

                <button
                  onClick={() => handleSubscribe(p.priceId)}
                  disabled={isLoading}
                  className={`mt-auto inline-flex items-center justify-center gap-1.5 rounded-md px-4 py-3 text-sm font-semibold transition-colors disabled:opacity-60 ${
                    p.highlight
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50'
                      : 'border border-white/12 bg-white/[0.03] text-white/85 hover:bg-white/[0.06]'
                  }`}
                >
                  {isLoading ? 'Redirecting...' : p.cta}
                  {!isLoading && <ArrowRight className="h-4 w-4" />}
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-white/40">
          <span>Cancel anytime</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>No credit card on Free</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>Same AI pipeline on every plan</span>
        </div>
      </section>

      {/* WHAT'S IN EVERY PLAN */}
      <section className="container-tight pt-8 pb-16 border-t border-white/[0.06]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-primary-300 mb-4">
              Every plan, no upsell
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] text-white">
              The free analysis is the{' '}
              <span className="accent-gradient">same analysis</span> as the paid one.
            </h2>
            <p className="mt-5 text-sm sm:text-base text-white/55 leading-relaxed max-w-md">
              The only thing that scales with price is how many videos you can analyze per month.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'AI grade A+ to F',
              'Per-platform view forecast',
              'Hook archetype + rewrite',
              'Predicted retention curve',
              'Ranked fix list',
              'Comparable video lookup',
              'Pacing + density rating',
              'Best-practice violations',
            ].map((feat) => (
              <div key={feat} className="flex items-start gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-3">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-300" />
                <span className="text-sm text-white/80">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pt-12 pb-20 border-t border-white/[0.06]">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="font-mono text-[11px] uppercase tracking-widest text-primary-300 mb-3">FAQ</div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-white">
              Quick answers.
            </h2>
          </div>

          <div className="space-y-2">
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <FaqItem
                  key={f.q}
                  q={f.q}
                  a={f.a}
                  isOpen={isOpen}
                  onToggle={() => setOpenFaq(isOpen ? null : i)}
                />
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <a
              href="mailto:business@thecontentlabs.io"
              className="inline-flex items-center gap-1.5 text-sm text-primary-300 hover:text-primary-200 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              Something else? Email us.
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-tight pb-24">
        <div className="rounded-2xl border border-white/[0.10] bg-gradient-to-br from-primary-500/[0.12] via-primary-500/[0.04] to-transparent p-8 sm:p-12 text-center">
          <h3 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-white">
            Run a video.{' '}
            <span className="accent-gradient">Pick a plan after.</span>
          </h3>
          <p className="mt-4 mx-auto max-w-md text-sm sm:text-base text-white/60 leading-relaxed">
            Free includes your first analysis. No credit card.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-neutral-950 hover:bg-white/90 transition-colors"
            >
              Start free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/sample"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/12 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-white/85 hover:bg-white/[0.06] transition-colors"
            >
              See a sample
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PricingPageContent;
