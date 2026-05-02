'use client';

import React from 'react';
import Link from 'next/link';
import { Cpu, X, Instagram, Youtube, Linkedin } from 'lucide-react';
import { TCLPromoCard } from '../tcl/TCLPromoCard';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-neutral-950 py-16">
      <div className="container-tight">
        {/* TCL banner above footer */}
        <div className="mb-12">
          <TCLPromoCard
            variant="hero"
            source="landing_footer"
            headline="PreAlgo grades single videos. TCL handles your whole strategy."
            subheadline="Connect your TikTok, Instagram, and YouTube. Get your existing content audited, your competitors analyzed, and your 30-day calendar built with hooks and scripts. The data behind PreAlgo's grades comes from TCL."
            cta="Try TCL Free"
          />
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.03]">
                <Cpu className="h-4 w-4 text-primary-400" />
              </div>
              <span className="text-base font-semibold tracking-tight text-white">PreAlgo</span>
              <span className="ml-1 rounded-sm bg-white/5 px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-widest text-white/40">
                V2
              </span>
            </Link>
            <p className="mb-6 max-w-md text-sm leading-relaxed text-white/50">
              AI-powered content analysis for creators. Know how your content will perform before you post.
            </p>
            <div className="flex space-x-3">
              <SocialLink icon={<X className="h-4 w-4" />} href="https://x.com/Evan_Hand" />
              <SocialLink icon={<Instagram className="h-4 w-4" />} href="https://www.instagram.com/evanhandd/" />
              <SocialLink icon={<Youtube className="h-4 w-4" />} href="https://www.youtube.com/@theevanhand" />
              <SocialLink icon={<Linkedin className="h-4 w-4" />} href="https://www.linkedin.com/in/evan-hand1/" />
              <SocialLink
                icon={
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .54.05.79.12v-3.46a6.37 6.37 0 0 0-.79-.05A6.36 6.36 0 0 0 3 16a6.36 6.36 0 0 0 6.36 6.36 6.36 6.36 0 0 0 6.36-6.36V7.62a8.16 8.16 0 0 0 3.87.93v-3.34a4.85 4.85 0 0 1-2.92-.87" />
                  </svg>
                }
                href="https://www.tiktok.com/@evhandd"
              />
            </div>
          </div>

          <div>
            <h5 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-white/40">
              Platform
            </h5>
            <ul className="space-y-2.5">
              <FooterLink to="/features" label="Features" />
              <FooterLink to="/pricing" label="Pricing" />
              <FooterLink to="/sample" label="Sample analysis" />
              <FooterLink to="/about" label="About" />
              <FooterLink to="https://thecontentlabs.app" label="The Content Labs" external />
            </ul>
          </div>

          <div>
            <h5 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-white/40">
              Support
            </h5>
            <ul className="space-y-2.5">
              <FooterLink to="mailto:business@thecontentlabs.io" label="Contact" external />
              <FooterLink to="/faq" label="FAQ" />
              <FooterLink to="/terms" label="Terms of Service" />
              <FooterLink to="/privacy" label="Privacy Policy" />
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/5 pt-6">
          <div className="flex flex-col items-center justify-between space-y-3 md:flex-row md:space-y-0">
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/30">
              © {currentYear} PreAlgo, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link href="/terms" className="text-xs text-white/40 transition-colors hover:text-white/70">
                Terms
              </Link>
              <Link href="/privacy" className="text-xs text-white/40 transition-colors hover:text-white/70">
                Privacy
              </Link>
              <a href="mailto:business@thecontentlabs.io" className="text-xs text-white/40 transition-colors hover:text-white/70">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  to: string;
  label: string;
  external?: boolean;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, label, external }) => {
  const isMailto = to.startsWith('mailto:');

  if (isMailto || external) {
    return (
      <li>
        <a
          href={to}
          className="text-sm text-white/50 transition-colors hover:text-white"
          target={external && !isMailto ? '_blank' : undefined}
          rel={external && !isMailto ? 'noopener noreferrer' : undefined}
        >
          {label}
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link href={to} className="text-sm text-white/50 transition-colors hover:text-white">
        {label}
      </Link>
    </li>
  );
};

interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-white/50 transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
    >
      {icon}
    </a>
  );
};
