'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Brain, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Upload your content',
    description:
      'Drop in your video or paste a link. We accept content from TikTok, Instagram Reels, and YouTube Shorts.',
  },
  {
    number: '02',
    icon: Brain,
    title: 'AI analyzes everything',
    description:
      'Our model scores your hook, pacing, CTA, retention patterns, and viral potential in seconds - trained on thousands of real performance outcomes.',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Fix, then post',
    description:
      'Get specific, actionable changes. Apply them before publishing and watch your content outperform what you would have posted.',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-neutral-950 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-primary-500/10 blur-3xl" />
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
            → How it works
          </span>
          <h2 className="text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
            Three steps.{' '}
            <span className="accent-gradient">Under two minutes.</span>
          </h2>
          <p className="mt-4 text-base text-white/50 sm:text-lg">
            From upload to an actionable report you can act on before posting.
          </p>
        </motion.div>

        <div className="relative grid gap-px overflow-hidden rounded-xl border border-white/5 bg-white/5 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative flex flex-col gap-5 bg-neutral-950 p-6 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-white/80 transition-all group-hover:border-primary-500/40 group-hover:bg-primary-500/10 group-hover:text-primary-300">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-4xl font-bold tracking-tighter text-white/[0.05]">
                    {step.number}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/50 sm:text-base">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
