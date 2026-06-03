'use client';

import { useRef, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import gsap from 'gsap';

const CONFETTI_COLORS = ['#a855f7', '#22c55e', '#7dd3fc', '#f97316', '#fbbf24', '#ec4899'];

export default function Scene5CTA({ unlocked }: { unlocked: boolean }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasAnimated = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (unlocked && !hasAnimated.current) {
      hasAnimated.current = true;

      gsap.fromTo(
        contentRef.current,
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: 'back.out(1.2)', delay: 0.2 }
      );

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d')!;
      const W = (canvas.width = window.innerWidth);
      const H = (canvas.height = window.innerHeight);

      const particles = Array.from({ length: 120 }, () => ({
        x: W / 2,
        y: H / 2,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        radius: Math.random() * 4 + 2,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.6) * 14,
        gravity: 0.25,
        opacity: 1,
      }));

      function draw() {
        ctx.clearRect(0, 0, W, H);
        let alive = false;

        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity;
          p.opacity -= 0.012;

          if (p.opacity > 0) {
            alive = true;
            ctx.globalAlpha = p.opacity;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
          }
        });

        ctx.globalAlpha = 1;
        if (alive) {
          rafRef.current = requestAnimationFrame(draw);
        } else {
          ctx.clearRect(0, 0, W, H);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    if (!unlocked) {
      hasAnimated.current = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [unlocked]);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        flexShrink: 0,
        overflow: 'hidden',
        background: 'radial-gradient(circle at center, #1e1b4b 0%, #030010 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Confetti canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 25,
          pointerEvents: 'none',
        }}
      />

      {/* CTA card */}
      <Box
        ref={contentRef}
        sx={{
          position: 'relative',
          zIndex: 20,
          textAlign: 'center',
          maxWidth: 650,
          px: { xs: 3, md: 5 },
          py: 5,
          opacity: 0,
        }}
      >
        {unlocked ? (
          <>
            <Typography
              sx={{
                fontFamily: 'var(--font-nunito)',
                color: '#a855f7',
                fontWeight: 700,
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                mb: '10px',
              }}
            >
              ✨ The Shield Activates!
            </Typography>

            <Typography
              sx={{
                fontFamily: 'var(--font-nunito)',
                fontSize: 'clamp(36px, 6vw, 52px)',
                lineHeight: 1.1,
                fontWeight: 800,
                color: '#fff',
                mb: '16px',
              }}
            >
              Will Alex & DigiAlex
              <br />
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(to right, #7dd3fc, #c084fc)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                save D-Teddy?
              </Box>
            </Typography>

            <Typography
              sx={{
                fontFamily: 'var(--font-nunito)',
                color: '#94a3b8',
                fontSize: { xs: '0.95rem', md: '18px' },
                lineHeight: 1.6,
                mb: '30px',
              }}
            >
              A magical adventure story where children discover real digital world safety lessons — through playful code swarms, data meshes, and one very important teddy bear.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                disableElevation
                href="#"
                sx={{
                  background: 'linear-gradient(135deg, #6d28d9, #a855f7)',
                  color: '#fff',
                  fontFamily: 'var(--font-nunito)',
                  fontSize: '16px',
                  fontWeight: 700,
                  px: '36px',
                  py: '14px',
                  borderRadius: '30px',
                  boxShadow: '0 4px 20px rgba(139,92,246,0.4)',
                  '&:hover': { opacity: 0.9, transform: 'scale(1.03)' },
                  transition: 'all 0.2s',
                }}
              >
                🚀 Get the Physical Book
              </Button>
              <Button
                variant="outlined"
                href="#"
                sx={{
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontFamily: 'var(--font-nunito)',
                  fontSize: '16px',
                  fontWeight: 700,
                  px: '36px',
                  py: '14px',
                  borderRadius: '30px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  '&:hover': { background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)' },
                  transition: 'all 0.2s',
                }}
              >
                📖 Read a Free Preview
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography sx={{ fontSize: '2.2rem', mb: 1.5 }}>🔒</Typography>
            <Typography sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: { xs: '1.2rem', md: '1.45rem' }, color: 'rgba(255,255,255,0.45)', mb: 1 }}>
              The fortress awaits...
            </Typography>
            <Typography sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 400, fontSize: { xs: '0.82rem', md: '0.88rem' }, color: 'rgba(255,255,255,0.3)' }}>
              Complete the consent game to unlock this chapter.
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}
