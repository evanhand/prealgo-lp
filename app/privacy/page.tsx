import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How PreAlgo handles your data.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <article className="container-tight max-w-3xl pb-16 pt-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">Privacy Policy</h1>
        <p className="mt-2 text-sm text-white/45">Last updated: May 2026</p>

        <div className="prose prose-invert prose-neutral mt-8 max-w-none prose-p:text-white/65 prose-p:leading-relaxed prose-headings:text-white prose-strong:text-white prose-li:text-white/65">
          <h2>What we collect</h2>
          <ul>
            <li>Account info: email, name (optional), password hash.</li>
            <li>Uploads: videos you submit for analysis, plus the resulting AI-generated reports.</li>
            <li>Usage data: page views, button clicks, anonymized session info via PostHog.</li>
            <li>Billing data: handled by Stripe. We never see your card number.</li>
          </ul>

          <h2>How we use it</h2>
          <ul>
            <li>To run the AI analysis you requested and store the result on your account.</li>
            <li>To improve the model and product. Aggregate, anonymized usage data only — never your individual videos shared externally.</li>
            <li>To send essential service emails (signup confirmation, billing receipts). No marketing emails without explicit opt-in.</li>
          </ul>

          <h2>What we don&apos;t do</h2>
          <ul>
            <li>We don&apos;t sell your data. Ever.</li>
            <li>We don&apos;t share your videos with third parties beyond the AI vendors required to process them (currently Google Gemini, OpenAI for embeddings).</li>
            <li>We don&apos;t train on your content without explicit opt-in.</li>
          </ul>

          <h2>Your rights</h2>
          <p>
            You can delete your account at any time from settings. All your data (uploads, analyses, profile) is permanently removed within 30 days. Email <a href="mailto:hello@prealgo.com" className="text-primary-300">hello@prealgo.com</a> for data export requests.
          </p>

          <h2>Cookies</h2>
          <p>
            We use a session cookie for auth and analytics cookies for product improvement (PostHog). No advertising cookies, no third-party trackers beyond standard CDN/hosting.
          </p>

          <h2>Contact</h2>
          <p>
            Questions: <a href="mailto:hello@prealgo.com" className="text-primary-300">hello@prealgo.com</a>
          </p>
        </div>
      </article>
    </PageShell>
  );
}
