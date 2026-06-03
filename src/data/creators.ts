export interface Creator {
  role: string;
  name: string;
  bio: string;
  image: string | null;
  fallbackEmoji: string;
  href?: string;
}

export const CREATORS: Creator[] = [
  {
    role: 'Author & Founder',
    name: 'Shirley Werchota',
    bio: 'Born in Tunisia to an Austrian father and Zimbabwean mother, Shirley has lived across two continents in six countries. A former painter turned data security strategist, she built this series to give children the digital literacy toolkit the world forgot to build.',
    image: '/images/creators/shirley.jpg',
    fallbackEmoji: '✍️',
    href: '/creators/shirley',
  },
  {
    role: 'Illustrator — Alex & DT',
    name: 'Mamta Panara',
    bio: 'A self-taught artist born and based in Nairobi, Kenya, whose work now sells across Europe. Mamta brings hand-crafted warmth to every world Alex explores — turning invisible tech concepts into paintings you want to step inside.',
    image: null,
    fallbackEmoji: '🎨',
  },
];
