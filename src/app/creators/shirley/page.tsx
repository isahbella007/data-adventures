'use client';

import { useRef, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';

const TAGS = ['Author', 'AI Champion', 'Speaker', 'Data Literacy', 'CDO'];

const TOPICS = ['Board Readiness', 'AI Governance', 'AI Literacy', 'Transformation Strategy'];

const STATS = [
  { value: 'Global',  label: 'Experience'                 },
  { value: 'C-Suite', label: 'Executive-focused sessions' },
  { value: 'Real',    label: 'Implementation outcomes'    },
  { value: 'Data',    label: 'Driven decisions'           },
];

export default function ShirleyPage() {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImgRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroTextRef.current) {
      gsap.fromTo(
        Array.from(heroTextRef.current.children),
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power2.out' }
      );
    }
    if (heroImgRef.current) {
      gsap.fromTo(
        heroImgRef.current,
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out', delay: 0.25 }
      );
    }
  }, []);

  return (
    <Box sx={{ backgroundColor: '#080616', color: '#fff', overflowX: 'hidden' }}>

      {/* ── HERO ── */}
      <Box
        component="header"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          pt: { xs: '120px', md: '140px' },
          pb: { xs: '80px', md: '100px' },
          px: { xs: 3, md: '60px' },
          position: 'relative',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(109,40,217,0.18) 0%, transparent 70%), linear-gradient(160deg, #0d0b22 0%, #080616 100%)',
        }}
      >
        {/* Subtle grid overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(167,139,250,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
          }}
        />

        <Box
          sx={{
            maxWidth: 1280,
            mx: 'auto',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.15fr 0.85fr' },
            gap: { xs: 6, md: '80px' },
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Left — Text */}
          <Box ref={heroTextRef}>
            {/* Label */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(167,139,250,0.3)',
                borderRadius: '30px',
                px: '16px',
                py: '6px',
                mb: '28px',
              }}
            >
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#a78bfa' }} />
              <Typography
                sx={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#a78bfa',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                Chief Digital Officer & Author
              </Typography>
            </Box>

            {/* Main headline */}
            <Typography
              component="h1"
              sx={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(42px, 5.5vw, 72px)',
                lineHeight: 1.08,
                fontWeight: 800,
                color: '#fff',
                mb: '28px',
                letterSpacing: '-0.02em',
              }}
            >
              Demystifying AI.
              <br />
              Bridging{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(90deg, #7dd3fc, #a78bfa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Boardrooms
              </Box>
              {' & '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(90deg, #c084fc, #f0abfc)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Storybooks.
              </Box>
            </Typography>

            <Typography
              sx={{
                fontFamily: 'var(--font-inter)',
                fontSize: { xs: '16px', md: '18px' },
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.6)',
                mb: '40px',
                maxWidth: 560,
              }}
            >
              Shirley Werchota coordinates complex enterprise digital frameworks for European financial entities while translating the exact same data rules into hand-painted fairy tales for young minds.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                href="#advisory"
                disableElevation
                sx={{
                  background: 'linear-gradient(135deg, #6d28d9, #a855f7)',
                  color: '#fff',
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 700,
                  fontSize: '15px',
                  px: '32px',
                  py: '14px',
                  borderRadius: '30px',
                  boxShadow: '0 4px 24px rgba(109,40,217,0.4)',
                  '&:hover': { opacity: 0.9, transform: 'translateY(-2px)', boxShadow: '0 8px 32px rgba(109,40,217,0.6)' },
                  transition: 'all 0.2s',
                }}
              >
                Executive Advisory
              </Button>
              <Link href="/books/alex-data-twin" style={{ textDecoration: 'none' }}>
                <Button
                  disableElevation
                  variant="outlined"
                  sx={{
                    borderColor: 'rgba(167,139,250,0.4)',
                    borderWidth: 1,
                    color: 'rgba(255,255,255,0.8)',
                    fontFamily: 'var(--font-nunito)',
                    fontWeight: 700,
                    fontSize: '15px',
                    px: '32px',
                    py: '14px',
                    borderRadius: '30px',
                    '&:hover': { backgroundColor: 'rgba(167,139,250,0.1)', borderColor: '#a78bfa' },
                    transition: 'all 0.2s',
                  }}
                >
                  Explore Books
                </Button>
              </Link>
            </Box>
          </Box>

          {/* Right — Photo (transparent PNG cutout, floats on the grid) */}
          <Box
            ref={heroImgRef}
            sx={{
              width: '100%',
              height: { xs: 420, md: 580 },
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <Image
              src="/images/creators/shirley2.png"
              alt="Shirley Werchota"
              fill
              style={{
                objectFit: 'contain',
                objectPosition: 'center bottom',
                filter: 'drop-shadow(0 0 28px rgba(167,139,250,0.5)) drop-shadow(0 0 60px rgba(109,40,217,0.3))',
                maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
              }}
              priority
            />
          </Box>
        </Box>
      </Box>

      {/* ── MISSION STRIP ── */}
      <Box
        component="section"
        sx={{
          backgroundColor: '#100e28',
          py: '56px',
          px: { xs: 3, md: '60px' },
          borderTop: '1px solid rgba(167,139,250,0.12)',
          borderBottom: '1px solid rgba(167,139,250,0.12)',
        }}
      >
        <Box
          sx={{
            maxWidth: 1280,
            mx: 'auto',
            display: 'flex',
            alignItems: { xs: 'flex-start', md: 'center' },
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: '16px', md: '48px' },
          }}
        >
          <Typography
            sx={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: 'rgba(167,139,250,0.6)',
              fontSize: '11px',
              flexShrink: 0,
            }}
          >
            The Mission
          </Typography>
          <Box
            component="blockquote"
            sx={{ borderLeft: '2px solid #a78bfa', pl: { xs: '20px', md: '32px' }, m: 0 }}
          >
            <Typography
              sx={{
                fontFamily: 'var(--font-playfair)',
                fontSize: { xs: '20px', md: '26px' },
                fontWeight: 700,
                lineHeight: 1.5,
                color: 'rgba(255,255,255,0.9)',
                fontStyle: 'italic',
              }}
            >
              "Making data approachable — for the child discovering the world, and the executive navigating it."
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ── EXECUTIVE ADVISORY ── */}
      <Box
        id="advisory"
        component="section"
        sx={{ py: { xs: '80px', md: '120px' }, px: { xs: 3, md: '60px' }, backgroundColor: '#080616' }}
      >
        <Box
          sx={{
            maxWidth: 1280,
            mx: 'auto',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 6, md: '80px' },
            alignItems: 'center',
          }}
        >
          {/* Left */}
          <Box sx={{ flex: '1.2' }}>
            <Typography
              sx={{
                fontFamily: 'var(--font-inter)',
                fontSize: '11px',
                fontWeight: 700,
                color: 'rgba(167,139,250,0.7)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                mb: '16px',
              }}
            >
              Services
            </Typography>
            <Typography
              sx={{
                fontFamily: 'var(--font-playfair)',
                fontSize: { xs: '34px', md: '50px' },
                color: '#fff',
                lineHeight: 1.08,
                mb: '20px',
                fontWeight: 800,
                letterSpacing: '-0.01em',
              }}
            >
              Executive AI<br />Advisory
            </Typography>
            <Typography
              sx={{
                fontFamily: 'var(--font-inter)',
                fontSize: '16px',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.55)',
                mb: '32px',
                maxWidth: 480,
              }}
            >
              Boards don't need more hype. They need an executable roadmap. Shirley works directly with C-suite leaders to move AI from strategy document to measurable business outcome.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', mb: '40px' }}>
              {TOPICS.map((t) => (
                <Box
                  key={t}
                  sx={{
                    backgroundColor: 'rgba(167,139,250,0.08)',
                    border: '1px solid rgba(167,139,250,0.2)',
                    px: '18px',
                    py: '8px',
                    borderRadius: '20px',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#a78bfa',
                  }}
                >
                  {t}
                </Box>
              ))}
            </Box>

            <Button
              disableElevation
              variant="outlined"
              sx={{
                borderColor: 'rgba(167,139,250,0.35)',
                borderWidth: 1,
                color: 'rgba(255,255,255,0.8)',
                fontFamily: 'var(--font-nunito)',
                fontWeight: 700,
                fontSize: '15px',
                px: '32px',
                py: '13px',
                borderRadius: '30px',
                '&:hover': { backgroundColor: 'rgba(167,139,250,0.1)', borderColor: '#a78bfa' },
                transition: 'all 0.2s',
              }}
            >
              Request a Workshop
            </Button>
          </Box>

          {/* Stats grid */}
          <Box sx={{ flex: '0.8', width: '100%' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {STATS.map((s) => (
                <Box
                  key={s.value}
                  sx={{
                    backgroundColor: '#100e28',
                    p: { xs: '28px 22px', md: '36px 28px' },
                    borderRadius: '20px',
                    border: '1px solid rgba(167,139,250,0.12)',
                    boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
                    transition: 'border-color 0.2s',
                    '&:hover': { borderColor: 'rgba(167,139,250,0.35)' },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'var(--font-playfair)',
                      fontSize: '30px',
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, #a78bfa, #c084fc)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'block',
                      mb: '6px',
                    }}
                  >
                    {s.value}
                  </Typography>
                  <Typography
                    sx={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}
                  >
                    {s.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── ABOUT ── */}
      <Box
        id="about"
        component="section"
        sx={{
          py: { xs: '80px', md: '120px' },
          px: { xs: 3, md: '60px' },
          background: 'linear-gradient(160deg, #100e28 0%, #0d0b22 100%)',
          borderTop: '1px solid rgba(167,139,250,0.1)',
        }}
      >
        <Box
          sx={{
            maxWidth: 1280,
            mx: 'auto',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 6, md: '80px' },
            alignItems: 'center',
          }}
        >
          {/* Photo */}
          <Box
            sx={{
              flex: '0.75',
              width: '100%',
              height: { xs: 380, md: 500 },
              borderRadius: '20px',
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
              boxShadow: '0 0 0 1px rgba(167,139,250,0.15), 0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            <Image
              src="/images/creators/shirley.jpg"
              alt="Shirley Werchota"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
          </Box>

          {/* Bio */}
          <Box sx={{ flex: '1.25' }}>
            <Typography
              sx={{
                fontFamily: 'var(--font-inter)',
                fontSize: '11px',
                fontWeight: 700,
                color: 'rgba(167,139,250,0.7)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                display: 'block',
                mb: '16px',
              }}
            >
              About Shirley
            </Typography>

            <Typography
              sx={{
                fontFamily: 'var(--font-playfair)',
                fontSize: { xs: '36px', md: '52px' },
                lineHeight: 1.08,
                mb: '28px',
                fontWeight: 800,
                color: '#fff',
                letterSpacing: '-0.01em',
              }}
            >
              CDO.<br />Author.<br />Data Advocate.
            </Typography>

            <Typography
              sx={{ fontFamily: 'var(--font-inter)', fontSize: '16px', lineHeight: 1.75, color: 'rgba(255,255,255,0.6)', mb: '18px' }}
            >
              Shirley Werchota is a trilingual technology executive and Chief Digital Officer with a career spanning Orange Business, Raiffeisenbank International, and Accenture. She builds digital and AI functions from the ground up — and has launched a full technology venture in under six months.
            </Typography>
            <Typography
              sx={{ fontFamily: 'var(--font-inter)', fontSize: '16px', lineHeight: 1.75, color: 'rgba(255,255,255,0.6)', mb: '36px' }}
            >
              A recognised voice at European political and economic forums, she coaches boards on turning AI ambition into executable strategy. And when she's not in the boardroom, she's writing books that teach children the same thing — in a language they understand.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', mb: '36px' }}>
              {TAGS.map((tag) => (
                <Box
                  key={tag}
                  sx={{
                    backgroundColor: 'rgba(167,139,250,0.08)',
                    border: '1px solid rgba(167,139,250,0.18)',
                    px: '16px',
                    py: '7px',
                    borderRadius: '20px',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'rgba(167,139,250,0.9)',
                  }}
                >
                  {tag}
                </Box>
              ))}
            </Box>

            <Button
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              disableElevation
              sx={{
                background: 'linear-gradient(135deg, #6d28d9, #a855f7)',
                color: '#fff',
                fontFamily: 'var(--font-nunito)',
                fontWeight: 700,
                fontSize: '15px',
                px: '32px',
                py: '14px',
                borderRadius: '30px',
                boxShadow: '0 4px 24px rgba(109,40,217,0.35)',
                '&:hover': { opacity: 0.9, transform: 'translateY(-2px)', boxShadow: '0 8px 32px rgba(109,40,217,0.55)' },
                transition: 'all 0.2s',
              }}
            >
              Connect on LinkedIn
            </Button>
          </Box>
        </Box>
      </Box>

    </Box>
  );
}
