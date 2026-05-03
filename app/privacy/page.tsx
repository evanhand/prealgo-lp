import type { Metadata } from 'next';
import { PrivacyPageContent } from '@/components/pages/PrivacyPageContent';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How PreAlgo handles your data.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}
