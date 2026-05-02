import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { CtaSection } from '@/components/landing/CtaSection';
import { JsonLd } from '@/components/JsonLd';

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
          sameAs: ['https://thecontentlabs.app'],
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'PreAlgo',
          applicationCategory: 'MultimediaApplication',
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
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
