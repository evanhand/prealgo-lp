import { Upload, Search, FileText } from 'lucide-react';

const STEPS = [
  {
    icon: Upload,
    label: 'Step 1',
    title: 'Upload a short-form video',
    body: 'MP4, MOV, AVI, or WebM. Up to 200MB and 3 minutes. No editing required.',
  },
  {
    icon: Search,
    label: 'Step 2',
    title: 'AI grades and finds comparables',
    body: 'Gemini watches the full video. We pull the closest-matching real posted videos from a 10,000+ database for an honest baseline.',
  },
  {
    icon: FileText,
    label: 'Step 3',
    title: 'Get a grade, view forecast, and fix list',
    body: 'A grade from F to A+. Predicted views per platform with three scenarios. Specific, ranked recommendations to push it higher.',
  },
];

export function HowItWorks() {
  return (
    <section className="container-tight py-20 sm:py-28">
      <div className="mb-12 max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary-300 mb-3">
          How it works
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Upload, wait 90 seconds, post smarter.
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {STEPS.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary-500/30 bg-primary-500/10 text-primary-300">
                <Icon className="h-5 w-5" />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mt-4">
                {s.label}
              </p>
              <h3 className="mt-1 text-base font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{s.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
