import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Data-driven content strategy, viral video patterns, and creator insights from PreAlgo.',
  alternates: { canonical: '/blog' },
};

// Blog index. Posts are MDX files in content/blog/. Phase 2 will scan that
// directory and render a real list. For now the index renders a placeholder
// so the route is available for the sitemap and future indexing.
export default function BlogIndexPage() {
  return (
    <PageShell>
      <section className="container-tight pb-4 pt-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary-300 mb-3">
          Blog
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Patterns, data, and viral teardowns.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/60 leading-relaxed">
          We dissect the patterns behind videos that go viral, the math behind PreAlgo&apos;s predictions, and what real creators are doing to break out.
        </p>
      </section>

      <section className="container-tight py-12">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-12 text-center">
          <p className="text-base text-white/55">
            New posts coming soon. Subscribe to be notified.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
