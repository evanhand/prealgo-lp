'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Brain,
  LineChart,
  Sparkles,
  Target,
  ArrowRight,
  CheckCircle,
  Upload,
  Rocket,
  Eye,
  BarChart3,
  MessageSquare,
  Lightbulb,
  Clock,
  Zap,
  Shield,
} from 'lucide-react';
import { Navbar } from '../landing/Navbar';
import { Footer } from '../landing/Footer';
import { HowItWorks } from '../landing/HowItWorks';
import { TestimonialCard } from '../landing/TestimonialCard';

const deepFeatures = [
  {
    icon: <Brain className="h-7 w-7" />,
    title: 'AI-Powered Performance Prediction',
    subtitle: 'Know your numbers before you post',
    description:
      'Our model was trained on 11,000+ real videos - viral hits and total flops - to learn what actually drives views. Upload your content and get a predicted view range, engagement rate, and viral probability score within seconds.',
    highlights: [
      'Predicted view count range (e.g. 45K-85K)',
      'Engagement rate estimate vs. niche average',
      'Viral probability score with confidence level',
      'Overall content grade from A+ to F',
    ],
    iconBg: 'bg-blue-500/15',
    iconColor: 'text-blue-400',
    accent: 'from-blue-500 to-cyan-400',
  },
  {
    icon: <LineChart className="h-7 w-7" />,
    title: 'Retention Analysis',
    subtitle: 'See exactly where viewers drop off',
    description:
      'Our AI maps the predicted retention curve of your video second-by-second. You\'ll see the exact moments where viewers are likely to swipe away - and why - so you can fix weak spots before they cost you views.',
    highlights: [
      'Second-by-second retention heatmap',
      'Drop-off point identification with reasons',
      'Average watch-through percentage',
      'Comparison against top-performing benchmarks',
    ],
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
    accent: 'from-emerald-500 to-teal-400',
  },
  {
    icon: <Sparkles className="h-7 w-7" />,
    title: 'Actionable Recommendations',
    subtitle: 'Not vague advice - specific fixes',
    description:
      'Every analysis includes concrete, prioritized recommendations you can apply immediately. We don\'t just tell you something is wrong - we tell you exactly how to fix it, with AI-generated alternatives for your hook, CTA, and structure.',
    highlights: [
      'AI-rewritten hook alternatives',
      'CTA effectiveness score + rewrites',
      'Pacing and structure suggestions',
      'Platform-specific optimization tips',
    ],
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-400',
    accent: 'from-amber-500 to-orange-400',
  },
  {
    icon: <Target className="h-7 w-7" />,
    title: 'Competitive Benchmarking',
    subtitle: 'Stack up against the best in your niche',
    description:
      'See how your content compares to top-performing videos in your category. Understand what separates viral content from average posts and get a clear roadmap to close the gap.',
    highlights: [
      'Niche-specific performance comparison',
      'Gap analysis vs. top performers',
      'Trending format and style insights',
      'Content quality scoring across 8 dimensions',
    ],
    iconBg: 'bg-rose-500/15',
    iconColor: 'text-rose-400',
    accent: 'from-rose-500 to-pink-400',
  },
];

const analysisIncludes = [
  { icon: <BarChart3 className="h-4 w-4" />, text: 'Overall content grade (A+ to F)' },
  { icon: <Eye className="h-4 w-4" />, text: 'Predicted view range' },
  { icon: <LineChart className="h-4 w-4" />, text: 'Retention curve with drop-off points' },
  { icon: <Sparkles className="h-4 w-4" />, text: 'Hook effectiveness score' },
  { icon: <MessageSquare className="h-4 w-4" />, text: 'AI-generated hook rewrite' },
  { icon: <Target className="h-4 w-4" />, text: 'CTA rating + improvement suggestions' },
  { icon: <Brain className="h-4 w-4" />, text: 'Platform-specific feedback (TikTok / IG / YT)' },
  { icon: <Lightbulb className="h-4 w-4" />, text: 'Prioritized optimization recommendations' },
];

export const FeaturesPageContent: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-primary-950 to-secondary-900 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.08),transparent)]" />
        <div className="container-tight relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/50">
              Features
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              <span className="bg-gradient-to-r from-white via-primary-200 to-secondary-200 bg-clip-text text-transparent">
                Every Tool You Need to Go Viral
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg md:text-xl">
              Upload your video. Get a full breakdown of what works, what doesn't, and exactly
              what to change - all backed by data from 11,000+ real videos.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 px-8 py-4 text-base font-semibold text-white transition-all hover:shadow-lg hover:shadow-primary-500/25 hover:brightness-110 md:text-lg"
              >
                Analyze Your First Video Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-sm text-white/40">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-amber-400" />
                Results in under 2 minutes
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-success-400" />
                No credit card required
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Deep Feature Sections */}
      <section className="bg-neutral-900 py-20 sm:py-28">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/50">
              Core Features
            </span>
            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Everything You Need to Optimize
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/50 sm:text-lg">
              Four pillars of analysis that tell you exactly what to fix - and how to fix it
            </p>
          </motion.div>

          <div className="space-y-6">
            {deepFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px">
                  <div
                    className={`h-full bg-gradient-to-r ${feature.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-60`}
                  />
                </div>

                <div className="p-6 sm:p-8 md:p-10">
                  <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
                    {/* Left: icon + text */}
                    <div className="flex-1">
                      <div
                        className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl ${feature.iconBg} ${feature.iconColor}`}
                      >
                        {feature.icon}
                      </div>
                      <h3 className="mb-1 text-xl font-bold text-white sm:text-2xl">
                        {feature.title}
                      </h3>
                      <p className={`mb-4 text-sm font-medium ${feature.iconColor}`}>
                        {feature.subtitle}
                      </p>
                      <p className="max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
                        {feature.description}
                      </p>
                    </div>

                    {/* Right: highlights */}
                    <div className="shrink-0 md:w-72 lg:w-80">
                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 sm:p-5">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                          What you get
                        </p>
                        <div className="space-y-2.5">
                          {feature.highlights.map((item, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <CheckCircle
                                className={`mt-0.5 h-4 w-4 shrink-0 ${feature.iconColor}`}
                              />
                              <span className="text-sm text-white/70">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's in Every Analysis */}
      <section className="bg-neutral-950 py-20 sm:py-28">
        <div className="container-tight">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/50">
                Complete Breakdown
              </span>
              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                What's in Every Analysis
              </h2>
              <p className="mt-4 max-w-lg text-base text-white/50 sm:text-lg">
                Every plan - including free - gets the full analysis. No feature gates, no
                watered-down results.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {analysisIncludes.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5"
                  >
                    <span className="text-primary-400">{item.icon}</span>
                    <span className="text-sm text-white/70">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Visual: mini feature grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                {
                  icon: <Upload className="h-6 w-6 text-blue-400" />,
                  label: 'Upload',
                  desc: 'Drop your video or paste a link',
                  bg: 'bg-blue-500/10',
                  border: 'border-blue-500/20',
                },
                {
                  icon: <Brain className="h-6 w-6 text-emerald-400" />,
                  label: 'Analyze',
                  desc: 'AI scores 8+ dimensions',
                  bg: 'bg-emerald-500/10',
                  border: 'border-emerald-500/20',
                },
                {
                  icon: <Lightbulb className="h-6 w-6 text-amber-400" />,
                  label: 'Optimize',
                  desc: 'Get specific fixes to apply',
                  bg: 'bg-amber-500/10',
                  border: 'border-amber-500/20',
                },
                {
                  icon: <Rocket className="h-6 w-6 text-rose-400" />,
                  label: 'Post',
                  desc: 'Publish with confidence',
                  bg: 'bg-rose-500/10',
                  border: 'border-rose-500/20',
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className={`rounded-xl border ${card.border} ${card.bg} p-5 text-center`}
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
                    {card.icon}
                  </div>
                  <p className="text-sm font-semibold text-white">{card.label}</p>
                  <p className="mt-1 text-xs text-white/40">{card.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Speed + Simplicity */}
      <section className="bg-neutral-900 py-16 sm:py-20">
        <div className="container-tight">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <Clock className="h-6 w-6 text-blue-400" />,
                title: '30-Second Results',
                description:
                  'No waiting for platform analytics. Upload your video and get a full analysis in about 1-2 minutes.',
                bg: 'bg-blue-500/10',
                border: 'border-blue-500/20',
              },
              {
                icon: <Zap className="h-6 w-6 text-amber-400" />,
                title: 'Fix Before You Post',
                description:
                  'See exactly what to change before publishing. Stop posting and praying - start posting with data.',
                bg: 'bg-amber-500/10',
                border: 'border-amber-500/20',
              },
              {
                icon: <Shield className="h-6 w-6 text-emerald-400" />,
                title: '100% Private',
                description:
                  'Your videos are only accessible to you. We never share, publish, or use your content for anything else.',
                bg: 'bg-emerald-500/10',
                border: 'border-emerald-500/20',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`rounded-xl border ${item.border} ${item.bg} p-6`}
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-neutral-950 py-16 sm:py-20">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/50">
              Testimonials
            </span>
            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Creators See Real Results
            </h2>
          </motion.div>

          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
            {[
              {
                quote:
                  'I used to spend hours guessing what would work. Now I know before I post. My views have tripled since I started using PreAlgo.',
                author: 'Jordan M.',
                role: 'TikTok Creator, 240K followers',
              },
              {
                quote:
                  'The retention graph alone is worth it. I can see exactly where viewers drop off and fix it before posting. Game changer.',
                author: 'Priya S.',
                role: 'YouTube Shorts Creator',
              },
              {
                quote:
                  'Finally a tool that gives real data, not vibes. The hook analysis helped me rewrite my openings and my engagement rate doubled.',
                author: 'Marcus T.',
                role: 'Instagram Reels, 85K followers',
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-neutral-950 py-20 sm:py-28">
        <div className="container-tight">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.12),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent)]" />

            <div className="relative px-6 py-16 sm:px-16 sm:py-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                  Ready to Post with Confidence?
                </h2>
                <p className="mx-auto mb-8 max-w-xl text-base text-white/80 sm:text-lg">
                  Join 1,000+ creators who optimize their content with data from 11,000+ real
                  videos. Your first analysis is free.
                </p>

                <Link
                  href="/signup"
                  className="group inline-flex items-center rounded-full bg-white px-8 py-3.5 font-semibold text-primary-700 transition-all hover:bg-white/90 hover:shadow-xl hover:shadow-black/20"
                >
                  Analyze Your First Video Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <p className="mt-6 text-sm text-white/50">
                  No credit card required. Cancel anytime.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
