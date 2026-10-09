import { Metadata } from 'next';
import ShirleyClient from './ShirleyClient';

export const metadata: Metadata = {
  title: 'Shirley Werchota',
  description: 'Shirley Werchota is an executive AI advisor and author who bridges the gap between boardrooms and storybooks, making data fun for kids.',
  alternates: {
    canonical: '/creators/shirley',
  },
  openGraph: {
    title: 'Shirley Werchota',
    description: 'Shirley Werchota is an executive AI advisor and author who bridges the gap between boardrooms and storybooks, making data fun for kids.',
    url: 'https://dataworldadventures.com/creators/shirley',
    images: [{ url: '/images/og-shirley.jpg', width: 1200, height: 630, alt: 'Shirley Werchota' }],
    siteName: 'Data World Adventures',
    locale: 'en_US',
    type: 'website',
  },
};

export default function ShirleyPage() {
  return <ShirleyClient />;
}
