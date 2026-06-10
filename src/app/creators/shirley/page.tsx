import { Metadata } from 'next';
import ShirleyClient from './ShirleyClient';

export const metadata: Metadata = {
  title: 'Shirley Werchota',
  description: 'Shirley Werchota is a Chief Digital Officer and author who bridges the gap between boardrooms and storybooks, making data fun for kids.',
  openGraph: {
    title: 'Shirley Werchota',
    description: 'Shirley Werchota is a Chief Digital Officer and author who bridges the gap between boardrooms and storybooks, making data fun for kids.',
    url: 'https://dataworldadventures.com/creators/shirley',
    siteName: 'Data World Adventures',
    locale: 'en_US',
    type: 'website',
  },
};

export default function ShirleyPage() {
  return <ShirleyClient />;
}
