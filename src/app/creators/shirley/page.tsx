'use client';

import { useRef, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';

const TAGS = ['Author', 'AI Champion', 'Speaker', 'Data Literacy', 'CDO'];

const TOPICS = ['Board Readiness', 'AI Governance', 'AI Literacy', 'Transformation Strategy'];

const STATS = [
  { value: 'Global',  label: 'Experience'                  },
  { value: 'C-Suite', label: 'Executive-focused sessions'  },
  { value: 'Real',    label: 'Implementation outcomes'     },
  { value: 'Data',    label: 'Driven decisions'            },
];

export default function ShirleyPage() {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImgRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroTextRef.current) {
      gsap.fromTo(
        Array.from(heroTextRef.current.children),
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out' }
      );
    }
    if (heroImgRef.current) {
      gsap.fromTo(
        heroImgRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out', delay: 0.2 }
      );
    }
  }, []);

  return (
    <Box sx={{ backgroundColor: '#faf8f5', color: '#2e241f', overflowX: 'hidden' }}>

      {/* ── HERO ── */}
      <Box
        component="header"
        sx={{
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          pt: { xs: '120px', md: '140px' },
          pb: { xs: '60px', md: '80px' },
          px: { xs: 3, md: '40px' },
          // background: 'linear-gradient(135deg, #faf8f5 0%, #f1f5f9 100%)',
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            mx: 'auto',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.2fr 0.8fr' },
            gap: { xs: 5, md: '60px' },
            alignItems: 'center',
          }}
        >
          {/* Text */}
          <Box ref={heroTextRef}>
            <Typography
              sx={{
                fontFamily: 'var(--font-inter)',
                fontSize: '13px',
                fontWeight: 700,
                color: '#6d28d9',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                mb: '16px',
                display: 'block',
              }}
            >
              Chief Digital Officer & Author
            </Typography>

            <Typography
              component="h1"
              sx={{
                fontFamily: 'var(--font-nunito)',
                fontSize: 'clamp(38px, 5.5vw, 64px)',
                lineHeight: 1.1,
                fontWeight: 700,
                color: '#1e1b4b',
                mb: '24px',
              }}
            >
              Demystifying AI.{' '}
              <br />
              Bridging{' '}
              <Box component="span" sx={{ color: '#0ea5e9' }}>Boardrooms</Box>
              {' & '}
              <br />
              <Box component="span" sx={{ color: '#6d28d9' }}>Storybooks.</Box>
            </Typography>

            <Typography
              sx={{
                fontFamily: 'var(--font-inter)',
                fontSize: { xs: '16px', md: '19px' },
                lineHeight: 1.6,
                color: '#4b5563',
                mb: '36px',
                maxWidth: 580,
              }}
            >
              Shirley Werchota coordinates complex enterprise digital frameworks for European financial entities while translating the exact same data rules into hand-painted fairy tales for young minds.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                href="#advisory"
                disableElevation
                sx={{
                  backgroundColor: '#1e1b4b',
                  color: '#fff',
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 700,
                  fontSize: '16px',
                  px: '32px',
                  py: '14px',
                  borderRadius: '30px',
                  '&:hover': { backgroundColor: '#0f0d30', transform: 'translateY(-2px)' },
                  transition: 'all 0.2s',
                }}
              >
                Executive Advisory 👔
              </Button>
              <Link href="/books/alex-data-twin" style={{ textDecoration: 'none' }}>
                <Button
                  disableElevation
                  variant="outlined"
                  sx={{
                    borderColor: '#6d28d9',
                    color: '#6d28d9',
                    fontFamily: 'var(--font-nunito)',
                    fontWeight: 700,
                    fontSize: '16px',
                    px: '32px',
                    py: '14px',
                    borderRadius: '30px',
                    borderWidth: 2,
                    '&:hover': { backgroundColor: 'rgba(109,40,217,0.05)', transform: 'translateY(-2px)', borderWidth: 2 },
                    transition: 'all 0.2s',
                  }}
                >
                  Explore Children's Books 📖
                </Button>
              </Link>
            </Box>
          </Box>

          {/* Photo */}
          <Box
            ref={heroImgRef}
            sx={{
              width: '100%',
              height: { xs: 360, md: 500 },
              borderRadius: '30px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
              position: 'relative',
              background: 'linear-gradient(45deg, #1e1b4b 50%, #6d28d9 50%)',
            }}
          >
            <Image
              src="/images/creators/shirley.jpg"
              alt="Shirley Werchota"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              priority
            />
          </Box>
        </Box>
      </Box>

      {/* ── MISSION STRIP ── */}
      <Box
        component="section"
        sx={{
          backgroundColor: '#ffffff',
          py: '60px',
          px: { xs: 3, md: '40px' },
          borderTop: '1px solid #f3f4f6',
          borderBottom: '1px solid #f3f4f6',
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            mx: 'auto',
            display: 'flex',
            alignItems: { xs: 'flex-start', md: 'center' },
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: '12px', md: '40px' },
          }}
        >
          <Typography
            sx={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: '#9ca3af',
              fontSize: '14px',
              flexShrink: 0,
            }}
          >
            The Mission
          </Typography>
          <Box
            component="blockquote"
            sx={{
              borderLeft: '3px solid #6d28d9',
              pl: { xs: '16px', md: '24px' },
              m: 0,
            }}
          >
            <Typography
              sx={{
                fontFamily: 'var(--font-playfair)',
                fontSize: { xs: '20px', md: '26px' },
                fontWeight: 700,
                lineHeight: 1.4,
                color: '#1e1b4b',
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
        sx={{ py: { xs: '70px', md: '100px' }, px: { xs: 3, md: '40px' }, backgroundColor: '#faf8f5' }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            mx: 'auto',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 5, md: '60px' },
            alignItems: 'center',
          }}
        >
          {/* Left */}
          <Box sx={{ flex: '1.2' }}>
            <Typography
              sx={{
                fontFamily: 'var(--font-playfair)',
                fontSize: { xs: '32px', md: '46px' },
                color: '#1e1b4b',
                lineHeight: 1.1,
                mb: '20px',
                fontWeight: 800,
              }}
            >
              Executive AI <br /> Advisory
            </Typography>
            <Typography
              sx={{
                fontFamily: 'var(--font-inter)',
                fontSize: '16px',
                lineHeight: 1.6,
                color: '#4b5563',
                mb: '28px',
              }}
            >
              Boards don't need more hype. They need an executable roadmap. Shirley works directly with C-suite leaders to move AI from strategy document to measurable business outcome.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', mb: '36px' }}>
              {TOPICS.map((t) => (
                <Box
                  key={t}
                  sx={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    px: '18px',
                    py: '8px',
                    borderRadius: '20px',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#4b5563',
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
                borderColor: '#1e1b4b',
                borderWidth: 2,
                color: '#1e1b4b',
                fontFamily: 'var(--font-nunito)',
                fontWeight: 700,
                fontSize: '16px',
                px: '32px',
                py: '14px',
                borderRadius: '30px',
                '&:hover': { backgroundColor: 'rgba(30,27,75,0.05)', borderWidth: 2 },
                transition: 'all 0.2s',
              }}
            >
              Request a Workshop
            </Button>
          </Box>

          {/* Stats grid */}
          <Box sx={{ flex: '0.8', width: '100%' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {STATS.map((s) => (
                <Box
                  key={s.value}
                  sx={{
                    backgroundColor: '#fff',
                    p: { xs: '24px 20px', md: '30px 24px' },
                    borderRadius: '20px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    border: '1px solid #e5e7eb',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'var(--font-playfair)',
                      fontSize: '28px',
                      fontWeight: 800,
                      color: '#6d28d9',
                      display: 'block',
                      mb: '4px',
                    }}
                  >
                    {s.value}
                  </Typography>
                  <Typography
                    sx={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: '#6b7280', fontWeight: 600 }}
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
          py: { xs: '70px', md: '100px' },
          px: { xs: 3, md: '40px' },
          background: 'linear-gradient(135deg, #1e1b4b 0%, #2e1065 100%)',
          color: '#fff',
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            mx: 'auto',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 5, md: '60px' },
            alignItems: 'center',
          }}
        >
          {/* Photo */}
          <Box
            sx={{
              flex: '0.8',
              width: '100%',
              height: { xs: 360, md: 460 },
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
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
          <Box sx={{ flex: '1.2' }}>
            <Typography
              sx={{
                fontFamily: 'var(--font-inter)',
                fontSize: '12px',
                fontWeight: 700,
                color: '#a78bfa',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                display: 'block',
                mb: '12px',
              }}
            >
              About Shirley
            </Typography>

            <Typography
              sx={{
                fontFamily: 'var(--font-playfair)',
                fontSize: { xs: '34px', md: '48px' },
                lineHeight: 1.1,
                mb: '24px',
                fontWeight: 800,
              }}
            >
              CDO.<br />Author.<br />Data Advocate.
            </Typography>

            <Typography
              sx={{ fontFamily: 'var(--font-inter)', fontSize: '16px', lineHeight: 1.7, color: 'rgba(255,255,255,0.8)', mb: '20px' }}
            >
              Shirley Werchota is a trilingual technology executive and Chief Digital Officer with a career spanning Orange Business, Raiffeisenbank International, and Accenture. She builds digital and AI functions from the ground up — and has launched a full technology venture in under six months.
            </Typography>
            <Typography
              sx={{ fontFamily: 'var(--font-inter)', fontSize: '16px', lineHeight: 1.7, color: 'rgba(255,255,255,0.8)', mb: '32px' }}
            >
              A recognised voice at European political and economic forums, she coaches boards on turning AI ambition into executable strategy. And when she's not in the boardroom, she's writing books that teach children the same thing — in a language they understand.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', mb: '32px' }}>
              {TAGS.map((tag) => (
                <Box
                  key={tag}
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    px: '16px',
                    py: '6px',
                    borderRadius: '20px',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#c084fc',
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
              variant="outlined"
              disableElevation
              sx={{
                borderColor: 'rgba(255,255,255,0.4)',
                borderWidth: 2,
                color: '#fff',
                fontFamily: 'var(--font-nunito)',
                fontWeight: 700,
                fontSize: '16px',
                px: '32px',
                py: '14px',
                borderRadius: '30px',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 2 },
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
