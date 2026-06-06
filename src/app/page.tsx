'use client';

import { useRef, useEffect, useState } from 'react';
import { Box, Typography, Button, InputBase } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BOOKS } from '@/data/books';
import { CREATORS } from '@/data/creators';

const HERO_BUBBLES = [
  { size: 50, left: 5,  delay: 0,  duration: 14, variant: 0 },
  { size: 30, left: 12, delay: 3,  duration: 18, variant: 1 },
  { size: 70, left: 20, delay: 1,  duration: 12, variant: 2 },
  { size: 45, left: 35, delay: 5,  duration: 16, variant: 0 },
  { size: 25, left: 48, delay: 2,  duration: 20, variant: 1 },
  { size: 60, left: 58, delay: 7,  duration: 13, variant: 2 },
  { size: 35, left: 68, delay: 4,  duration: 17, variant: 0 },
  { size: 55, left: 75, delay: 6,  duration: 11, variant: 1 },
  { size: 40, left: 82, delay: 1,  duration: 15, variant: 2 },
  { size: 20, left: 90, delay: 8,  duration: 19, variant: 0 },
  { size: 65, left: 15, delay: 9,  duration: 14, variant: 1 },
  { size: 28, left: 42, delay: 11, duration: 16, variant: 2 },
  { size: 48, left: 62, delay: 3,  duration: 13, variant: 0 },
  { size: 38, left: 28, delay: 6,  duration: 18, variant: 1 },
];

const BUBBLE_VARIANTS = [
  { bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.3)',  glow: 'rgba(167,139,250,0.15)' },
  { bg: 'rgba(99,102,241,0.10)',  border: 'rgba(99,102,241,0.25)',  glow: 'rgba(99,102,241,0.12)'  },
  { bg: 'rgba(125,211,252,0.10)', border: 'rgba(125,211,252,0.22)', glow: 'rgba(125,211,252,0.12)' },
];

const VALUES = [
  { icon: '🤝', title: 'Consent First', desc: 'Teaches children the core real-life value of giving and checking for permission before sharing personal things online.' },
  { icon: '🌐', title: 'Demystifying Tech', desc: 'Breaks down invisible internet components, like networks, meshes, and servers, into visual, digestible concepts kids get instantly.' },
  { icon: '🎨', title: 'Gentle Stories', desc: 'Replaces cold cyber screens with soft, hand-painted worlds, protecting the magic of a classic childhood story reading hour.' },
];

export default function HomePage() {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroArtRef = useRef<HTMLDivElement>(null);
  const bookshelfRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (heroTextRef.current) {
      gsap.fromTo(
        Array.from(heroTextRef.current.children),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
      );
    }

    if (heroArtRef.current) {
      gsap.fromTo(
        heroArtRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 1.0, ease: 'power2.out', delay: 0.3 }
      );
    }

    if (bookshelfRef.current) {
      gsap.fromTo(
        bookshelfRef.current.querySelectorAll('[data-card]'),
        { y: 40 },
        {
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power1.out',
          scrollTrigger: { trigger: bookshelfRef.current, start: 'top 75%' },
        }
      );
    }

    ScrollTrigger.refresh();

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <Box sx={{ fontFamily: 'var(--font-nunito)', backgroundColor: '#faf8f5', color: '#2e241f', overflowX: 'hidden' }}>

      {/* ── HERO ── */}
      <Box
        component="header"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          pt: { xs: '100px', md: '120px' },
          pb: { xs: '60px', md: '80px' },
          px: { xs: 3, md: '40px' },
          // background: 'radial-gradient(circle at 80% 30%, #eef2ff 0%, #faf8f5 70%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Floating bubble swarm */}
        <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          {HERO_BUBBLES.map((b, i) => {
            const v = BUBBLE_VARIANTS[b.variant];
            return (
              <Box
                key={i}
                sx={{
                  position: 'absolute',
                  left: `${b.left}%`,
                  bottom: `-${b.size}px`,
                  width: b.size,
                  height: b.size,
                  borderRadius: '50%',
                  background: v.bg,
                  border: `1px solid ${v.border}`,
                  boxShadow: `0 0 ${Math.round(b.size * 0.4)}px ${v.glow}`,
                  backdropFilter: 'blur(3px)',
                  animation: `heroBubble ${b.duration}s ${b.delay}s linear infinite`,
                  '@keyframes heroBubble': {
                    '0%':   { transform: 'translateY(0) translateX(0)',    opacity: 0   },
                    '8%':   { opacity: 1                                                },
                    '50%':  { transform: 'translateY(-55vh) translateX(12px)'           },
                    '92%':  { opacity: 0.7                                              },
                    '100%': { transform: 'translateY(-115vh) translateX(-8px)', opacity: 0 },
                  },
                }}
              />
            );
          })}
        </Box>

        <Box
          sx={{
            maxWidth: 1200,
            mx: 'auto',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 5, md: '60px' },
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box ref={heroTextRef}>
            <Box
              sx={{
                display: 'inline-block',
                backgroundColor: '#f97316',
                color: '#fff',
                fontWeight: 700,
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                px: '16px',
                py: '6px',
                borderRadius: '20px',
                mb: '20px',
              }}
            >
              🔥 Out Now!
            </Box>

            <Typography
              component="h1"
              sx={{
                fontFamily: 'var(--font-nunito)',
                fontSize: 'clamp(36px, 5vw, 56px)',
                lineHeight: 1.1,
                fontWeight: 900,
                color: '#1e1b4b',
                mb: '20px',
              }}
            >
              Alex & the <br />
              <Box component="span" sx={{ color: '#6d28d9' }}>Data Twin</Box>
            </Typography>

            <Typography
              sx={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: { xs: '16px', md: '18px' },
                lineHeight: 1.6,
                color: '#4b5563',
                mb: '32px',
                maxWidth: 500,
              }}
            >
              What happens when Mum uploads Teddy's picture online without asking? Join Alex as he steps through his tablet screen into a magical, glowing blue data world to track down the sneaky Data Pirates!
            </Typography>

            <Link href="/books/alex-data-twin" style={{ textDecoration: 'none' }}>
              <Button
                disableElevation
                sx={{
                  background: 'linear-gradient(135deg, #6d28d9, #a855f7)',
                  color: '#fff',
                  fontFamily: 'var(--font-nunito)',
                  fontSize: { xs: '16px', md: '18px' },
                  fontWeight: 700,
                  px: '40px',
                  py: '16px',
                  borderRadius: '50px',
                  boxShadow: '0 10px 25px rgba(109,40,217,0.3)',
                  '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 15px 30px rgba(109,40,217,0.5)' },
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
              >
                Read the Interactive Preview 🚀
              </Button>
            </Link>
          </Box>

          <Box
            ref={heroArtRef}
            sx={{
              width: '100%',
              height: { xs: 300, md: 480 },
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
              position: 'relative',
            }}
          >
            <Image
              src="/images/kitchen-real.png"
              alt="Alex & His Digital Twin"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
            />
          </Box>
        </Box>
      </Box>

      {/* ── MISSION ── */}
      <Box
        component="section"
        sx={{
          py: { xs: '70px', md: '100px' },
          px: { xs: 3, md: '40px' },
          background: 'linear-gradient(135deg, #1e1b4b 0%, #2e1065 100%)',
        }}
      >
        <Box sx={{ maxWidth: 780, mx: 'auto', textAlign: 'center' }}>
          <Typography
            sx={{
              fontFamily: 'var(--font-nunito)',
              fontSize: '12px',
              fontWeight: 800,
              color: '#a78bfa',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              mb: '16px',
            }}
          >
            Why Data Adventures
          </Typography>

          <Typography
            sx={{
              fontFamily: 'var(--font-nunito)',
              fontWeight: 900,
              fontSize: { xs: '22px', md: '32px' },
              color: '#fff',
              lineHeight: 1.3,
              mb: '32px',
            }}
          >
            Children are growing up leaving a trail of data behind them online, yet almost nothing exists to teach them what that means.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            {[
              "Alex's adventures bring these abstract concepts to life. As he explores the data world, children gain an intuitive grasp of just how much data surrounds them, and how the trail we all leave online builds a digital footprint.",
              "The earlier we teach data literacy, the better-prepared children will be to make smart, safe choices online.",
            ].map((text, i) => (
              <Box key={i} sx={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <Box
                  sx={{
                    width: 6,
                    minWidth: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: '#a78bfa',
                    mt: '10px',
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: { xs: '15px', md: '17px' },
                    color: 'rgba(255,255,255,0.72)',
                    lineHeight: 1.7,
                  }}
                >
                  {text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ── BOOKSHELF ── */}
      <Box component="section" sx={{ py: { xs: '60px', md: '100px' }, px: { xs: 3, md: '40px' }, backgroundColor: '#ffffff' }}>
        <Box sx={{ textAlign: 'center', maxWidth: 600, mx: 'auto', mb: { xs: 5, md: '60px' } }}>
          <Typography sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: { xs: '28px', md: '38px' }, color: '#1e1b4b', mb: '12px' }}>
            The Adventure Series
          </Typography>
          <Typography sx={{ fontFamily: 'var(--font-dm-sans)', fontSize: '16px', color: '#6b7280' }}>
            Explore our growing library of whimsical stories transforming complex tech ideas into friendly watercolor fairy tales.
          </Typography>
        </Box>

        <Box
          ref={bookshelfRef}
          sx={{
            maxWidth: 1200,
            mx: 'auto',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: { xs: 3, md: '40px' },
            alignItems: 'stretch',
          }}
        >
          {BOOKS.map((book) => {
            const card = (
              <Box
                key={book.title}
                data-card
                sx={{
                  backgroundColor: '#faf8f5',
                  borderRadius: '20px',
                  p: '24px',
                  border: '1px solid #e5e7eb',
                  opacity: book.opacity,
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-6px)' },
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 0,
                  ...(book.href && { cursor: 'pointer' }),
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: 320,
                    backgroundColor: '#e5e7eb',
                    borderRadius: '12px',
                    mb: '20px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    fontSize: '40px',
                    flexShrink: 0,
                  }}
                >
                  {book.cover
                    ? <Image src={book.cover} alt={book.title} fill style={{ objectFit: 'cover' }} />
                    : '🔒'}
                </Box>

                <Typography sx={{ display: 'block', fontSize: '12px', fontWeight: 800, color: book.statusColor, textTransform: 'uppercase', mb: '12px' }}>
                  ● {book.status}
                </Typography>
                <Typography sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: '20px', color: '#1e1b4b', mb: '6px' }}>
                  {book.title}
                </Typography>
                <Typography sx={{ fontFamily: 'var(--font-dm-sans)', fontSize: '14px', color: '#6b7280', lineHeight: 1.5, flex: 1 }}>
                  {book.desc}
                </Typography>
              </Box>
            );
            return book.href
              ? <Link key={book.title} href={book.href} style={{ textDecoration: 'none' }}>{card}</Link>
              : card;
          })}
        </Box>
      </Box>

      {/* ── VALUES ──
      <Box component="section" sx={{ py: { xs: '60px', md: '100px' }, px: { xs: 3, md: '40px' }, backgroundColor: '#f5f3ef' }}>
        <Box
          sx={{
            maxWidth: 1100,
            mx: 'auto',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 3, md: '30px' },
          }}
        >
          {VALUES.map((v) => (
            <Box key={v.title} sx={{ backgroundColor: '#ffffff', p: { xs: '28px 24px', md: '40px 30px' }, borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <Typography sx={{ fontSize: '40px', mb: '16px', display: 'block' }}>{v.icon}</Typography>
              <Typography sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: '22px', color: '#1e1b4b', mb: '10px' }}>
                {v.title}
              </Typography>
              <Typography sx={{ fontFamily: 'var(--font-dm-sans)', fontSize: '15px', lineHeight: 1.6, color: '#4b5563' }}>
                {v.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box> */}

      {/* ── CREATORS ── */}
      <Box component="section" sx={{ py: { xs: '60px', md: '100px' }, px: { xs: 3, md: '40px' }, backgroundColor: '#ffffff' }}>
        <Box sx={{ textAlign: 'center', maxWidth: 600, mx: 'auto', mb: { xs: 5, md: '60px' } }}>
          <Typography sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: { xs: '28px', md: '38px' }, color: '#1e1b4b', mb: '12px' }}>
            Meet the Creators
          </Typography>
          <Typography sx={{ fontFamily: 'var(--font-dm-sans)', fontSize: '16px', color: '#6b7280' }}>
            The minds turning modern cyber privacy education into an approachable, artistic playground for family reading hours.
          </Typography>
        </Box>

        <Box sx={{ maxWidth: 900, mx: 'auto', display: 'flex', flexWrap: 'wrap', gap: { xs: 5, md: '60px' }, justifyContent: 'center' }}>
          {CREATORS.map((creator) => {
            const card = (
              <Box
                key={creator.role}
                sx={{
                  flex: 1, minWidth: 260, maxWidth: 380, textAlign: 'center',
                  ...(creator.href && {
                    cursor: 'pointer',
                    '&:hover .avatar': { transform: 'scale(1.05)', boxShadow: '0 16px 32px rgba(109,40,217,0.15)' },
                    '&:hover .name': { color: '#6d28d9' },
                  }),
                }}
              >
                <Box
                  className="avatar"
                  sx={{
                    width: 160, height: 160, borderRadius: '50%', mx: 'auto', mb: '20px',
                    overflow: 'hidden', position: 'relative',
                    border: '4px solid #f5f3ef', boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
                    backgroundColor: '#f5f3ef', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '48px',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                >
                  {creator.image
                    ? <Image src={creator.image} alt={creator.name} fill style={{ objectFit: 'cover', objectPosition: 'center center' }} />
                    : creator.fallbackEmoji}
                </Box>
                <Typography sx={{ fontFamily: 'var(--font-nunito)', fontSize: '12px', fontWeight: 800, color: '#a855f7', textTransform: 'uppercase', letterSpacing: '1px', mb: '6px' }}>
                  {creator.role}
                </Typography>
                <Typography className="name" sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: '24px', color: '#1e1b4b', mb: '12px', transition: 'color 0.2s' }}>
                  {creator.name}
                </Typography>
                <Typography sx={{ fontFamily: 'var(--font-dm-sans)', fontSize: '15px', lineHeight: 1.6, color: '#6b7280' }}>
                  {creator.bio}
                </Typography>
                {creator.href && (
                  <Typography sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: '13px', color: '#6d28d9', mt: '12px' }}>
                    Read more →
                  </Typography>
                )}
              </Box>
            );
            return creator.href
              ? <Link key={creator.role} href={creator.href} style={{ textDecoration: 'none' }}>{card}</Link>
              : card;
          })}
        </Box>
      </Box>

      {/* ── NEWSLETTER FOOTER ── */}
      <Box
        component="footer"
        sx={{ backgroundColor: '#111827', color: '#fff', py: { xs: '60px', md: '80px' }, px: { xs: 3, md: '40px' }, textAlign: 'center' }}
      >
        <Box sx={{ maxWidth: 500, mx: 'auto' }}>
          <Typography sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: { xs: '26px', md: '32px' }, mb: '12px' }}>
            Join the Privacy Radar
          </Typography>
          <Typography sx={{ fontFamily: 'var(--font-dm-sans)', color: '#9ca3af', mb: '24px', lineHeight: 1.6 }}>
            Be the first to know when Alex's next adventure loads or when free printable coloring books hit the network pages!
          </Typography>

          {submitted ? (
            <Typography sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, color: '#22c55e', fontSize: '16px' }}>
              ✅ Welcome aboard the radar!
            </Typography>
          ) : (
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', gap: '10px', flexDirection: { xs: 'column', sm: 'row' } }}
            >
              <InputBase
                type="email"
                placeholder="Enter grown-up's email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{
                  flex: 1,
                  px: '20px',
                  py: '14px',
                  borderRadius: '30px',
                  border: '1px solid #374151',
                  backgroundColor: '#1f2937',
                  color: '#fff',
                  fontSize: '16px',
                  fontFamily: 'var(--font-dm-sans)',
                  '& input::placeholder': { color: '#6b7280' },
                }}
              />
              <Button
                type="submit"
                disabled={loading}
                disableElevation
                sx={{
                  backgroundColor: '#0ea5e9',
                  color: '#fff',
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 700,
                  fontSize: '16px',
                  px: '28px',
                  py: '14px',
                  borderRadius: '30px',
                  whiteSpace: 'nowrap',
                  '&:hover': { backgroundColor: '#0284c7' },
  }}
>
  {loading ? 'Joining...' : 'Join the Data Unicorn Club 🦄'}
              </Button>

              {error && (
                <Typography sx={{ color: '#f87171', fontSize: '14px', mt: 1, pl: '20px' }}>
                  {error}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>

    </Box>
  );
}
