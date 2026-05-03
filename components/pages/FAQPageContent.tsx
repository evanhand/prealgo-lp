'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { Navbar } from '../landing/Navbar';
import { Footer } from '../landing/Footer';
import { FaqItem } from '../landing/FaqItem';

const FAQ_GROUPS = [
  {
    n: '01',
    label: 'Getting started',
    questions: [
      { q: 'What is PreAlgo?', a: "AI that predicts how your video will perform before you post. Upload, get a grade, predicted views per platform, hook diagnosis, retention curve, and a ranked list of fixes with timestamps." },
      { q: 'How does it work?', a: "Upload a video. Our AI analyzes it against patterns from 11,000+ real videos. About 60-90 seconds later you get the full analysis." },
      { q: 'Which platforms does it support?', a: "TikTok, Instagram Reels, and YouTube Shorts. Every analysis includes platform-specific predictions and feedback for all three." },
      { q: 'What video formats work?', a: "MP4, MOV, WebM, and most common formats. Up to 10 minutes long, up to 500MB." },
    ],
  },
  {
    n: '02',
    label: 'Analysis + accuracy',
    questions: [
      { q: 'How accurate are the predictions?', a: "Our grading is calibrated against real performance: 56% of videos grade C-tier, only 1.6% earn A+, matching real-world view distributions. Predictions account for hook archetype, format type, and execution against benchmarks across all three platforms." },
      { q: "What's actually included?", a: "Content grade (A+ to F), per-platform predicted views (typical / your account / best case), retention curve with predicted dropoff timestamp, hook archetype + scored breakdown + suggested rewrite, ranked fix list with timestamps and impact ratings, and pacing/audio/visual quality scores." },
      { q: 'How long does it take?', a: "About 60 to 120 seconds for most videos. Longer videos take a bit more." },
      { q: 'Can I re-analyze the same video?', a: "Yes. Each re-analysis uses one credit. Recommended after applying fixes so you can see the score move." },
    ],
  },
  {
    n: '03',
    label: 'Pricing + billing',
    questions: [
      { q: 'Is there a free plan?', a: "Yes. One full analysis per month with all features. No credit card." },
      { q: 'What counts as one analysis?', a: "Each video you upload is one. Reopening a finished analysis is free." },
      { q: 'Can I upgrade or downgrade?', a: "Anytime. Upgrades are immediate. Downgrades take effect at the next billing cycle." },
      { q: 'Do unused analyses roll over?', a: "No. Counts reset at the start of each billing period." },
      { q: 'Can I cancel anytime?', a: "Yes. One click in settings. You keep access through the end of the period." },
    ],
  },
  {
    n: '04',
    label: 'Privacy + security',
    questions: [
      { q: 'Is my content kept private?', a: "Yes. Your videos are only used for your analysis. We never share or republish your content without explicit permission." },
      { q: 'How long do you store videos?', a: "Videos are processed and not permanently stored. Analysis results stay attached to your account while it's active." },
      { q: 'Who can see my results?', a: "Only you. Results are private to your account." },
    ],
  },
];

export const FAQPageContent: React.FC = () => {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 sm:pt-40 pb-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.18),transparent_70%)]" />
          <div className="absolute inset-0 bg-grid-tight mask-radial-fade opacity-30" />
        </div>

        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 relative text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary-300">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
              FAQ
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.0] text-white">
              The short answers.{' '}
              <span className="accent-gradient">In one place.</span>
            </h1>
            <p className="mt-6 mx-auto max-w-xl text-base sm:text-lg text-white/60 leading-relaxed">
              Most people land here looking for one of these.
            </p>
          </motion.div>
        </div>
      </section>

      {/* GROUPS */}
      <main className="mx-auto w-full max-w-3xl px-4 sm:px-6 pt-8">
        {FAQ_GROUPS.map((group, gIdx) => (
          <section key={group.n} className={`py-12 ${gIdx > 0 ? 'border-t border-white/[0.06]' : ''}`}>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary-300 mb-6">
              <span>{group.n}</span>
              <span className="h-px w-6 bg-primary-300/40" />
              <span>{group.label}</span>
            </div>

            <div className="space-y-2">
              {group.questions.map((faq, qIdx) => {
                const key = `${group.n}-${qIdx}`;
                const isOpen = openKey === key;
                return (
                  <FaqItem
                    key={key}
                    q={faq.q}
                    a={faq.a}
                    isOpen={isOpen}
                    onToggle={() => setOpenKey(isOpen ? null : key)}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </main>

      {/* CTA */}
      <section className="container-tight pt-12 pb-24">
        <div className="rounded-2xl border border-white/[0.10] bg-gradient-to-br from-primary-500/[0.12] via-primary-500/[0.04] to-transparent p-8 sm:p-12 text-center">
          <h3 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-white">
            Didn&apos;t find it?{' '}
            <span className="accent-gradient">Email us.</span>
          </h3>
          <p className="mt-4 mx-auto max-w-md text-sm sm:text-base text-white/60 leading-relaxed">
            We get back within 24 hours.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:business@thecontentlabs.io"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-neutral-950 hover:bg-white/90 transition-colors"
            >
              <Mail className="h-4 w-4" />
              business@thecontentlabs.io
            </a>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/12 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-white/85 hover:bg-white/[0.06] transition-colors"
            >
              Start free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQPageContent;
