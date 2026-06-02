import type { Metadata } from 'next';
import { Nunito, DM_Sans } from 'next/font/google';
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

export const metadata: Metadata = {
  title: 'Data Adventures',
  description: 'Storybook adventures that make data fun for kids.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} ${dmSans.variable}`}>
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
