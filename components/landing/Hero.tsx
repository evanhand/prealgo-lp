'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Play } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.25),transparent_70%)]" />
        <div className="absolute right-0 top-32 h-[500px] w-[500px] translate-x-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.20),transparent_70%)]" />
      </div>

      <div className="container-tight relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-primary-300" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-primary-200">
              AI Content Analyzer
            </span>
          </div>

          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Know what your video will do{' '}
            <span className="bg-gradient-to-r from-primary-300 to-secondary-300 bg-clip-text text-transparent">
              before you post it.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
            Upload a short-form video. PreAlgo grades it, predicts views per platform, and tells you what to fix. Trained on 10,000+ real posted videos with actual view counts.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-shadow"
            >
              Analyze your first video free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/sample"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-base font-medium text-white/80 hover:bg-white/[0.06] transition-colors"
            >
              <Play className="h-4 w-4" />
              See a sample
            </Link>
          </div>

          <p className="mt-4 text-xs text-white/35">
            Free plan included. No credit card required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
