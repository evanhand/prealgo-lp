'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Cpu } from 'lucide-react';

const NAV_LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/sample', label: 'Sample' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.06] bg-neutral-950/80 backdrop-blur-xl">
      <nav className="container-tight flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-primary-500/30 bg-primary-500/10">
            <Cpu className="h-4 w-4 text-primary-300" />
          </span>
          <span className="text-base font-semibold tracking-tight">PreAlgo</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-white/65 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="text-sm text-white/65 hover:text-white transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 px-3.5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-shadow"
          >
            Get started
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-white/70"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-white/[0.06]">
          <div className="container-tight flex flex-col gap-1 py-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-white/75 hover:bg-white/[0.04]"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 border-t border-white/[0.06] pt-3">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-md border border-white/10 px-3 py-2 text-center text-sm text-white/80"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-md bg-gradient-to-r from-primary-500 to-secondary-500 px-3 py-2 text-center text-sm font-semibold text-white"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
