import { JsonLd } from '@/components/JsonLd';
import { LandingPageContent } from '@/components/landing/LandingPageContent';
import { ReviewsHomepageSection } from '@/components/reviews/ReviewsHomepageSection';
import { aggregateRating, getApprovedReviews } from '@/lib/reviews';

export default async function HomePage() {
  const reviews = await getApprovedReviews();
  const { avg, count } = aggregateRating(reviews);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'PreAlgo',
          url: 'https://prealgo.com',
          logo: 'https://prealgo.com/logo.svg',
          description: 'AI-powered content analysis for creators',
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'business@thecontentlabs.io',
            contactType: 'customer support',
          },
          sameAs: ['https://thecontentlabs.app'],
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'PreAlgo',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          description:
            'AI grader, view prediction, and improvement suggestions for short-form video. Trained on 11,000+ real posted videos.',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          ...(count > 0 && {
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: avg,
              reviewCount: count,
              bestRating: 5,
              worstRating: 1,
            },
          }),
        }}
      />
      {count > 0 && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'PreAlgo',
            description: 'AI-powered content analysis for creators',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: avg,
              reviewCount: count,
              bestRating: 5,
              worstRating: 1,
            },
            review: reviews.slice(0, 12).map((r) => ({
              '@type': 'Review',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: r.rating,
                bestRating: 5,
                worstRating: 1,
              },
              author: {
                '@type': 'Person',
                name: r.display_name || r.reviewer_full_name || 'Creator',
              },
              datePublished: r.approved_at ?? r.created_at,
              reviewBody: r.body,
              name: r.title,
            })),
          }}
        />
      )}
      <LandingPageContent
        reviewsSlot={<ReviewsHomepageSection reviews={reviews} />}
      />
    </>
  );
}
