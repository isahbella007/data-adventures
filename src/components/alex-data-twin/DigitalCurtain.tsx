'use client';

import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Box } from '@mui/material';
import gsap from 'gsap';

// Periwinkle → cyan colour palette
const COLORS = ['#c7d2fe', '#a5b4fc', '#818cf8', '#7dd3fc', '#38bdf8', '#bae6fd'];
const FONT_SIZE = 15;
const CHARS = '01';

interface Props {
  active: boolean;
  onComplete: () => void;
}

export default function DigitalCurtain({ active, onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width;
    const H = canvas.height;

    const cols = Math.ceil(W / FONT_SIZE) + 2;
    const rows = Math.ceil(H / FONT_SIZE) + 1;
    const curtainWidth = W * 0.52;

    // Pre-generate characters so they don't flicker each frame
    const grid: string[][] = Array.from({ length: rows }, () =>
      Array.from({ length: cols * 2 }, () => CHARS[Math.floor(Math.random() * 2)])
    );

    const state = { wave: 0, bgOpacity: 0 };

    let raf: number;
    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Cobalt / ultramarine background
      ctx.fillStyle = `rgba(12, 18, 100, ${state.bgOpacity})`;
      ctx.fillRect(0, 0, W, H);

      if (state.bgOpacity < 0.02) {
        raf = requestAnimationFrame(draw);
        return;
      }

      ctx.font = `${FONT_SIZE}px monospace`;

      // leading edge travels from right (W) to off-left (-curtainWidth)
      const totalTravel = W + curtainWidth;
      const leadingEdge = W - state.wave * (totalTravel + curtainWidth * 0.3);

      grid.forEach((rowChars, ri) => {
        // Stagger each row slightly so the front is diagonal (more organic)
        const rowShift = ri * 1.6;
        const rLeading = leadingEdge - rowShift;
        const rTrailing = rLeading - curtainWidth;

        for (let ci = 0; ci < cols; ci++) {
          const x = ci * FONT_SIZE;
          if (x > rLeading || x < rTrailing) continue;

          const t = (rLeading - x) / curtainWidth; // 0 = leading, 1 = trailing
          const alpha = Math.max(0, (1 - t * 1.35)) * 0.82 * state.bgOpacity;
          if (alpha < 0.02) continue;

          const colorIdx = Math.min(Math.floor(t * COLORS.length), COLORS.length - 1);
          ctx.globalAlpha = alpha;
          ctx.fillStyle = COLORS[colorIdx];
          ctx.fillText(rowChars[ci], x, (ri + 1) * FONT_SIZE);
        }
      });

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    // GSAP timeline drives state values; canvas reads them each frame
    const tl = gsap.timeline({
      onComplete: () => {
        cancelAnimationFrame(raf);
        onComplete();
      },
    });

    tl.to(state, { bgOpacity: 0.96, duration: 0.28, ease: 'power2.out' })
      .to(state, { wave: 1, duration: 2.1, ease: 'power1.inOut' }, '<0.05')
      .to(state, { bgOpacity: 0, duration: 0.7, ease: 'power2.in' }, '-=0.55');

    return () => {
      cancelAnimationFrame(raf);
      tl.kill();
    };
  }, [active, onComplete]);

  if (!active) return null;

  return createPortal(
    <Box sx={{ position: 'fixed', inset: 0, zIndex: 100, pointerEvents: 'none' }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </Box>,
    document.body
  );
}
