import type { Metadata } from 'next';
import StoryBook from '@/components/alex-data-twin/StoryBook';

export const metadata: Metadata = {
  title: 'Alex and the Data Twin | Data Adventures',
  description:
    'One tablet. Two worlds. One big adventure. Follow Alex into the digital world to rescue D-Teddy from the Data Pirates.',
  alternates: {
    canonical: '/books/alex-data-twin',
  },
  openGraph: {
    title: 'Alex and the Data Twin | Data Adventures',
    url: 'https://dataworldadventures.com/books/alex-data-twin', 
    images: [{ url: '/images/og-alex-data-twin.jpg', width: 1200, height: 900, alt: 'Alex and the Data Twin: Alex at the kitchen table with his mum\'s tablet' }],
    siteName: 'Data World Adventures',
    locale: 'en_US', 
    type: 'website'
  }
};

// Structured data so Google can show the book with its details in search results.
// Source: the Amazon product pages for the Kindle and paperback editions.
const bookJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  '@id': 'https://dataworldadventures.com/books/alex-data-twin#book',
  name: 'Alex and the Data Twin',
  url: 'https://dataworldadventures.com/books/alex-data-twin',
  image: 'https://dataworldadventures.com/images/kitchen-real.png',
  description:
    "When Alex looks into the dark screen of his mother's tablet, a boy looks back: his data twin. A picture book about the world children already live in, and the word that keeps them safe in it: consent.",
  author: { '@type': 'Person', name: 'Shirley Werchota', url: 'https://dataworldadventures.com/creators/shirley' },
  illustrator: { '@type': 'Person', name: 'Mamta Panara' },
  editor: { '@type': 'Person', name: 'Barbara Lanz' },
  publisher: { '@type': 'Organization', name: 'Data World Press' },
  datePublished: '2026-06-07',
  inLanguage: 'en',
  typicalAgeRange: '5-9',
  isPartOf: { '@type': 'BookSeries', name: 'Data World Adventures', url: 'https://dataworldadventures.com' },
  workExample: [
    {
      '@type': 'Book',
      bookFormat: 'https://schema.org/EBook',
      isbn: '9789786828084',
      numberOfPages: 56,
      url: 'https://www.amazon.com/dp/B0H4D33D4S',
    },
    {
      '@type': 'Book',
      bookFormat: 'https://schema.org/Paperback',
      isbn: '9789786877808',
      numberOfPages: 56,
      url: 'https://www.amazon.com/dp/9786877802',
    },
  ],
};

export default function AlexDataTwinPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }}
      />
      <StoryBook />
    </>
  );
}
