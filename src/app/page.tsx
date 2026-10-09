import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: { absolute: 'Data World Adventures | Storybooks for kids growing up in a world of data' },
  description: 'Picture-book adventures that help children understand the data all around them, so they grow up curious, confident and safe in a world made of data.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Data World Adventures | Storybooks for kids growing up in a world of data',
    description: 'Picture-book adventures that help children understand the data all around them, so they grow up curious, confident and safe in a world made of data.',
    url: 'https://dataworldadventures.com',
    siteName: 'Data World Adventures',
    locale: 'en_US',
    type: 'website',
  },
};

export default function HomePage() {
  return <HomeClient />;
}
