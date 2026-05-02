import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'About',
  description: 'PreAlgo is an AI content analyzer built by a creator with over 1 billion views.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <PageShell>
      <article className="container-tight max-w-3xl pb-16 pt-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary-300 mb-3">
          About
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Built by a creator who hit a billion views.
        </h1>

        <div className="prose prose-invert prose-neutral mt-8 max-w-none prose-p:text-white/65 prose-p:leading-relaxed prose-headings:text-white prose-strong:text-white">
          <p>
            PreAlgo is an AI-powered content analyzer built from the ground up to give every creator the same data-driven edge as the top 1%.
          </p>

          <p>
            Evan Hand is a creator with over 1 billion combined views and 1 million+ followers across platforms. After years of dissecting the patterns behind viral content, he built PreAlgo to surface those patterns automatically — so creators stop guessing and start knowing.
          </p>

          <h2>What PreAlgo does</h2>
          <p>
            PreAlgo grades a short-form video before you post it. Upload a clip and within 60-120 seconds you get an honest grade, predicted views per platform, a breakdown of your hook and x-factor, a retention curve, and a ranked fix list with predicted impact.
          </p>

          <h2>How the predictions work</h2>
          <p>
            Every prediction is anchored on real posted videos. The system pulls the closest-matching real videos from a database of 10,000+ posts (with actual view counts) so the grade reflects what creators in similar niches actually do, not synthetic estimates.
          </p>

          <p>
            For users connected to <a href="https://thecontentlabs.app" className="text-primary-300 hover:text-primary-200">The Content Labs</a> (the strategy platform PreAlgo lives alongside), the predictions also use the creator's own posting history — so a creator whose top videos hit 1.7M won't get predicted at the niche median.
          </p>
        </div>
      </article>
    </PageShell>
  );
}
