'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import gsap from 'gsap';

const GOOD_PHRASES = ['ASK FIRST', 'GET PERMISSION', 'MY DATA', 'PRIVACY ON', 'SAY YES'];
const BAD_PHRASES = ['NO ASKING', 'SHARE ALL', 'PUBLIC WEB', 'DATA LEAK', 'NO CONSENT'];
const TARGET_SCORE = 100;

interface Bubble {
  id: number;
  text: string;
  isGood: boolean;
  x: number;
  duration: number;
}

export default function Scene3Warp({ active, onAdvance }: { active: boolean; onAdvance: () => void }) {
  const warpRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const victoryUnicornRef = useRef<HTMLDivElement>(null);
  const hasPlayed = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const bubbleIdRef = useRef(0);
  const scoreRef = useRef(0);
  const gameActiveRef = useRef(false);

  const [score, setScore] = useState(0);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  const endGame = useCallback(() => {
    if (!gameActiveRef.current) return;
    gameActiveRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setBubbles([]);

    // Flash the grid
    gsap.to(flashRef.current, { opacity: 1, duration: 0.25, ease: 'power2.out' });
    gsap.to(flashRef.current, { opacity: 0, duration: 0.7, delay: 0.25, ease: 'power2.in' });

    // Unicorn bursts in
    gsap.fromTo(
      victoryUnicornRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.9, ease: 'back.out(1.6)', delay: 0.3 }
    );

    setTimeout(() => onAdvance(), 2800);
  }, [onAdvance]);

  const handleBubbleClick = useCallback((bubble: Bubble) => {
    setBubbles(prev => prev.filter(b => b.id !== bubble.id));

    const newScore = bubble.isGood
      ? Math.min(TARGET_SCORE, scoreRef.current + 25)
      : Math.max(0, scoreRef.current - 15);

    scoreRef.current = newScore;
    setScore(newScore);

    if (!bubble.isGood) {
      gsap.fromTo(
        narrativeRef.current,
        { x: -6 },
        { x: 6, duration: 0.08, repeat: 3, yoyo: true, onComplete: () => gsap.set(narrativeRef.current, { x: 0 }) }
      );
    }

    if (newScore >= TARGET_SCORE) endGame();
  }, [endGame]);

  const spawnBubble = useCallback(() => {
    if (scoreRef.current >= TARGET_SCORE) return;

    const isGood = Math.random() > 0.4;
    const id = bubbleIdRef.current++;
    const duration = 9 + Math.random() * 5;

    const bubble: Bubble = {
      id,
      text: isGood
        ? GOOD_PHRASES[Math.floor(Math.random() * GOOD_PHRASES.length)]
        : BAD_PHRASES[Math.floor(Math.random() * BAD_PHRASES.length)],
      isGood,
      x: Math.random() * 80 + 5,
      duration,
    };

    setBubbles(prev => [...prev, bubble]);

    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== id));
    }, duration * 1000);
  }, []);

  useEffect(() => {
    if (!active) {
      hasPlayed.current = false;
      gameActiveRef.current = false;
      scoreRef.current = 0;
      setScore(0);
      setBubbles([]);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      gsap.set(warpRef.current, { scale: 1, opacity: 1 });
      gsap.set(gameRef.current, { opacity: 0 });
      gsap.set(flashRef.current, { opacity: 0 });
      gsap.set(victoryUnicornRef.current, { scale: 0, opacity: 0 });
      return;
    }

    if (hasPlayed.current) return;
    hasPlayed.current = true;

    gsap.to(warpRef.current, {
      scale: 1.3,
      duration: 1.7,
      ease: 'power3.in',
      onComplete: () => {
        gameActiveRef.current = true;
        gsap.to(gameRef.current, { opacity: 1, duration: 0.8, ease: 'power2.out' });
        spawnBubble();
        intervalRef.current = setInterval(spawnBubble, 900);
      },
    });
  }, [active, spawnBubble]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

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
      {/* Tunnel grid background — zooms in and stays */}
      <Box
        ref={warpRef}
        sx={{ position: 'absolute', inset: 0, transformOrigin: 'center center', zIndex: 1 }}
      >
        <Image
          src="/images/data-wrap.jpg"
          alt="Data mesh network"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,87,255,0.4) 70%, rgba(3,0,16,0.85) 100%)',
          }}
        />
      </Box>

      {/* Victory flash */}
      <Box
        ref={flashRef}
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 50,
          opacity: 0,
          background: 'radial-gradient(ellipse at center, #ffffff 0%, rgba(125,211,252,0.8) 45%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Victory unicorn — full screen burst */}
      <Box
        ref={victoryUnicornRef}
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '80vmin',
            height: '80vmin',
            filter: 'drop-shadow(0 0 60px rgba(168,85,247,0.9)) drop-shadow(0 0 120px rgba(125,211,252,0.5))',
          }}
        >
          <Image src="/images/unicorn.png" alt="Digital Unicorn" fill style={{ objectFit: 'contain' }} />
        </Box>
      </Box>

      {/* Game layer — fades in after warp settles */}
      <Box ref={gameRef} sx={{ position: 'absolute', inset: 0, zIndex: 2, opacity: 0 }}>

        {/* Narrative box — centered at top, no CSS transform so GSAP shake works cleanly */}
        <Box
          ref={narrativeRef}
          sx={{
            position: 'absolute',
            top: { xs: 80, md: 100 },
            left: 0,
            right: 0,
            mx: 'auto',
            width: { xs: '88vw', md: 520 },
            zIndex: 15,
            backgroundColor: 'rgba(3,0,20,0.78)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(125,211,252,0.25)',
            borderRadius: '20px',
            p: { xs: 2.5, md: 3 },
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            textAlign: 'center',
          }}
        >
          <Typography sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: { xs: '1.05rem', md: '1.25rem' }, color: '#7dd3fc', mb: 1 }}>
            Trapped in the Mesh!
          </Typography>
          <Typography sx={{ fontFamily: 'var(--font-nunito)', fontSize: { xs: '0.83rem', md: '0.93rem' }, color: '#cbd5e1', lineHeight: 1.55, mb: 1.5 }}>
            The Pirates have trapped D-Teddy deep in the data net! Tap the safe bubbles to summon the Digital Unicorn and shatter the trap!
          </Typography>

          <Box sx={{ width: '100%', height: 12, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)' }}>
            <Box
              sx={{
                width: `${Math.min(100, (score / TARGET_SCORE) * 100)}%`,
                height: '100%',
                background: 'linear-gradient(to right, #a855f7, #22c55e)',
                borderRadius: '10px',
                transition: 'width 0.3s ease',
              }}
            />
          </Box>
        </Box>

        {/* Floating consent bubbles */}
        {bubbles.map(bubble => (
          <Box
            key={bubble.id}
            onClick={() => handleBubbleClick(bubble)}
            sx={{
              position: 'absolute',
              left: `${bubble.x}%`,
              bottom: '-60px',
              px: '22px',
              py: '11px',
              borderRadius: '50px',
              fontFamily: 'var(--font-nunito)',
              fontWeight: 700,
              fontSize: { xs: '0.8rem', md: '0.92rem' },
              cursor: 'pointer',
              userSelect: 'none',
              color: '#fff',
              whiteSpace: 'nowrap',
              boxShadow: '0 8px 20px rgba(0,0,0,0.35)',
              zIndex: 14,
              animation: `floatUp ${bubble.duration}s linear forwards`,
              '@keyframes floatUp': {
                from: { transform: 'translateX(-50%) translateY(0)' },
                to: { transform: 'translateX(-50%) translateY(-115vh)' },
              },
              '&:active': { filter: 'brightness(1.3)' },
              ...(bubble.isGood
                ? { background: 'linear-gradient(135deg,#0ea5e9,#22c55e)', border: '2px solid #6ee7b7' }
                : { background: 'linear-gradient(135deg,#ef4444,#f97316)', border: '2px solid #fca5a5' }),
            }}
          >
            {bubble.text}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
