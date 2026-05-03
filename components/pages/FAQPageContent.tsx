'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Mail } from 'lucide-react';
import { Navbar } from '../landing/Navbar';
import { Footer } from '../landing/Footer';
import { JsonLd } from '../JsonLd';

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'What is PreAlgo?',
        a: 'PreAlgo is an AI-powered content analysis tool that predicts how your video will perform before you post it. Upload your video, and our AI - trained on 11,000+ real videos - gives you a content grade, view prediction, hook analysis, retention forecast, and specific recommendations to improve your content.'
      },
      {
        q: 'How does PreAlgo work?',
        a: 'Upload your video and our AI analyzes it against patterns from 11,000+ real videos. In about 30 seconds, you get a full analysis including predicted views, retention graph, hook effectiveness score, platform-specific feedback, and actionable optimization tips.'
      },
      {
        q: 'What platforms does PreAlgo support?',
        a: 'PreAlgo provides analysis and recommendations optimized for TikTok, Instagram Reels, and YouTube Shorts. Each analysis includes platform-specific feedback so you can tailor your content for each platform.'
      },
      {
        q: 'What video formats are supported?',
        a: 'We support MP4, MOV, WebM, and most common video formats. Videos can be up to 10 minutes long and 500MB in size.'
      },
    ]
  },
  {
    category: 'Analysis & Accuracy',
    questions: [
      {
        q: 'How accurate are the predictions?',
        a: 'Our AI is trained on 11,000+ real videos and their actual performance data. Our grading is calibrated against real performance data - 56% of videos grade C-tier, only 1.6% earn A+, matching real-world view distributions. We analyze hook archetype, format type, and execution against verified benchmarks from creators across TikTok, Instagram, and YouTube Shorts.'
      },
      {
        q: 'What does the analysis include?',
        a: 'Each analysis includes: a content grade (A+ to F), predicted view range, retention graph showing where viewers drop off, hook effectiveness score, platform-specific feedback for TikTok/Instagram/YouTube, AI-generated hook rewrite, visual and audio quality assessment, CTA effectiveness rating, and specific optimization recommendations.'
      },
      {
        q: 'How long does an analysis take?',
        a: 'Most analyses complete in about 1-2 minutes. Longer videos may take up to 2 minutes.'
      },
      {
        q: 'Can I re-analyze the same video after making changes?',
        a: 'Yes! Each re-analysis counts as one analysis credit. We recommend making the suggested improvements and re-analyzing to see how your score improves.'
      },
    ]
  },
  {
    category: 'Pricing & Billing',
    questions: [
      {
        q: 'Is there a free plan?',
        a: 'Yes. The free plan includes 1 full analysis per month with all features - no credit card required.'
      },
      {
        q: 'What counts as one analysis?',
        a: 'Each video you upload and analyze counts as one analysis. Re-viewing a completed analysis does not use an additional credit.'
      },
      {
        q: 'Can I upgrade or downgrade at any time?',
        a: 'Yes. You can change your plan at any time from your account settings. Upgrades take effect immediately. Downgrades take effect at the end of your current billing period.'
      },
      {
        q: 'Do unused analyses roll over?',
        a: 'No, unused analyses do not roll over to the next month. Your count resets at the start of each billing period.'
      },
      {
        q: 'Can I cancel anytime?',
        a: 'Yes. There are no long-term contracts. Cancel anytime and continue using the service until the end of your billing period.'
      },
    ]
  },
  {
    category: 'Privacy & Security',
    questions: [
      {
        q: 'Is my content kept private?',
        a: 'Yes. Your uploaded videos are only accessible to you and are used solely for analysis. We never share, publish, or use your content for marketing without your explicit permission.'
      },
      {
        q: 'How long do you store my videos?',
        a: 'Uploaded videos are processed for analysis and are not permanently stored on our servers. Analysis results are retained while your account is active.'
      },
      {
        q: 'Who can see my analysis results?',
        a: 'Only you. Your analysis results are private to your account and are not shared with anyone.'
      },
    ]
  },
];

export const FAQPageContent: React.FC = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
            <div className="inline-flex items-center justify-center rounded-full bg-primary-500/20 p-3 mb-4">
              <HelpCircle className="h-8 w-8 text-primary-400" />
            </div>
            <span className="mb-3 block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/50 mx-auto w-fit">
              FAQ
            </span>
            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-primary-200 to-secondary-200 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mt-6">
              Everything you need to know about PreAlgo. Can't find what you're looking for? Reach out to our team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Sections */}
      {faqs.map((section, sectionIndex) => (
        <section
          key={section.category}
          className={`${sectionIndex % 2 === 0 ? 'bg-neutral-950' : 'bg-neutral-900'} py-16 sm:py-20`}
        >
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/50">
                {section.category}
              </span>
            </motion.div>
            <div className="mx-auto max-w-3xl space-y-3">
              {section.questions.map((faq, i) => {
                const key = `${sectionIndex}-${i}`;
                const isOpen = openItems[key] || false;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md"
                  >
                    <button
                      onClick={() => toggleItem(key)}
                      className="flex w-full cursor-pointer items-center justify-between p-5 text-left text-white font-medium"
                    >
                      <span>{faq.q}</span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-4 w-4 flex-shrink-0 text-white/40" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 text-sm text-white/70 leading-relaxed">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* Contact */}
      <section className="bg-neutral-950 py-16 sm:py-20">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-primary-500/20 bg-primary-900/20 backdrop-blur-md p-8 text-center"
          >
            <h3 className="mb-2 text-xl font-semibold text-white">Still have questions?</h3>
            <p className="mb-6 text-white/70">
              Our team is here to help. Reach out and we'll get back to you within 24 hours.
            </p>
            <a
              href="mailto:business@thecontentlabs.io"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-3 text-white transition-all hover:shadow-lg hover:shadow-primary-500/20"
            >
              <Mail className="mr-2 h-4 w-4" />
              Contact Support
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
