import { JsonLd } from '@/components/JsonLd';
import { LandingPageContent } from '@/components/landing/LandingPageContent';

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'PreAlgo',
          url: 'https://prealgo.com',
          logo: 'https://prealgo.com/logo.svg',
          description: 'AI-powered content analysis for creators',
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'business@thecontentlabs.io',
            contactType: 'customer support',
          },
          sameAs: ['https://thecontentlabs.app'],
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'PreAlgo',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          description:
            'AI grader, view prediction, and improvement suggestions for short-form video. Trained on 10,000+ real posted videos.',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        }}
      />
      <LandingPageContent />
    </>
  );
}
