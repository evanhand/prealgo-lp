import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { CtaSection } from '@/components/landing/CtaSection';

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Per-platform view prediction, hook + x-factor analysis, retention curve, and ranked fix list. Trained on 10,000+ real posted videos.',
  alternates: { canonical: '/features' },
};

export default function FeaturesPage() {
  return (
    <PageShell>
      <section className="container-tight pb-4 pt-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary-300 mb-3">
          Features
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Everything in every analysis.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/60 leading-relaxed">
          Every video upload runs through the same pipeline. No upsell tiers for the analysis itself — every plan gets the full report.
        </p>
      </section>
      <Features />
      <HowItWorks />
      <CtaSection />
    </PageShell>
  );
}
