import type { Metadata } from 'next';
import StoryBook from '@/components/alex-data-twin/StoryBook';

export const metadata: Metadata = {
  title: 'Alex and the Data Twin | Data Adventures',
  description:
    'One tablet. Two worlds. One big adventure. Follow Alex into the digital world to rescue D-Teddy from the Data Pirates.',
};

export default function AlexDataTwinPage() {
  return <StoryBook />;
}
