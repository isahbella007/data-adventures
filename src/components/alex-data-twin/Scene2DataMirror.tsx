'use client';

import { useRef, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import gsap from 'gsap';

interface Props {
  active: boolean;
  onDive: () => void;
  sx?: any;
}

export default function Scene2DataMirror({ active, onDive, sx }: Props) {
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (active && !hasAnimated.current) {
      hasAnimated.current = true;
      gsap.fromTo(
        [textRef.current, buttonRef.current],
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.3, ease: 'back.out(1.4)', delay: 0.3 }
      );
    }
    if (!active) {
      hasAnimated.current = false;
      gsap.set([textRef.current, buttonRef.current], { y: 28, opacity: 0 });
    }
  }, [active]);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        flexShrink: 0,
        overflow: 'hidden',
        ...sx,
      }}
    >
      <Image src="/images/kitchen-data-mirror.png" alt="The Data Mirror World" fill style={{ objectFit: 'cover' }} />

      {/* Story overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: { xs: '40px 24px', md: '60px 40px' },
          background: 'linear-gradient(to top, rgba(3,0,25,0.85) 0%, rgba(3,0,25,0) 50%)',
          transition: 'background 1.5s ease',
        }}
      >
        {/* Text content */}
        <Box ref={textRef} sx={{ opacity: 0, maxWidth: 600, mx: 'auto', textAlign: 'center', mb: '24px' }}>
          <Typography
            sx={{
              fontFamily: 'var(--font-nunito)',
              fontSize: 'clamp(32px, 5vw, 54px)',
              fontWeight: 800,
              lineHeight: 1.1,
              mb: '12px',
            }}
          >
            <Box component="span" sx={{ color: '#0ea5e9', textShadow: '0 0 20px rgba(14,165,233,0.3)', display: 'block' }}>
              Welcome to the
            </Box>
            <Box component="span" sx={{ color: '#fff', display: 'block' }}>
              Data World
            </Box>
          </Typography>
          <Typography
            sx={{
              fontFamily: 'var(--font-nunito)',
              fontSize: 'clamp(15px, 2.5vw, 19px)',
              color: '#dde2e9ff',
              fontWeight: 600,
              lineHeight: 1.6,
            }}
          >
            Alex steps through — and everything turns electric blue. He meets his twin, DigiAlex, who reveals a shocking missing-person mystery.
          </Typography>
        </Box>

        {/* CTA button */}
        <Box ref={buttonRef} sx={{ opacity: 0, textAlign: 'center' }}>
          <Button
            onClick={onDive}
            variant="contained"
            disableElevation
            sx={{
              backgroundColor: '#F97316',
              color: '#fff',
              fontFamily: 'var(--font-nunito)',
              fontWeight: 800,
              fontSize: { xs: '0.85rem', md: '0.95rem' },
              px: 3.5,
              py: 1.2,
              borderRadius: '50px',
              boxShadow: '0 0 20px rgba(249,115,22,0.5)',
              transition: 'all 0.2s ease',
              '&:hover': { backgroundColor: '#EA6F0F', boxShadow: '0 0 32px rgba(249,115,22,0.7)', transform: 'scale(1.04)' },
            }}
          >
            Dive into the Data Mesh! 🚀
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
