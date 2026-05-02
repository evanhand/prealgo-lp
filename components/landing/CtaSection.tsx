import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="container-tight py-20 sm:py-28">
      <div className="relative overflow-hidden rounded-3xl border border-primary-500/30 bg-gradient-to-br from-primary-500/10 via-secondary-500/[0.06] to-transparent p-10 sm:p-16 text-center">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.25),transparent_70%)]" />
        <div className="relative">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Stop guessing.
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-base text-white/65 leading-relaxed">
            Upload your next video before you post it. Free plan included. Find out what it’ll do in 90 seconds.
          </p>
          <Link
            href="/signup"
            className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-shadow"
          >
            Analyze a video free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <p className="mt-3 text-xs text-white/35">No credit card required.</p>
        </div>
      </div>
    </section>
  );
}
