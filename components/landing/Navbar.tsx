'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/5 bg-neutral-950/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="container-tight">
        <div className="flex h-16 items-center justify-between md:h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.03]">
              <Cpu className="h-4 w-4 text-primary-400" />
            </div>
            <span className="text-base font-semibold tracking-tight text-white">PreAlgo</span>
            <span className="ml-1 hidden rounded-sm bg-white/5 px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-widest text-white/40 sm:inline-block">
              V2
            </span>
          </Link>

          <div className="hidden items-center md:flex">
            <div className="mr-2 flex items-center">
              <NavLink href="/features" label="Features" />
              <NavLink href="/pricing" label="Pricing" />
              <NavLink href="/sample" label="Sample" />
              <NavLink href="/reviews" label="Reviews" />
              <NavLink href="/blog" label="Blog" />
              <NavLink href="/about" label="About" />
              <NavLink href="/faq" label="FAQ" />
            </div>

            <div className="ml-2 flex items-center gap-2 border-l border-white/5 pl-4">
              <Link
                href="/login"
                className="inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-1.5 rounded-md bg-white px-3.5 py-1.5 text-sm font-semibold text-neutral-950 transition-all hover:bg-white/90"
              >
                Get started
              </Link>
            </div>
          </div>

          <button
            className="flex items-center justify-center h-10 w-10 -mr-2 rounded-lg text-white hover:bg-white/10 transition-colors md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-white/5 bg-neutral-950/95 backdrop-blur-xl md:hidden"
          >
            <div className="container-tight py-4">
              <div className="flex flex-col space-y-1">
                <MobileNavLink href="/features" label="Features" />
                <MobileNavLink href="/pricing" label="Pricing" />
                <MobileNavLink href="/sample" label="Sample" />
                <MobileNavLink href="/reviews" label="Reviews" />
                <MobileNavLink href="/blog" label="Blog" />
                <MobileNavLink href="/about" label="About" />
                <MobileNavLink href="/faq" label="FAQ" />

                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/5 pt-4">
                  <Link
                    href="/login"
                    className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-sm font-medium text-white/80"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="rounded-lg bg-white px-4 py-3 text-center text-sm font-semibold text-neutral-950"
                  >
                    Get started
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative px-3 py-1.5 text-sm font-medium transition-colors ${
        isActive ? 'text-white' : 'text-white/60 hover:text-white'
      }`}
    >
      {label}
      {isActive && (
        <motion.span
          layoutId="navbar-indicator"
          className="absolute inset-x-3 -bottom-[1px] h-px bg-primary-400"
        />
      )}
    </Link>
  );
};

interface MobileNavLinkProps {
  href: string;
  label: string;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`w-full rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
        isActive
          ? 'bg-primary-500/10 text-primary-400'
          : 'text-neutral-300 hover:bg-white/5 hover:text-white'
      }`}
    >
      {label}
    </Link>
  );
};
