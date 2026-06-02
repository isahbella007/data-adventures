'use client';

import { useRef, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import gsap from 'gsap';

export default function Scene4CTA({ unlocked }: { unlocked: boolean }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (unlocked && !hasAnimated.current) {
      hasAnimated.current = true;
      gsap.fromTo(contentRef.current, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: 'back.out(1.2)', delay: 0.2 });
    }
    if (!unlocked) {
      hasAnimated.current = false;
    }
  }, [unlocked]);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        flexShrink: 0,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #030010 0%, #001650 50%, #030010 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* CSS star field */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(125,211,252,0.9) 1px, transparent 0), radial-gradient(rgba(125,211,252,0.5) 0.5px, transparent 0)',
          backgroundSize: '80px 80px, 40px 40px',
          backgroundPosition: '0 0, 20px 20px',
          opacity: 0.18,
          pointerEvents: 'none',
        }}
      />

      {/* Blue glow orb */}
      <Box
        sx={{
          position: 'absolute',
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,87,255,0.22) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      <Box ref={contentRef} sx={{ position: 'relative', zIndex: 2, textAlign: 'center', px: 4, maxWidth: 600, opacity: unlocked ? 1 : 0.4 }}>
        {unlocked ? (
          <>
            <Typography sx={{ fontSize: '3rem', mb: 1.5 }}>🏆</Typography>
            <Typography
              variant="h2"
              sx={{
                fontFamily: 'var(--font-nunito)',
                fontWeight: 900,
                fontSize: { xs: '1.7rem', md: '2.4rem' },
                color: '#fff',
                mb: 1.5,
                lineHeight: 1.2,
              }}
            >
              You've mastered the first rule!
            </Typography>
            <Typography sx={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 400, fontSize: { xs: '0.92rem', md: '1rem' }, color: 'rgba(255,255,255,0.72)', mb: 0.5, lineHeight: 1.6 }}>
              But the Data Pirates' fortress lies ahead...
            </Typography>
            <Typography sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: { xs: '0.92rem', md: '1.05rem' }, color: '#7DD3FC', mb: 3.5, lineHeight: 1.5 }}>
              "To crack their codes and rescue D-Teddy, we need the Official Field Guide!"
            </Typography>

            {/* Book mockup */}
            <Box
              sx={{
                width: 110,
                height: 148,
                mx: 'auto',
                mb: 3.5,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #001650 0%, #0057FF 100%)',
                border: '2px solid rgba(125,211,252,0.5)',
                boxShadow: '0 0 40px rgba(0,87,255,0.45), 0 12px 40px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <Box sx={{ position: 'relative', width: 56, height: 56 }}>
                <Image src="/images/logo.png" alt="D-Teddy" fill style={{ objectFit: 'contain' }} />
              </Box>
            </Box>

            <Button
              variant="contained"
              disableElevation
              href="#"
              sx={{
                backgroundColor: '#F97316',
                color: '#fff',
                fontFamily: 'var(--font-nunito)',
                fontWeight: 800,
                fontSize: { xs: '1rem', md: '1.08rem' },
                px: 5,
                py: 1.8,
                borderRadius: '50px',
                animation: 'ctaPulse 2.5s ease-in-out infinite',
                '@keyframes ctaPulse': {
                  '0%,100%': { boxShadow: '0 0 28px rgba(249,115,22,0.55), 0 8px 32px rgba(249,115,22,0.3)' },
                  '50%': { boxShadow: '0 0 48px rgba(249,115,22,0.85), 0 8px 48px rgba(249,115,22,0.5)' },
                },
                '&:hover': { backgroundColor: '#EA6F0F', transform: 'scale(1.05)' },
                transition: 'background-color 0.2s, transform 0.2s',
              }}
            >
              Get the Official Field Guide! 📖
            </Button>
          </>
        ) : (
          <>
            <Typography sx={{ fontSize: '2.2rem', mb: 1.5 }}>🔒</Typography>
            <Typography sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: { xs: '1.2rem', md: '1.45rem' }, color: 'rgba(255,255,255,0.45)', mb: 1 }}>
              The fortress awaits...
            </Typography>
            <Typography sx={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 400, fontSize: { xs: '0.82rem', md: '0.88rem' }, color: 'rgba(255,255,255,0.3)' }}>
              Complete the Rules of the Realm to unlock this chapter.
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}
