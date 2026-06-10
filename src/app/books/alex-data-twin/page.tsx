import type { Metadata } from 'next';
import StoryBook from '@/components/alex-data-twin/StoryBook';

export const metadata: Metadata = {
  title: 'Alex and the Data Twin | Data Adventures',
  description:
    'One tablet. Two worlds. One big adventure. Follow Alex into the digital world to rescue D-Teddy from the Data Pirates.',
  openGraph: {
    title: 'Alex and the Data Twin | Data Adventures',
    url: 'https://dataworldadventures.com/books/alex-data-twin', 
    siteName: 'Data World Adventures',
    locale: 'en_US', 
    type: 'website'
  }
};

export default function AlexDataTwinPage() {
  return <StoryBook />;
}
