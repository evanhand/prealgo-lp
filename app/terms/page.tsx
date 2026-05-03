import type { Metadata } from 'next';
import { TermsPageContent } from '@/components/pages/TermsPageContent';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'PreAlgo Terms of Service.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return <TermsPageContent />;
}
