import Link from 'next/link';

// Custom MDX components used across blog posts. Imported into the
// MDXRemote/MDXContent boundary in [slug]/page.tsx.

export function StatGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose grid grid-cols-2 gap-3 sm:grid-cols-3 my-8">
      {children}
    </div>
  );
}

export function StatCard({ stat, label }: { stat: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5">
      <div className="text-2xl font-bold tracking-tight text-white">{stat}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/50">
        {label}
      </div>
    </div>
  );
}

export function Callout({
  type = 'info',
  children,
}: {
  type?: 'info' | 'warning' | 'success' | 'note';
  children: React.ReactNode;
}) {
  const tones: Record<string, string> = {
    info: 'border-primary-500/30 bg-primary-500/[0.06]',
    note: 'border-white/[0.08] bg-white/[0.03]',
    warning: 'border-amber-500/30 bg-amber-500/[0.06]',
    success: 'border-emerald-500/30 bg-emerald-500/[0.06]',
  };
  return (
    <div className={`not-prose my-6 rounded-xl border ${tones[type]} px-5 py-4 text-sm text-white/85 leading-relaxed`}>
      {children}
    </div>
  );
}

export function CTA({
  headline,
  sub,
  primary = 'Try PreAlgo free',
  primaryHref = '/signup',
  secondary,
  secondaryHref = '/pricing',
}: {
  headline: string;
  sub?: string;
  primary?: string;
  primaryHref?: string;
  secondary?: string;
  secondaryHref?: string;
}) {
  return (
    <div className="not-prose my-12 rounded-2xl border border-primary-500/30 bg-gradient-to-br from-primary-500/10 via-secondary-500/[0.06] to-transparent p-8 sm:p-10 text-center">
      <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{headline}</h3>
      {sub && <p className="mt-3 mx-auto max-w-2xl text-base text-white/65 leading-relaxed">{sub}</p>}
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href={primaryHref}
          className="rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-shadow"
        >
          {primary}
        </Link>
        {secondary && (
          <Link
            href={secondaryHref}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-base font-medium text-white/85 hover:bg-white/[0.06] transition-colors"
          >
            {secondary}
          </Link>
        )}
      </div>
    </div>
  );
}

export const mdxComponents = {
  StatGrid,
  StatCard,
  Callout,
  CTA,
  a: ({ href, children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith('http');
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href ?? '#'} {...(rest as Record<string, unknown>)}>
        {children}
      </Link>
    );
  },
};
