/**
 * Inline JSON-LD script. Place inside a page's JSX (in <head> or <body>;
 * Next.js bubbles it into the static HTML correctly either way for the
 * static-export build).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
