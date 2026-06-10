import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Data World Adventures',
  description: 'Storybook adventures that make data fun for kids.',
  openGraph: {
    title: 'Data World Adventures',
    description: 'Storybook adventures that make data fun for kids.',
    url: 'https://dataworldadventures.com',
    siteName: 'Data World Adventures',
    locale: 'en_US',
    type: 'website',
  },
};

export default function HomePage() {
  return <HomeClient />;
}
