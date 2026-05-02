import type { Metadata } from 'next';
import { FeaturesPageContent } from '@/components/pages/FeaturesPageContent';

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Per-platform view prediction, hook + x-factor analysis, retention curve, and ranked fix list. Trained on 10,000+ real posted videos.',
  alternates: { canonical: '/features' },
};

export default function FeaturesPage() {
  return <FeaturesPageContent />;
}
