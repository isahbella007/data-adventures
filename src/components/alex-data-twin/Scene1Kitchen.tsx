'use client';

import { useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import gsap from 'gsap';

export default function Scene1Kitchen({ onTabletClick }: { onTabletClick: () => void }) {
  const tabletRef = useRef<HTMLDivElement>(null);
  const [zooming, setZooming] = useState(false);

  const handleClick = () => {
    if (zooming) return;
    setZooming(true);
    gsap.to(tabletRef.current, {
      scale: 30,
      duration: 0.7,
      ease: 'power3.in',
      onComplete: () => {
        onTabletClick();
        setTimeout(() => {
          gsap.set(tabletRef.current, { clearProps: 'transform' });
          setZooming(false);
        }, 1500);
      },
    });
  };

  return (
    <Box sx={{ width: '100vw', height: '100vh', position: 'relative', flexShrink: 0, overflow: 'hidden' }}>
      <Image
        src="/images/kitchen-real.png"
        alt="Alex in the kitchen"
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        priority
      />

      {/* Warm bottom gradient for text legibility */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(61,26,0,0.65) 0%, transparent 55%)',
          pointerEvents: 'none',
        }}
      />

      {/* Caption */}
      <Box sx={{ position: 'absolute', bottom: { xs: 72, md: 56 }, left: 0, right: 0, textAlign: 'center', zIndex: 2, px: 3 }}>
        <Typography
          sx={{
            fontFamily: 'var(--font-nunito)',
            fontWeight: 800,
            fontSize: { xs: '1.05rem', md: '1.35rem' },
            color: '#FFF8EE',
            textShadow: '0 2px 12px rgba(0,0,0,0.5)',
          }}
        >
          One ordinary morning, Alex noticed something strange on the kitchen table...
        </Typography>
      </Box>

      {/* Glowing tablet */}
      <Box
        ref={tabletRef}
        onClick={handleClick}
        sx={{
          position: 'absolute',
          bottom: '28%',
          right: '28%',
          width: { xs: 68, md: 100 },
          height: { xs: 92, md: 136 },
          borderRadius: '10px',
          border: '2px solid rgba(0,87,255,0.75)',
          backgroundColor: 'rgba(0,87,255,0.08)',
          cursor: 'pointer',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 0.5,
          transformOrigin: 'center center',
          transition: 'transform 0.2s ease',
          animation: 'tabletPulse 2s ease-in-out infinite',
          '@keyframes tabletPulse': {
            '0%,100%': { boxShadow: '0 0 12px rgba(0,87,255,0.5), 0 0 24px rgba(0,87,255,0.2)' },
            '50%': { boxShadow: '0 0 28px rgba(0,87,255,0.9), 0 0 56px rgba(125,211,252,0.5)' },
          },
          '&:hover': { transform: 'scale(1.08)' },
        }}
      >
        <Box sx={{ fontSize: { xs: '1.2rem', md: '1.6rem' } }}>💻</Box>
        <Typography sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: '0.52rem', color: '#7DD3FC', letterSpacing: '0.06em' }}>
          TAP ME
        </Typography>
      </Box>

      {/* Floating hint */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '22%',
          right: '22%',
          zIndex: 3,
          animation: 'hintFloat 2.5s ease-in-out infinite',
          '@keyframes hintFloat': {
            '0%,100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-6px)' },
          },
        }}
      >
        <Typography sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: '0.72rem', color: '#7DD3FC', textShadow: '0 0 8px rgba(0,87,255,0.7)' }}>
          ✨ tap the tablet
        </Typography>
      </Box>
    </Box>
  );
}
