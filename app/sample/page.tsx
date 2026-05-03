import type { Metadata } from 'next';
import { SamplePageContent } from '@/components/pages/SamplePageContent';

export const metadata: Metadata = {
  title: 'Sample Analysis',
  description: 'See exactly what a PreAlgo analysis looks like before you upload your own video.',
  alternates: { canonical: '/sample' },
};

export default function SamplePage() {
  return <SamplePageContent />;
}
