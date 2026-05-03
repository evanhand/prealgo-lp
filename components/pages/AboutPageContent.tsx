'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Navbar } from '../landing/Navbar';
import { Footer } from '../landing/Footer';

const founder = {
  name: 'Evan Hand',
  role: 'Founder',
  image: 'https://media.licdn.com/dms/image/v2/D4E03AQG2vplaYI84eQ/profile-displayphoto-shrink_400_400/B4EZYR4D4JHUAk-/0/1744056631121?e=1779321600&v=beta&t=-ecVk-u6vKZfAo-SxwGneYaEf8X34TbwFXjuvw3RmYA',
};

const socials = [
  { platform: 'X',         handle: '@Evan_Hand',   href: 'https://x.com/Evan_Hand' },
  { platform: 'Instagram', handle: '@evanhandd',   href: 'https://instagram.com/evanhandd' },
  { platform: 'YouTube',   handle: '@theevanhand', href: 'https://youtube.com/@theevanhand' },
  { platform: 'TikTok',    handle: '@evhandd',     href: 'https://tiktok.com/@evhandd' },
];

const stats = [
  { v: '1B+',     l: 'Founder views' },
  { v: '1M+',     l: 'Founder followers' },
  { v: '11,000+', l: 'Videos analyzed' },
  { v: '1,000+',  l: 'Active creators' },
];

const beliefs = [
  {
    n: '01',
    headline: 'Most "viral" advice is vibes.',
    accent: 'We picked numbers.',
    body: 'Hook archetypes. Retention curves. Specific timestamps. The model is trained on real performance, not threads.',
  },
  {
    n: '02',
    headline: 'Posting blind is the bug.',
    accent: 'Pre-flight is the fix.',
    body: 'You spend hours on a video. Spending 90 seconds to know how it will land before you post is the obvious move.',
  },
  {
    n: '03',
    headline: 'A grade is not a fix.',
    accent: 'We give you the fix.',
    body: 'Every analysis ends with a ranked list of changes with timestamps and predicted impact. Not "improve your hook."',
  },
];

export const AboutPageContent: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 sm:pt-40 pb-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.18),transparent_70%)]" />
          <div className="absolute inset-0 bg-grid-tight mask-radial-fade opacity-30" />
        </div>

        <div className="container-tight relative">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary-300">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
              About
            </span>
            <h1 className="max-w-4xl text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.0] text-white">
              Built by a creator{' '}
              <span className="accent-gradient">with a billion views.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base sm:text-lg text-white/60 leading-relaxed">
              PreAlgo exists because guessing whether your next post will land is a stupid way to spend creative energy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="container-tight">
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-b border-white/[0.06] divide-x divide-white/[0.06]">
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="px-4 sm:px-5 py-7"
            >
              <div className="text-2xl sm:text-4xl font-bold tracking-tight text-white tabular-nums">{s.v}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/45 mt-1.5">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOUNDER */}
      <section className="container-tight pt-20 pb-12">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary-300 mb-6">
          <span>Founder</span>
          <span className="h-px w-6 bg-primary-300/40" />
          <span className="text-white/40">Evan Hand</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-primary-500/15 via-primary-500/[0.04] to-transparent blur-2xl pointer-events-none" />
          <div className="relative rounded-2xl border border-white/[0.10] bg-neutral-950/90 backdrop-blur-xl p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center">
              <div className="relative h-40 w-40 sm:h-52 sm:w-52 mx-auto lg:mx-0">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary-500/30 via-secondary-500/20 to-primary-500/10 blur-xl" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="relative h-full w-full rounded-full object-cover ring-2 ring-white/10"
                />
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] text-white">
                  Spent years figuring out{' '}
                  <span className="accent-gradient">what actually goes viral.</span>
                </h2>
                <p className="mt-5 text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl">
                  Evan grew an audience past a million followers and a billion total views before realizing every breakthrough video had the same handful of patterns. PreAlgo is those patterns, automated, so every creator gets the same data-driven edge.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.platform}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-md border border-white/[0.10] bg-white/[0.03] px-3 py-1.5 text-xs text-white/75 hover:bg-white/[0.06] hover:border-primary-500/30 hover:text-white transition-colors"
                    >
                      <span className="font-semibold">{s.platform}</span>
                      <span className="font-mono text-white/45 group-hover:text-white/70 transition-colors">{s.handle}</span>
                      <ArrowUpRight className="h-3 w-3 text-white/40 group-hover:text-primary-300 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* BELIEFS */}
      <main className="container-tight">
        {beliefs.map((b, i) => (
          <motion.section
            key={b.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="grid grid-cols-1 lg:grid-cols-[160px_1fr] gap-6 lg:gap-12 py-12 border-t border-white/[0.06]"
          >
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-primary-300">
                §{b.n}
              </div>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] text-white max-w-3xl">
                {b.headline}{' '}
                <span className="accent-gradient">{b.accent}</span>
              </h3>
              <p className="mt-4 text-sm sm:text-base text-white/55 leading-relaxed max-w-2xl">
                {b.body}
              </p>
            </div>
          </motion.section>
        ))}
      </main>

      {/* CTA */}
      <section className="container-tight pt-12 pb-24">
        <div className="rounded-2xl border border-white/[0.10] bg-gradient-to-br from-primary-500/[0.12] via-primary-500/[0.04] to-transparent p-8 sm:p-12 text-center">
          <h3 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-white">
            Same edge.{' '}
            <span className="accent-gradient">Run a video on us.</span>
          </h3>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-neutral-950 hover:bg-white/90 transition-colors"
            >
              Start free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/12 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-white/85 hover:bg-white/[0.06] transition-colors"
            >
              What you get
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPageContent;
