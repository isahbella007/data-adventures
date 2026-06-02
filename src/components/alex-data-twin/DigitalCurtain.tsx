'use client';

import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Box } from '@mui/material';
import gsap from 'gsap';

const COLORS = ['#c7d2fe', '#a5b4fc', '#818cf8', '#7dd3fc', '#38bdf8', '#bae6fd'];
const CHARS = '01';

interface Props {
  active: boolean;
  onComplete: () => void;
}

interface Particle {
  char: string;
  fontSize: number;
  color: string;
  startX: number;
  y: number;
  speedMultiplier: number;
  waveFrequency: number;
  waveAmplitude: number;
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

    // Kept the scattered particle count but prepared them for a slower journey
    const particleCount = 400; 
    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      return {
        char: CHARS[Math.floor(Math.random() * 2)],
        fontSize: Math.floor(Math.random() * 12) + 12,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        // Stretched the starting distribution further right so they enter gradually
        startX: W + Math.random() * (W * 1.5), 
        y: Math.random() * H,
        // LOWERED SPEEDS: Lower multipliers make them glide gently
        speedMultiplier: 0.3 + Math.random() * 0.4, 
        waveFrequency: 0.003 + Math.random() * 0.005, 
        waveAmplitude: 20 + Math.random() * 20, 
      };
    });

    const state = { progress: 0, bgOpacity: 0 };

    let raf: number;
    function draw() {
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = `rgba(12, 18, 100, ${state.bgOpacity})`;
      ctx.fillRect(0, 0, W, H);

      // Increased total distance because the swarm is spread wider
      const totalDistance = W * 3.0; 

      particles.forEach((p) => {
        const currentX = p.startX - (state.progress * totalDistance * p.speedMultiplier);
        const currentY = p.y + Math.sin(currentX * p.waveFrequency) * p.waveAmplitude;

        let alpha = 1;
        if (currentX < W * 0.15) alpha = currentX / (W * 0.15); 
        if (alpha < 0) alpha = 0;

        ctx.globalAlpha = alpha * Math.min(1, state.bgOpacity * 1.5);
        ctx.font = `bold ${p.fontSize}px monospace`;
        ctx.fillStyle = p.color;
        ctx.fillText(p.char, currentX, currentY);
      });

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    const tl = gsap.timeline({
      onComplete: () => {
        cancelAnimationFrame(raf);
        onComplete();
      },
    });

    // SLOWED TIMELINE: Pushed durations up significantly
    tl.to(state, { 
        bgOpacity: 0.95, 
        duration: 0.8, // Slower background fade-in
        ease: 'power2.out' 
      })
      .to(state, { 
        progress: 1, 
        duration: 4.8, // Bumping from 2.5s to nearly 5 seconds for a lazy drift
        ease: 'power1.inOut' 
      }, '<0.1')
      .to(state, { 
        bgOpacity: 0, 
        duration: 1.2, // Soft, gradual fade out at the end to reveal the mirror world
        ease: 'power2.in' 
      }, '-=1.4'); // Begins fading out while the trailing particles pass

    return () => {
      cancelAnimationFrame(raf);
      tl.kill();
    };
  }, [active, onComplete]);

  if (!active) return null;

  return createPortal(
    <Box sx={{ position: 'fixed', inset: 0, zIndex: 100, pointerEvents: active ? 'auto' : 'none' }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </Box>,
    document.body
  );
}