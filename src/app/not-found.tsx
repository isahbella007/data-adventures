import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <div
      style={{
        backgroundColor: '#030010',
        color: 'rgba(255,255,255,0.8)',
        minHeight: '100vh',
        padding: '160px 24px 80px',
        textAlign: 'center',
        fontFamily: 'var(--font-dm-sans)',
      }}
    >
      <Image
        src="/images/logo-small.png"
        alt="Data World Adventures teddy bear"
        width={120}
        height={120}
        style={{ borderRadius: 24, margin: '0 auto 24px', display: 'block' }}
      />
      <h1
        style={{
          fontFamily: 'var(--font-nunito)',
          fontWeight: 900,
          fontSize: 'clamp(2rem, 5vw, 2.75rem)',
          color: '#ffffff',
          margin: '0 0 16px',
        }}
      >
        This page got lost in the Data World
      </h1>
      <p style={{ margin: '0 0 32px', lineHeight: 1.7 }}>
        Maybe the Data Pirates took it. Let&apos;s get you back on track.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-block',
          backgroundColor: '#7c3aed',
          color: '#ffffff',
          fontFamily: 'var(--font-nunito)',
          fontWeight: 700,
          padding: '14px 32px',
          borderRadius: 50,
          textDecoration: 'none',
        }}
      >
        Back to the homepage
      </Link>
    </div>
  );
}
