'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Eye, BarChart3, Lightbulb } from 'lucide-react';

const CONTENT_GRADE = 'B+';
const SCORE_LABEL = '25K-50K estimated views';

const grades = [
  { label: 'Hook', grade: '4/5', color: 'text-cyan-400', bg: 'bg-cyan-400/15', border: 'border-cyan-400/30' },
  { label: 'Retention', grade: '35%', color: 'text-amber-400', bg: 'bg-amber-400/15', border: 'border-amber-400/30' },
  { label: 'X-Factor', grade: 'No', color: 'text-red-400', bg: 'bg-red-400/15', border: 'border-red-400/30' },
];

const predictions = [
  { icon: Eye, label: 'Predicted Views', value: '25K - 50K' },
  { icon: BarChart3, label: 'Retention', value: '35%', extra: 'avg' },
];

const recommendation =
  'Switch from talking head to greenscreen format - similar videos see 62x higher median views';

// Stagger helpers
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export const DataVisualization: React.FC = () => {
  // Letter grade reveal
  const [showGrade, setShowGrade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowGrade(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Typewriter for the recommendation
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const startDelay = 1800;
    let idx = 0;
    let rafId: number;

    const timeout = setTimeout(() => {
      const typeNext = () => {
        if (idx <= recommendation.length) {
          setTypedText(recommendation.slice(0, idx));
          idx++;
          rafId = window.setTimeout(typeNext, 28) as unknown as number;
        }
      };
      typeNext();
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearTimeout(rafId);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg"
    >
      {/* Background gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10 pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative"
      >
        {/* Header */}
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-between px-4 pt-4 pb-3 sm:px-5 sm:pt-5 sm:pb-3 border-b border-white/10"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Sample Analysis
            </span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] sm:text-xs font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Preview
          </span>
        </motion.div>

        {/* Title row */}
        <motion.div variants={fadeUp} className="px-4 pt-4 sm:px-5 sm:pt-5">
          <h3 className="text-sm sm:text-base font-semibold text-white/90 tracking-tight">
            PreAlgo Analysis
          </h3>
        </motion.div>

        {/* Content Grade */}
        <motion.div variants={fadeUp} className="px-4 pt-3 sm:px-5 sm:pt-4">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center justify-center rounded-xl bg-cyan-400/15 border border-cyan-400/30 h-20 w-20 sm:h-24 sm:w-24 shrink-0">
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={showGrade ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="text-3xl sm:text-4xl font-bold text-cyan-400"
              >
                {CONTENT_GRADE}
              </motion.span>
              <span className="text-[10px] sm:text-xs font-medium text-white/50 mt-0.5">Content Grade</span>
            </div>
            <div className="min-w-0">
              <motion.p
                variants={fadeUp}
                className="text-xs sm:text-sm font-medium text-cyan-400/90 italic"
              >
                &ldquo;{SCORE_LABEL}&rdquo;
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Grade Cards */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-3 gap-2 sm:gap-3 px-4 pt-4 sm:px-5 sm:pt-5"
        >
          {grades.map((g, i) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.9 + i * 0.12, ease: 'easeOut' }}
              className={`rounded-lg ${g.bg} border ${g.border} p-2 sm:p-3 text-center`}
            >
              <span className="block text-[10px] sm:text-xs font-medium text-white/50 mb-0.5 sm:mb-1">
                {g.label}
              </span>
              <span className={`block text-xl sm:text-2xl font-bold ${g.color}`}>
                {g.grade}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Predictions */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-2 gap-2 sm:gap-3 px-4 pt-3 sm:px-5 sm:pt-4"
        >
          {predictions.map((p) => (
            <div
              key={p.label}
              className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-2 sm:px-3 sm:py-2.5"
            >
              <p.icon className="h-4 w-4 shrink-0 text-primary-400" />
              <div className="min-w-0">
                <span className="block text-[10px] sm:text-xs text-white/50 leading-tight">
                  {p.label}
                </span>
                <span className="block text-sm sm:text-base font-semibold text-white leading-tight">
                  {p.value}
                  {p.extra && (
                    <span className="ml-1 text-[10px] sm:text-xs font-normal text-emerald-400">
                      ({p.extra})
                    </span>
                  )}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Recommendation */}
        <motion.div variants={fadeUp} className="px-4 pt-3 pb-4 sm:px-5 sm:pt-4 sm:pb-5">
          <div className="rounded-lg bg-white/5 border border-white/10 p-3 sm:p-3">
            <div className="flex items-start gap-2">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400/15">
                <Lightbulb className="h-3 w-3 text-amber-400" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/40 mb-0.5">
                  Top Recommendation
                </span>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  &ldquo;{typedText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                    className="inline-block w-[2px] h-3.5 sm:h-4 align-text-bottom bg-white/60 ml-px"
                  />
                  &rdquo;
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom accent bar */}
        <div className="flex items-center justify-center gap-1.5 border-t border-white/10 py-2 sm:py-2.5">
          <TrendingUp className="h-3 w-3 text-primary-400" />
          <span className="text-[10px] sm:text-xs text-white/40 font-medium">
            Powered by PreAlgo AI
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};
