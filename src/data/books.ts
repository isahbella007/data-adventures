export interface Book {
  title: string;
  status: string;
  statusColor: string;
  desc: string;
  opacity: number;
  cover: string | null;
  href?: string;
}

export const BOOKS: Book[] = [
  {
    title: 'Alex & His Data Twin',
    status: 'Available Now',
    statusColor: '#22c55e',
    desc: 'An enchanting story introducing young minds to the concepts of online data privacy and tracking footprints.',
    opacity: 1,
    cover: '/images/kitchen-real.png',
    href: '/books/alex-data-twin',
  },
  {
    title: 'The Privacy Pixies',
    status: 'In Development',
    statusColor: '#a855f7',
    desc: 'Coming soon! An adventure exploring password security locks, firewalls, and how to keep digital homes secure.',
    opacity: 0.65,
    cover: null,
  },
  {
    title: 'The Cloud Kingdom',
    status: 'Future Concept',
    statusColor: '#6b7280',
    desc: 'Where do photos go when they vanish into thin air? A journey climbing up into the invisible networks of the web.',
    opacity: 0.65,
    cover: null,
  },
];
