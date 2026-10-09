import Link from 'next/link';

export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundColor: '#030010',
        color: 'rgba(255,255,255,0.8)',
        padding: '120px 24px 80px',
        fontFamily: 'var(--font-dm-sans)',
        lineHeight: 1.7,
      }}
    >
      <article style={{ maxWidth: 760, margin: '0 auto' }} className="legal-page">
        <Link href="/" style={{ color: '#7DD3FC', fontSize: '0.9rem' }}>
          ← Home
        </Link>
        <h1
          style={{
            fontFamily: 'var(--font-nunito)',
            fontWeight: 900,
            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
            color: '#ffffff',
            margin: '16px 0 32px',
          }}
        >
          {title}
        </h1>
        {children}
      </article>
    </div>
  );
}
