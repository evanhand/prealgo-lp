'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import { Navbar } from '../landing/Navbar';
import { Footer } from '../landing/Footer';

export const AboutPageContent: React.FC = () => {
  const founder = {
    name: 'Evan Hand',
    role: 'Founder & CEO',
    image: 'https://pbs.twimg.com/profile_images/1906347163522678784/mtS5ia2L_400x400.jpg',
    bio: `Evan is a creator with over 1 billion views and 1 million+ followers. After dissecting the patterns behind viral content, he built PreAlgo to give every creator the same data-driven edge. PreAlgo is an AI-powered strategist built from the ground up by a creator, for creators.`,
  };

  const stats = [
    { value: '11K+', label: 'Videos Analyzed' },
    { value: '1B+', label: 'Creator Views (Founder)' },
    { value: '1K+', label: 'Active Creators' },
    { value: '95%', label: 'Analysis Accuracy' },
  ];

  const socials = [
    { platform: 'X', handle: '@Evan_Hand', href: 'https://x.com/Evan_Hand' },
    { platform: 'Instagram', handle: '@evanhandd', href: 'https://instagram.com/evanhandd' },
    { platform: 'YouTube', handle: '@theevanhand', href: 'https://youtube.com/@theevanhand' },
    { platform: 'TikTok', handle: '@evhandd', href: 'https://tiktok.com/@evhandd' },
  ];

  return (
    <div className="flex min-h-screen flex-col">
            <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-primary-950 to-secondary-900 pt-32 pb-16 sm:pt-36 sm:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.1),transparent)]" />
        <div className="container-tight relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="mb-6 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-500/10 border border-primary-500/20">
                <Cpu className="h-8 w-8 text-primary-400" />
              </div>
            </div>
            <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/50">
              About
            </span>
            <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Built by Creators,
              <br />
              <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                For Creators
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-white/70 sm:text-lg">
              We understand the frustration of creating content that doesn't perform. That's why we built PreAlgo - to give you the insights you need before you post.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-neutral-950 py-16 sm:py-20">
        <div className="container-tight">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-lg"
              >
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-neutral-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-neutral-900 py-20 sm:py-28">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/50">
              Meet the Founder
            </span>
            <h2 className="mt-4 mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">The Vision Behind PreAlgo</h2>
            <p className="mx-auto max-w-2xl text-base text-neutral-400 sm:text-lg">
              Built from real creator experience and a passion for data-driven content optimization
            </p>
          </motion.div>
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg lg:p-12"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex flex-col items-center gap-8">
                <div className="relative h-40 w-40 flex-shrink-0 lg:h-52 lg:w-52">
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-primary-500/20 blur-xl" />
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="relative h-full w-full rounded-full object-cover ring-2 ring-white/10"
                  />
                </div>
                <div className="flex-1 text-center">
                  <h3 className="mb-2 text-2xl font-bold text-white">{founder.name}</h3>
                  <p className="mb-6 text-lg font-medium text-primary-400">{founder.role}</p>
                  <p className="text-neutral-400 leading-relaxed">{founder.bio}</p>
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    {socials.map((social) => (
                      <a
                        key={social.platform}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300 transition-colors hover:border-primary-500/30 hover:bg-primary-500/10 hover:text-white"
                      >
                        <span className="font-medium">{social.platform}</span>
                        <span className="text-neutral-500">{social.handle}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
