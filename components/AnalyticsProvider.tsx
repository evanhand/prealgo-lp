'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initAnalytics, track } from '@/lib/analytics';

// Initializes PostHog on first mount and fires a pageview on every Next.js
// route change (autocapture handles the initial load; route changes are
// SPA-style transitions PostHog wouldn't see otherwise).
export function AnalyticsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    if (!pathname) return;
    track('$pageview', { path: pathname });
  }, [pathname]);

  return null;
}
