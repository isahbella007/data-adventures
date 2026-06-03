'use client';

import { useRef, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import gsap from 'gsap';

interface Props {
  active: boolean;
  onDive: () => void;
  onStay: () => void;
  sx?: any;
}

export default function Scene2DataMirror({ active, onDive, onStay, sx }: Props) {
  const bubble1Ref = useRef<HTMLDivElement>(null);
  const bubble2Ref = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (active && !hasAnimated.current) {
      hasAnimated.current = true;
      gsap.fromTo(
        [bubble1Ref.current, bubble2Ref.current, buttonsRef.current],
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.3, ease: 'back.out(1.4)', delay: 0.3 }
      );
    }
    if (!active) {
      hasAnimated.current = false;
      gsap.set([bubble1Ref.current, bubble2Ref.current, buttonsRef.current], { y: 28, opacity: 0 });
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

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(0,22,80,0.55) 0%, rgba(0,87,255,0.18) 50%, rgba(192,132,252,0.12) 100%)',
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          pb: { xs: 6, md: 7 },
          px: { xs: 3, md: 6 },
          zIndex: 2,
        }}
      >
        {/* Alex's bubble */}
        <Box ref={bubble1Ref} sx={{ opacity: 0, mb: 2, maxWidth: 460, width: '100%', alignSelf: 'flex-start' }}>
          <Box
            sx={{
              display: 'inline-block',
              backgroundColor: 'rgba(255,248,238,0.93)',
              borderRadius: '18px 18px 18px 4px',
              px: 2.5,
              py: 1.4,
              boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            }}
          >
            <Typography sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: { xs: '0.9rem', md: '1rem' }, color: '#030010' }}>
              Alex: "Whoa... is that... me?!"
            </Typography>
          </Box>
        </Box>

        {/* Digital Alex's bubble */}
        <Box ref={bubble2Ref} sx={{ opacity: 0, mb: 3.5, maxWidth: 520, width: '100%', alignSelf: 'flex-end' }}>
          <Box
            sx={{
              display: 'inline-block',
              backgroundColor: 'rgba(0,87,255,0.82)',
              borderRadius: '18px 18px 4px 18px',
              px: 2.5,
              py: 1.4,
              border: '1.5px solid rgba(125,211,252,0.45)',
              boxShadow: '0 4px 24px rgba(0,87,255,0.4)',
            }}
          >
            <Typography sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: { xs: '0.9rem', md: '1rem' }, color: '#fff' }}>
              Digital Alex: "You made it! I'm your digital twin. I need your help — the Data Pirates took D-Teddy! 🧸"
            </Typography>
          </Box>
        </Box>

        {/* Choices */}
        <Box ref={buttonsRef} sx={{ opacity: 0, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            onClick={onStay}
            variant="outlined"
            sx={{
              borderColor: 'rgba(125,211,252,0.35)',
              color: 'rgba(255,255,255,0.55)',
              fontFamily: 'var(--font-nunito)',
              fontWeight: 700,
              fontSize: { xs: '0.8rem', md: '0.88rem' },
              px: 3,
              py: 1.2,
              borderRadius: '50px',
              '&:hover': { borderColor: '#7DD3FC', color: '#7DD3FC' },
            }}
          >
            Stay in the Boring Kitchen
          </Button>
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
