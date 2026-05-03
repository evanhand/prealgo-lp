import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { PricingPageContent } from '@/components/pages/PricingPageContent';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple plans. Start with 1 free analysis per month. Paid plans from $9.99/month.',
  alternates: { canonical: '/pricing' },
};

const PLANS = [
  { name: 'Free', priceId: 'price_1RNeN0RtB0k9odPOLiyuzoGx', description: 'Try AI-powered analysis on one video', price: '0' },
  { name: 'Creator', priceId: 'price_1Smho3RtB0k9odPO5MdQr6kL', description: 'For hobbyists and small creators', price: '9.99' },
  { name: 'Pro', priceId: 'price_1SmhovRtB0k9odPOH30FyYsv', description: 'For growing creators with 1K-100K followers', price: '24.99' },
  { name: 'Agency', priceId: 'price_1SmhsnRtB0k9odPOgUo0BYGE', description: 'For agencies and multi-account managers', price: '79.99' },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'PreAlgo',
          description:
            'AI video analysis tool. Grades short-form videos and predicts views before posting.',
          brand: { '@type': 'Brand', name: 'PreAlgo' },
          offers: PLANS.map((p) => ({
            '@type': 'Offer',
            name: p.name,
            description: p.description,
            price: p.price,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: `https://prealgo.com/signup?plan=${p.priceId}`,
          })),
        }}
      />
      <PricingPageContent />
    </>
  );
}
