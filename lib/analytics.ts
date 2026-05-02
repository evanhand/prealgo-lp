/**
 * PostHog analytics for the prealgo-lp marketing site.
 *
 * Same project (337527 "The Content Labs") as the Vite dashboard and TCL —
 * events are tagged with `app: 'prealgo-lp'` so we can filter LP-only or
 * blend marketing + product into one funnel.
 *
 * Identity stitches across the LP → Vite app → TCL by passing
 * ph_distinct_id on the URL. The Vite app's PrealgoIdentityBridge picks
 * it up on the dashboard side; TCL has the same on its side.
 */
import posthog from 'posthog-js';

const POSTHOG_KEY = 'phc_WBp4ZUVK6uD1ddzyD9pAlbkQZZvbVMUPHToDJ8d1ngB';
const POSTHOG_HOST = 'https://us.i.posthog.com';

const FIRST_TOUCH_KEY = 'prealgo_first_touch';

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
  'ttclid',
  'twclid',
  'msclkid',
  'ref',
] as const;

type FirstTouch = {
  referrer: string | null;
  referring_domain: string | null;
  landing_path: string;
  landing_at: string;
} & Partial<Record<(typeof UTM_KEYS)[number], string>>;

let initialized = false;

function readFirstTouch(): FirstTouch | null {
  try {
    const raw = localStorage.getItem(FIRST_TOUCH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeFirstTouch(touch: FirstTouch) {
  try {
    localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(touch));
  } catch {
    // ignore (private mode etc.)
  }
}

function captureFirstTouchOnce(): FirstTouch {
  const existing = readFirstTouch();
  if (existing) return existing;

  const params = new URLSearchParams(window.location.search);
  const utms: Partial<Record<(typeof UTM_KEYS)[number], string>> = {};
  for (const key of UTM_KEYS) {
    const v = params.get(key);
    if (v) utms[key] = v;
  }

  const referrer = document.referrer || null;
  let referring_domain: string | null = null;
  if (referrer) {
    try {
      referring_domain = new URL(referrer).hostname;
    } catch {
      referring_domain = null;
    }
  }

  const touch: FirstTouch = {
    referrer,
    referring_domain,
    landing_path: window.location.pathname + window.location.search,
    landing_at: new Date().toISOString(),
    ...utms,
  };

  writeFirstTouch(touch);
  return touch;
}

export function initAnalytics() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: 'identified_only',
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
    persistence: 'localStorage+cookie',
    loaded: (ph) => {
      ph.register({ app: 'prealgo-lp' });

      const touch = captureFirstTouchOnce();
      ph.people.set_once({
        prealgo_first_referrer: touch.referrer,
        prealgo_first_referring_domain: touch.referring_domain,
        prealgo_first_landing_path: touch.landing_path,
        prealgo_first_landing_at: touch.landing_at,
        prealgo_first_utm_source: touch.utm_source,
        prealgo_first_utm_medium: touch.utm_medium,
        prealgo_first_utm_campaign: touch.utm_campaign,
        prealgo_first_utm_content: touch.utm_content,
        prealgo_first_utm_term: touch.utm_term,
      });
      ph.register({
        prealgo_first_referrer: touch.referrer,
        prealgo_first_referring_domain: touch.referring_domain,
        prealgo_first_utm_source: touch.utm_source,
        prealgo_first_utm_medium: touch.utm_medium,
        prealgo_first_utm_campaign: touch.utm_campaign,
      });
    },
  });
}

export function track(event: string, properties?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !initialized) return;
  posthog.capture(event, properties);
}

export function getDistinctId(): string | null {
  if (typeof window === 'undefined' || !initialized) return null;
  try {
    return posthog.get_distinct_id();
  } catch {
    return null;
  }
}

export function getFirstTouch(): FirstTouch | null {
  return readFirstTouch();
}
