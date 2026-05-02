/**
 * Minimal analytics helper used by ported components from the Vite app.
 *
 * The LP can later add PostHog if we want to track marketing-side events,
 * but for now these are no-ops so TCLPromoCard etc. work without ceremony.
 * Returns null/empty values so URL builders gracefully skip the param.
 */

export function track(_event: string, _properties?: Record<string, unknown>): void {
  // no-op
}

export function getDistinctId(): string | null {
  return null;
}

export function getFirstTouch(): {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referring_domain?: string;
} | null {
  return null;
}
