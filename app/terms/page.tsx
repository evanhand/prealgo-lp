import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'PreAlgo Terms of Service.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <PageShell>
      <article className="container-tight max-w-3xl pb-16 pt-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">Terms of Service</h1>
        <p className="mt-2 text-sm text-white/45">Last updated: May 2026</p>

        <div className="prose prose-invert prose-neutral mt-8 max-w-none prose-p:text-white/65 prose-p:leading-relaxed prose-headings:text-white prose-strong:text-white prose-li:text-white/65">
          <h2>1. Acceptance</h2>
          <p>
            By using PreAlgo (the "service") you agree to these Terms of Service. If you don&apos;t agree, don&apos;t use the service.
          </p>

          <h2>2. The service</h2>
          <p>
            PreAlgo analyzes user-uploaded short-form videos and returns AI-generated grades, predictions, and recommendations. Predictions are estimates anchored on real posted-video data. They are not guarantees of actual performance.
          </p>

          <h2>3. Your content</h2>
          <p>
            You retain all rights to videos you upload. By uploading, you grant PreAlgo a limited license to process the video for the purpose of providing the service. You represent that you have the right to upload any content you submit.
          </p>

          <h2>4. Subscriptions and refunds</h2>
          <p>
            Paid plans renew monthly. You can cancel anytime; access continues to the end of the current billing period. We offer a 7-day refund window if you&apos;ve completed fewer than 3 analyses. Beyond that, refunds are not provided because the analysis cost is incurred immediately on each run.
          </p>

          <h2>5. Acceptable use</h2>
          <p>
            Don&apos;t use the service to upload illegal content, copyright-infringing content, or content depicting minors in unsafe contexts. Don&apos;t attempt to reverse-engineer the model, scrape the system, or share an account across companies.
          </p>

          <h2>6. Liability</h2>
          <p>
            PreAlgo is provided as-is. Predictions are not guarantees. We&apos;re not liable for outcomes (positive or negative) resulting from acting on a PreAlgo recommendation.
          </p>

          <h2>7. Changes</h2>
          <p>
            We may update these terms. Material changes will be communicated via email to active accounts.
          </p>

          <h2>8. Contact</h2>
          <p>
            Questions: <a href="mailto:hello@prealgo.com" className="text-primary-300">hello@prealgo.com</a>
          </p>
        </div>
      </article>
    </PageShell>
  );
}
