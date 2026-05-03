import type { Metadata } from 'next';
import { AboutPageContent } from '@/components/pages/AboutPageContent';

export const metadata: Metadata = {
  title: 'About',
  description:
    'PreAlgo is an AI content analyzer built by a creator with over 1 billion views. Built to give every creator a data-driven edge.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
