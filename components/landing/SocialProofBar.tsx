'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, Instagram } from 'lucide-react';

const platforms = [
  { icon: <Youtube className="h-4 w-4" />, name: 'YouTube Shorts' },
  { icon: <Instagram className="h-4 w-4" />, name: 'Instagram Reels' },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .54.05.79.12v-3.46a6.37 6.37 0 0 0-.79-.05A6.36 6.36 0 0 0 3 16a6.36 6.36 0 0 0 6.36 6.36 6.36 6.36 0 0 0 6.36-6.36V7.62a8.16 8.16 0 0 0 3.87.93v-3.34a4.85 4.85 0 0 1-2.92-.87" />
      </svg>
    ),
    name: 'TikTok',
  },
];

const stats = [
  { value: '11,000+', label: 'Videos analyzed' },
  { value: '< 2 min', label: 'Analysis time' },
  { value: '98%', label: 'Margin on compute' },
];

export const SocialProofBar: React.FC = () => {
  return (
    <section className="relative border-y border-white/5 bg-neutral-950 py-5">
      <div className="container-tight">
        <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <span className="font-mono text-[11px] uppercase tracking-widest text-white/30">
              Analyzes
            </span>
            {platforms.map((platform, i) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.35 }}
                className="flex items-center gap-1.5 text-white/50 transition-colors hover:text-white/80"
              >
                {platform.icon}
                <span className="text-xs font-medium sm:text-sm">{platform.name}</span>
              </motion.div>
            ))}
          </div>

          <div className="hidden h-6 w-px bg-white/5 md:block" />

          <div className="flex items-center gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + 0.08 * i, duration: 0.35 }}
                className="flex flex-col items-center md:items-start"
              >
                <div className="text-sm font-semibold text-white sm:text-base">{stat.value}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
