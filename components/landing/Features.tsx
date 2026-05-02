import { Sparkles, BarChart3, Target, Zap, TrendingUp, Lightbulb } from 'lucide-react';

const FEATURES = [
  {
    icon: BarChart3,
    title: 'View prediction per platform',
    body: 'Predicts views separately for TikTok, Instagram Reels, and YouTube Shorts. Three numbers per platform: typical creator, your account, and the upside if it pops.',
  },
  {
    icon: Target,
    title: 'Anchored on real posted videos',
    body: 'Comparable videos with actual view counts come from a database of 10,000+ posted videos, not synthetic estimates. The grade reflects real outcomes.',
  },
  {
    icon: Sparkles,
    title: 'Hook + x-factor breakdown',
    body: 'See your hook archetype, where it lands on the curiosity-gap spectrum, and whether you have a real share-trigger. Plus a rewritten alternative.',
  },
  {
    icon: TrendingUp,
    title: 'Retention prediction',
    body: 'Predicted retention curve with major drop-off timestamps so you know exactly which seconds to recut.',
  },
  {
    icon: Lightbulb,
    title: 'Concrete fixes',
    body: 'Not "improve your hook". Specific, ranked recommendations with the predicted impact on virality.',
  },
  {
    icon: Zap,
    title: 'Results in 60-120 seconds',
    body: 'Most analyses land within 90 seconds. No queue, no priority-tier upsell to skip the line.',
  },
];

export function Features() {
  return (
    <section className="container-tight py-20 sm:py-28">
      <div className="mb-12 max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary-300 mb-3">
          What you get
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          A grade, a prediction, and a fix list.
        </h2>
        <p className="mt-3 text-base text-white/60 leading-relaxed">
          Every analysis covers what makes the video work, what doesn’t, and how it’ll perform on each platform. No fluff, no charts you can’t read.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-colors hover:border-primary-500/30"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary-500/30 bg-primary-500/10 text-primary-300">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/60">{f.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
