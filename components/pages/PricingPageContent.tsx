'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../landing/Navbar';
import { Footer } from '../landing/Footer';
import { Crown, Check, Zap, Users, Clock, ArrowRight, Rocket, Sparkles, Trophy, Mail, AlertCircle, Star, ChevronDown } from 'lucide-react';

// LP-side products list. Mirrors the Vite app's stripe-config price IDs so
// /signup?plan=<priceId> can pre-select the correct tier on the auth side.
const products = {
  free: {
    priceId: 'price_1RNeN0RtB0k9odPOLiyuzoGx',
    name: 'Free',
    description: 'Try AI-powered analysis on one video',
    price: 0,
    analyses: 1,
    features: [
      'Complete AI content analysis',
      '1 analysis per month',
      'Data-backed predictions from 10,000+ videos',
      'Community support (48h response)',
    ],
  },
  creator: {
    priceId: 'price_1Smho3RtB0k9odPO5MdQr6kL',
    name: 'Creator',
    description: 'Great for hobbyists and small creators building their audience',
    price: 9.99,
    analyses: 15,
    features: [
      'Complete AI content analysis',
      '15 analyses per month',
      'Data-backed predictions from 10,000+ videos',
      'Priority support (24h response)',
    ],
  },
  pro: {
    priceId: 'price_1SmhovRtB0k9odPOH30FyYsv',
    name: 'Pro',
    description: 'Ideal for growing creators with 1K-100K followers',
    price: 24.99,
    analyses: 50,
    features: [
      'Complete AI content analysis',
      '50 analyses per month',
      'Data-backed predictions from 10,000+ videos',
      'Priority support (12h response)',
    ],
  },
  agency: {
    priceId: 'price_1SmhsnRtB0k9odPOgUo0BYGE',
    name: 'Agency',
    description: 'Perfect for agencies and multi-account managers',
    price: 79.99,
    analyses: 200,
    features: [
      'Complete AI content analysis',
      '200 analyses per month',
      'Data-backed predictions from 10,000+ videos',
      'Priority support (4h response)',
      'Multi-account management',
    ],
  },
};

export const PricingPageContent: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // The LP doesn't run Stripe checkout itself — it sends the visitor to the
  // Vite app's /signup with the chosen plan id, where auth + checkout happen.
  const handleSubscribe = (priceId: string) => {
    setLoading(priceId);
    router.push(`/signup?plan=${encodeURIComponent(priceId)}`);
  };

  const pricingFaqs = [
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
      a: 'No, unused analyses do not roll over to the next month. Your analysis count resets at the start of each billing period.'
    },
    {
      q: 'What video formats are supported?',
      a: 'We support MP4, MOV, and most common video formats. Videos can be up to 10 minutes long and 500MB in size.'
    },
    {
      q: 'How accurate are the predictions?',
      a: 'Our AI is trained on 11,000+ real videos and their actual performance data. While no prediction is perfect, our analysis gives you a data-backed assessment of what works and what to improve.'
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Yes. There are no long-term contracts. You can cancel your subscription at any time and continue using the service until the end of your billing period.'
    },
    {
      q: 'Is my content kept private?',
      a: 'Yes. Your uploaded videos are only accessible to you and are used solely for analysis. We never share, publish, or use your content for marketing without your explicit permission.'
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
                  <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-primary-950 to-secondary-900 pt-32 pb-16 sm:pt-36 sm:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.15),transparent)]" />
        <div className="container-tight relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/50">
              Pricing
            </span>
            <h1 className="mt-4 bg-gradient-to-r from-white via-primary-200 to-secondary-200 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
              Choose Your Plan
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-white/70 sm:text-lg">
              Start free with a content grade and critical fixes. Upgrade to unlock full analysis, predictions, and viral pathway insights trained on 11,000+ real videos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Error Banner */}
      

      {/* Pricing Cards */}
      <section className="bg-neutral-950 py-16 sm:py-20">
        <div className="container-tight">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur-lg"
            >
              <div className="mb-3 flex items-center">
                <Rocket className="mr-2 h-5 w-5 text-primary-400" />
                <h3 className="text-base font-semibold text-neutral-300">Free</h3>
              </div>
              <div className="mb-3">
                <span className="text-2xl font-bold text-neutral-300">$0</span>
                <span className="text-sm text-white/60">/month</span>
                <p className="mt-1 text-xs text-white/70">One full analysis every month, free forever</p>
              </div>
              <ul className="mb-5 space-y-2">
                <li className="flex items-center text-xs text-neutral-300">
                  <Check className="mr-2 h-3.5 w-3.5 text-success-400" />
                  1 video analysis per month
                </li>
                <li className="flex items-center text-xs text-neutral-300">
                  <Check className="mr-2 h-3.5 w-3.5 text-success-400" />
                  Grade + critical fixes only
                </li>
                <li className="flex items-center text-xs text-neutral-300">
                  <Check className="mr-2 h-3.5 w-3.5 text-success-400" />
                  Email support (48h)
                </li>
              </ul>
              {false ? (
                <div className="w-full rounded-lg bg-white/10 px-3 py-2 text-xs font-medium text-white/50 cursor-not-allowed text-center">
                  Current Plan
                </div>
              ) : (
                <button
                  onClick={() => handleSubscribe(products.free.priceId)}
                  disabled={loading === products.free.priceId}
                  className="w-full rounded-lg bg-white/10 px-3 py-2 text-xs font-medium text-neutral-300 transition-all hover:bg-white/20"
                >
                  {loading === products.free.priceId ? (
                    <div className="flex items-center justify-center">
                      <Clock className="mr-1 h-3 w-3 animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    'Get Started'
                  )}
                </button>
              )}
            </motion.div>

            {/* Creator Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg"
            >
              <div className="mb-3 flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-primary-400" />
                <h3 className="text-base font-semibold text-white">Creator</h3>
              </div>
              <div className="mb-3">
                <span className="text-2xl font-bold text-white">$9.99</span>
                <span className="text-sm text-white/60">/month</span>
                <p className="mt-1 text-xs text-white/50">$0.67/analysis</p>
                <p className="mt-1 text-xs text-white/70">For creators who post regularly</p>
              </div>
              <ul className="mb-5 space-y-2">
                <li className="flex items-center text-xs text-neutral-300">
                  <Check className="mr-2 h-3.5 w-3.5 text-success-400" />
                  15 video analyses per month
                </li>
                <li className="flex items-center text-xs text-neutral-300">
                  <Check className="mr-2 h-3.5 w-3.5 text-success-400" />
                  Full analysis + hook rewrite
                </li>
                <li className="flex items-center text-xs text-neutral-300">
                  <Check className="mr-2 h-3.5 w-3.5 text-success-400" />
                  Retention breakdown & technical audit
                </li>
                <li className="flex items-center text-xs text-neutral-300">
                  <Check className="mr-2 h-3.5 w-3.5 text-success-400" />
                  Priority email support (24h)
                </li>
              </ul>
              {false ? (
                <div className="w-full rounded-lg bg-white/10 px-3 py-2 text-xs font-medium text-white/50 cursor-not-allowed text-center">
                  Current Plan
                </div>
              ) : (
                <button
                  onClick={() => handleSubscribe(products.creator.priceId)}
                  disabled={loading === products.creator.priceId}
                  className="w-full rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 px-3 py-2 text-xs font-medium text-white transition-all hover:shadow-lg hover:shadow-primary-500/20"
                >
                  {loading === products.creator.priceId ? (
                    <div className="flex items-center justify-center">
                      <Clock className="mr-1 h-3 w-3 animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    'Choose Creator'
                  )}
                </button>
              )}
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="relative rounded-xl p-[2px]"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-400 via-secondary-500 to-primary-600 opacity-80 blur-[1px]" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-400 via-secondary-500 to-primary-600 opacity-40 blur-md" />
              <div className="relative overflow-hidden rounded-xl border-0 bg-neutral-900 p-5 backdrop-blur-lg">
                <div className="absolute -top-px left-4 right-4 flex justify-center">
                  <div className="flex items-center gap-1.5 rounded-b-lg bg-gradient-to-r from-primary-500 to-secondary-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-primary-500/30">
                    Most Popular
                  </div>
                </div>
                <div className="mb-3 mt-6 flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-primary-400" />
                  <h3 className="text-base font-semibold text-white">Pro</h3>
                </div>
                <div className="mb-3">
                  <span className="text-2xl font-bold text-white">$24.99</span>
                  <span className="text-sm text-white/60">/month</span>
                  <p className="mt-1 text-xs text-white/50">$0.50/analysis</p>
                  <p className="mt-1 text-xs text-white/70">For serious creators who need deep insights</p>
                </div>
                <ul className="mb-5 space-y-2">
                  <li className="flex items-center text-xs text-neutral-300">
                    <Check className="mr-2 h-3.5 w-3.5 text-success-400" />
                    50 video analyses per month
                  </li>
                  <li className="flex items-center text-xs text-neutral-300">
                    <Check className="mr-2 h-3.5 w-3.5 text-success-400" />
                    Everything + predictions
                  </li>
                  <li className="flex items-center text-xs text-neutral-300">
                    <Check className="mr-2 h-3.5 w-3.5 text-success-400" />
                    Platform optimization + viral pathway
                  </li>
                  <li className="flex items-center text-xs text-neutral-300">
                    <Check className="mr-2 h-3.5 w-3.5 text-success-400" />
                    Multiple hook rewrites
                  </li>
                  <li className="flex items-center text-xs text-neutral-300">
                    <Check className="mr-2 h-3.5 w-3.5 text-success-400" />
                    Priority support (12h)
                  </li>
                </ul>
                {false || (false) ? (
                  <div className="w-full rounded-lg bg-white/10 px-3 py-2 text-xs font-medium text-white/50 cursor-not-allowed text-center">
                    Current Plan
                  </div>
                ) : (
                  <button
                    onClick={() => handleSubscribe(products.pro.priceId)}
                    disabled={loading === products.pro.priceId}
                    className="w-full rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 px-3 py-2 text-xs font-medium text-white transition-all hover:shadow-lg hover:shadow-primary-500/20"
                  >
                    {loading === products.pro.priceId ? (
                      <div className="flex items-center justify-center">
                        <Clock className="mr-1 h-3 w-3 animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      'Choose Pro'
                    )}
                  </button>
                )}
              </div>
            </motion.div>

            {/* Agency Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg"
            >
              <div className="mb-3 flex items-center">
                <Crown className="mr-2 h-5 w-5 text-primary-400" />
                <h3 className="text-base font-semibold text-white">Agency</h3>
              </div>
              <div className="mb-3">
                <span className="text-2xl font-bold text-white">$79.99</span>
                <span className="text-sm text-white/60">/month</span>
                <p className="mt-1 text-xs text-white/50">$0.40/analysis</p>
                <p className="mt-1 text-xs text-white/70">For teams managing multiple accounts</p>
              </div>
              <ul className="mb-5 space-y-2">
                <li className="flex items-center text-xs text-neutral-300">
                  <Check className="mr-2 h-3.5 w-3.5 text-success-400" />
                  200 video analyses per month
                </li>
                <li className="flex items-center text-xs text-neutral-300">
                  <Check className="mr-2 h-3.5 w-3.5 text-success-400" />
                  Everything + multi-account
                </li>
                <li className="flex items-center text-xs text-neutral-300">
                  <Check className="mr-2 h-3.5 w-3.5 text-success-400" />
                  API access & integrations
                </li>
                <li className="flex items-center text-xs text-neutral-300">
                  <Check className="mr-2 h-3.5 w-3.5 text-success-400" />
                  Dedicated support (4h response)
                </li>
              </ul>
              {false ? (
                <div className="w-full rounded-lg bg-white/10 px-3 py-2 text-xs font-medium text-white/50 cursor-not-allowed text-center">
                  Current Plan
                </div>
              ) : (
                <button
                  onClick={() => handleSubscribe(products.agency.priceId)}
                  disabled={loading === products.agency.priceId}
                  className="w-full rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 px-3 py-2 text-xs font-medium text-white transition-all hover:shadow-lg hover:shadow-primary-500/20"
                >
                  {loading === products.agency.priceId ? (
                    <div className="flex items-center justify-center">
                      <Clock className="mr-1 h-3 w-3 animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    'Choose Agency'
                  )}
                </button>
              )}
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center text-sm text-white/40"
          >
            All paid plans include full AI analysis. Cancel anytime. No credit card required for free plan.
          </motion.p>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="bg-neutral-900 py-16 sm:py-20">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/50">
              Compare
            </span>
            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">Compare Plans</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg"
          >
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Feature</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-white/60">Free</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-white/60">Creator</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-primary-400">Pro</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-white/60">Agency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { feature: 'Monthly analyses', free: '1', creator: '15', pro: '50', agency: '200' },
                  { feature: 'Content grade & fixes', free: true, creator: true, pro: true, agency: true },
                  { feature: 'Hook analysis & rewrite', free: false, creator: true, pro: true, agency: true },
                  { feature: 'Retention breakdown', free: false, creator: true, pro: true, agency: true },
                  { feature: 'Technical audit', free: false, creator: true, pro: true, agency: true },
                  { feature: 'View predictions', free: false, creator: false, pro: true, agency: true },
                  { feature: 'Platform optimization', free: false, creator: false, pro: true, agency: true },
                  { feature: 'Viral pathway analysis', free: false, creator: false, pro: true, agency: true },
                  { feature: 'Multiple hook rewrites', free: false, creator: false, pro: true, agency: true },
                  { feature: 'Support response', free: '48h', creator: '24h', pro: '12h', agency: '4h' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-sm text-white/80">{row.feature}</td>
                    {['free', 'creator', 'pro', 'agency'].map((plan) => (
                      <td key={plan} className="px-4 py-3 text-center text-sm">
                        {typeof row[plan as keyof typeof row] === 'boolean' ? (
                          row[plan as keyof typeof row] ? (
                            <Check className="mx-auto h-4 w-4 text-success-400" />
                          ) : (
                            <span className="text-white/20">-</span>
                          )
                        ) : (
                          <span className="text-white/80">{row[plan as keyof typeof row]}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Contact Sales */}
      <section className="bg-neutral-950 py-16 sm:py-20">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg sm:p-8"
          >
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-lg font-semibold text-white">Need a custom plan?</h3>
                <p className="text-neutral-400">Contact us for enterprise pricing and custom features.</p>
              </div>
              <a
                href="mailto:business@thecontentlabs.io"
                className="rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/20 inline-flex items-center"
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Sales
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-neutral-900 py-16 sm:py-20">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/50">
              FAQ
            </span>
            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">Frequently Asked Questions</h2>
          </motion.div>
          <div className="mx-auto max-w-3xl space-y-3">
            {pricingFaqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between p-5 text-left text-white font-medium"
                >
                  <span>{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4 flex-shrink-0 text-white/40" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
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
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PricingPageContent;
