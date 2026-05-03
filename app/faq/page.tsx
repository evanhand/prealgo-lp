import type { Metadata } from 'next';
import { FAQPageContent } from '@/components/pages/FAQPageContent';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Common questions about PreAlgo: how predictions work, file formats, pricing, refunds, and the underlying tech.',
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  return <FAQPageContent />;
}
