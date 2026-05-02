import Link from 'next/link';
import { Cpu } from 'lucide-react';

const COLS = [
  {
    title: 'Product',
    links: [
      { href: '/features', label: 'Features' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/sample', label: 'Sample analysis' },
      { href: '/compare', label: 'Compare' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/blog', label: 'Blog' },
      { href: '/faq', label: 'FAQ' },
      { href: '/about', label: 'About' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/terms', label: 'Terms' },
      { href: '/privacy', label: 'Privacy' },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-white/[0.06] bg-neutral-950/80">
      <div className="container-tight grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-primary-500/30 bg-primary-500/10">
              <Cpu className="h-4 w-4 text-primary-300" />
            </span>
            <span className="text-base font-semibold tracking-tight">PreAlgo</span>
          </Link>
          <p className="mt-3 text-sm text-white/45 max-w-xs leading-relaxed">
            Know what your video will do before you post it.
          </p>
        </div>

        {COLS.map((c) => (
          <div key={c.title}>
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-3">
              {c.title}
            </p>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/65 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="container-tight flex flex-col gap-2 py-5 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} PreAlgo. All rights reserved.</span>
          <span>Built by creators, for creators.</span>
        </div>
      </div>
    </footer>
  );
}
