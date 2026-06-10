import type { Metadata } from 'next';
import { Nunito, DM_Sans, Playfair_Display, Inter, Syne } from 'next/font/google';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Navbar from '@/shared/Navbar';
import Footer from '@/shared/Footer';
import './globals.css';

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: { 
    default: 'Data World Adventures | Tech, Data & Automation, For Children', 
    template: '%s | Data World Adventures'
  },
  description: 'Storybook adventures that make data fun for kids.',
  metadataBase: new URL('https://dataworldadventures.com'), 
  alternates: { 
    canonical: '/', 
  }, 
  openGraph: {
    title: 'Data World Adventures',
    description: 'Storybook adventures that make data fun for kids.',
    url: 'https://dataworldaddventures.com', 
    siteName: 'Data World Adventures',
    locale: 'en_US', 
    type: 'website'
    
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} ${dmSans.variable} ${playfair.variable} ${inter.variable} ${syne.variable}`}>
      <body>
        <ThemeRegistry>
          <Navbar />
          <main style={{ minHeight: '100vh' }}>{children}</main>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
