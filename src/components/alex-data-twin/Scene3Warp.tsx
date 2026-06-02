'use client';

import { useRef, useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import gsap from 'gsap';

export default function Scene3Warp({ active, onAdvance }: { active: boolean; onAdvance: () => void }) {
  const warpImgRef = useRef<HTMLDivElement>(null);
  const unicornContentRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'warp' | 'land'>('warp');
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (!active) {
      hasPlayed.current = false;
      setPhase('warp');
      gsap.set(warpImgRef.current, { scale: 1, opacity: 1 });
      gsap.set(unicornContentRef.current, { opacity: 0 });
      return;
    }

    if (hasPlayed.current) return;
    hasPlayed.current = true;

    const tl = gsap.timeline();
    tl.to(warpImgRef.current, {
      scale: 9,
      opacity: 0,
      duration: 1.7,
      ease: 'power3.in',
    }).call(() => setPhase('land'))
      .fromTo(
        unicornContentRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'back.out(1.2)' }
      );
  }, [active]);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        flexShrink: 0,
        overflow: 'hidden',
        backgroundColor: '#030010',
      }}
    >
      {/* Warp image — zooms into camera */}
      <Box
        ref={warpImgRef}
        sx={{
          position: 'absolute',
          inset: 0,
          transformOrigin: 'center center',
          zIndex: 1,
        }}
      >
        <Image
          src="/images/data-wrap.jpg"
          alt="Data warp tunnel"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* Blue vortex overlay that intensifies during zoom */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,87,255,0.5) 70%, rgba(0,22,80,0.9) 100%)',
            mixBlendMode: 'multiply',
          }}
        />
      </Box>

      {/* Landing content — fades in after warp */}
      <Box
        ref={unicornContentRef}
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          opacity: 0,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: 3, md: 6 },
          px: { xs: 3, md: 8 },
          pt: 8,
        }}
      >
        {/* Full-screen data mesh background */}
        <Image
          src="/images/unicorn.png"
          alt="Data Mesh"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
        />
        {/* Subtle dark vignette for readability */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'radial-gradient(ellipse at center, rgba(0,22,80,0.35) 0%, rgba(3,0,16,0.55) 100%)',
            pointerEvents: 'none',
          }}
        />
        {/* Unicorn illustration
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            width: { xs: 160, md: 260 },
            height: { xs: 160, md: 260 },
            flexShrink: 0,
            filter: 'drop-shadow(0 0 24px rgba(192,132,252,0.6))',
            animation: 'unicornFloat 3s ease-in-out infinite',
            '@keyframes unicornFloat': {
              '0%,100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-12px)' },
            },
          }}
        >
          <Image src="/images/unicorn.png" alt="Sparkle the Unicorn Guide" fill style={{ objectFit: 'contain' }} />
        </Box> */}

        {/* Dialogue + CTA */}
        <Box sx={{ maxWidth: 480, position: 'relative', zIndex: 2 }}>
          <Box
            sx={{
              backgroundColor: 'rgba(0,22,80,0.85)',
              border: '1.5px solid rgba(192,132,252,0.45)',
              borderRadius: '20px 20px 20px 4px',
              p: { xs: 2.5, md: 3 },
              mb: 3,
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 40px rgba(192,132,252,0.2)',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'var(--font-nunito)',
                fontWeight: 800,
                fontSize: { xs: '0.95rem', md: '1.08rem' },
                color: '#ffffff',
                lineHeight: 1.55,
              }}
            >
              🦄 "Stop right there, traveler! You've entered the Data Mesh. The Data Pirates have D-Teddy locked behind the firewall ahead — but we can't pass without a{' '}
              <Box component="span" sx={{ color: '#C084FC' }}>Privacy Shield!</Box>"
            </Typography>
          </Box>

          <Button
            variant="contained"
            disableElevation
            onClick={onAdvance}
            sx={{
              backgroundColor: '#0057FF',
              color: '#fff',
              fontFamily: 'var(--font-nunito)',
              fontWeight: 800,
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              px: 4,
              py: 1.5,
              borderRadius: '50px',
              boxShadow: '0 0 24px rgba(0,87,255,0.55)',
              animation: 'shieldPulse 2.2s ease-in-out infinite',
              '@keyframes shieldPulse': {
                '0%,100%': { boxShadow: '0 0 24px rgba(0,87,255,0.55)' },
                '50%': { boxShadow: '0 0 44px rgba(0,87,255,0.9), 0 0 80px rgba(192,132,252,0.35)' },
              },
              '&:hover': { backgroundColor: '#0043CC', transform: 'scale(1.04)' },
              transition: 'background-color 0.2s, transform 0.2s',
            }}
          >
            🛡️ Build My Privacy Shield
          </Button>
        </Box>
      </Box>

    </Box>
  );
}
