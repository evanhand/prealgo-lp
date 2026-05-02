import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Common questions about PreAlgo: how predictions work, file formats, pricing, refunds.',
  alternates: { canonical: '/faq' },
};

const FAQ_SECTIONS = [
  {
    title: 'How predictions work',
    questions: [
      {
        q: 'How accurate are the view predictions?',
        a: "Predictions are anchored on real posted videos with actual view counts. They're typically in the right order of magnitude but won't predict viral outliers (5M+) reliably. The system gives three numbers per platform: typical creator outcome, your account, and the upside if it pops.",
      },
      {
        q: 'What does "trained on 10,000+ videos" mean?',
        a: 'PreAlgo searches a database of 10,000+ real posted videos with actual view counts to find the closest comparables for your upload via embedding similarity. The grade reflects what those real comparable videos actually got, not synthetic estimates.',
      },
      {
        q: 'Why does the same video get a slightly different grade on re-runs?',
        a: 'The Gemini model that judges your video varies slightly between runs (e.g. hook execution might score 4 vs 5). Small differences in those 1-5 ratings propagate through the algorithm to the final prediction. We continue to tune the system to reduce that variance.',
      },
    ],
  },
  {
    title: 'Pricing & refunds',
    questions: [
      {
        q: 'Is there a free plan?',
        a: 'Yes. Every account gets 1 free analysis per month with the full AI pipeline. No credit card required.',
      },
      {
        q: 'Can I cancel anytime?',
        a: "Yes. Cancellation is one click in your settings. You keep access until the end of your current billing period.",
      },
      {
        q: 'Do you offer refunds?',
        a: "If your subscription has been active for less than 7 days and you've completed fewer than 3 analyses, email support and we'll refund you. After that we don't offer refunds because the analysis cost is incurred immediately when you run it.",
      },
    ],
  },
  {
    title: 'Technical',
    questions: [
      {
        q: 'What file formats can I upload?',
        a: 'MP4, MOV, AVI, and WebM. Up to 200MB and 3 minutes long. Vertical (9:16) is recommended for the most accurate platform-specific predictions.',
      },
      {
        q: 'How long does an analysis take?',
        a: 'Most analyses complete in 60-120 seconds. The longest path is the AI vision pass over the full video (Gemini 2.5 Flash). You can leave the page and come back to your dashboard once it lands.',
      },
      {
        q: 'Are my videos private?',
        a: 'Yes by default. Analysis results are private to your account. You can mark a specific analysis "public" to get a shareable link, but no analyses are shared without your explicit action.',
      },
    ],
  },
];

const allQuestions = FAQ_SECTIONS.flatMap((s) => s.questions);

export default function FaqPage() {
  return (
    <PageShell>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: allQuestions.map((q) => ({
            '@type': 'Question',
            name: q.q,
            acceptedAnswer: { '@type': 'Answer', text: q.a },
          })),
        }}
      />

      <section className="container-tight pb-4 pt-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary-300 mb-3">
          FAQ
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Common questions.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/60 leading-relaxed">
          Everything we get asked about predictions, pricing, and the underlying tech.
        </p>
      </section>

      <section className="container-tight max-w-3xl py-12 space-y-12">
        {FAQ_SECTIONS.map((section) => (
          <div key={section.title}>
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-4">
              {section.title}
            </h2>
            <div className="space-y-3">
              {section.questions.map((q) => (
                <details
                  key={q.q}
                  className="group rounded-xl border border-white/[0.08] bg-white/[0.02] open:border-primary-500/30 transition-colors"
                >
                  <summary className="cursor-pointer list-none px-5 py-4 text-base font-semibold text-white flex items-center justify-between">
                    <span>{q.q}</span>
                    <span className="ml-3 font-mono text-xs text-white/40 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-white/65 leading-relaxed">{q.a}</div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
