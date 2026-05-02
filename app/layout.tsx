import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AnalyticsProvider } from '@/components/AnalyticsProvider';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

const SITE_URL = 'https://prealgo.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'PreAlgo | Know what your video will do before you post it',
    template: '%s | PreAlgo',
  },
  description:
    'AI grader, view prediction, and improvement suggestions. Trained on 10,000+ real posted videos. Upload a video and see how it’ll perform on TikTok, Instagram, and YouTube before you hit post.',
  applicationName: 'PreAlgo',
  authors: [{ name: 'PreAlgo' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'PreAlgo',
    url: SITE_URL,
    title: 'PreAlgo | Know what your video will do before you post it',
    description:
      'AI grader, view prediction, and improvement suggestions. Trained on 10,000+ real posted videos.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PreAlgo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PreAlgo | Know what your video will do before you post it',
    description:
      'AI grader, view prediction, and improvement suggestions. Trained on 10,000+ real posted videos.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#7C3AED',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen antialiased font-sans">
        <AnalyticsProvider />
        {children}
      </body>
    </html>
  );
}
