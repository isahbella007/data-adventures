'use client';

import { useRef, useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import gsap from 'gsap';

interface Props {
  active: boolean;
  gameComplete: boolean;
  onGameComplete: () => void;
  onAdvance: () => void;
}

const RING_COUNT = 8;

const QUESTIONS = [
  {
    q: "Before entering someone's space in the Data Mesh, what should you do?",
    options: ['Ask for permission first', 'Just walk right in'],
    correct: 0,
    feedback: "That's right! Always ask before entering.",
  },
  {
    q: 'A friend shares their private data with you. What do you do?',
    options: ['Keep it safe and private', 'Share it with everyone'],
    correct: 0,
    feedback: 'Exactly! Private data stays private.',
  },
  {
    q: "You get a message you're unsure about. What's the safest move?",
    options: ['Tell a trusted adult', 'Reply straight away'],
    correct: 0,
    feedback: 'Smart! Always check with a grown-up first.',
  },
];

export default function Scene3CyberTunnel({ active, gameComplete, onGameComplete, onAdvance }: Props) {
  const ringsRef = useRef<(HTMLDivElement | null)[]>([]);
  const unicornRef = useRef<HTMLDivElement>(null);
  const tunnelCtxRef = useRef<gsap.Context | null>(null);
  const [step, setStep] = useState(0); // 0=intro, 1-3=questions, 4=complete
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);

  // Tunnel rings animation
  useEffect(() => {
    if (!active) {
      tunnelCtxRef.current?.revert();
      tunnelCtxRef.current = null;
      return;
    }
    const rings = ringsRef.current.filter(Boolean);
    if (!rings.length) return;
    const ctx = gsap.context(() => {
      rings.forEach((ring, i) => {
        gsap.fromTo(
          ring,
          { scale: 0.05, opacity: 0.85 },
          { scale: 9, opacity: 0, duration: 2, ease: 'power1.in', delay: i * (2 / RING_COUNT), repeat: -1 }
        );
      });
    });
    tunnelCtxRef.current = ctx;
    return () => ctx.revert();
  }, [active]);

  // Unicorn slide-in
  useEffect(() => {
    if (active) {
      gsap.fromTo(unicornRef.current, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.65, ease: 'back.out(1.2)', delay: 0.4 });
    } else {
      gsap.set(unicornRef.current, { x: -60, opacity: 0 });
      setStep(0);
      setSelected(null);
      setCorrect(null);
    }
  }, [active]);

  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    const q = QUESTIONS[step - 1];
    const ok = index === q.correct;
    setSelected(index);
    setCorrect(ok);
    if (ok) {
      setTimeout(() => {
        setSelected(null);
        setCorrect(null);
        const next = step + 1;
        setStep(next);
        if (next > QUESTIONS.length) onGameComplete();
      }, 1100);
    } else {
      setTimeout(() => { setSelected(null); setCorrect(null); }, 900);
    }
  };

  const currentQ = step >= 1 && step <= QUESTIONS.length ? QUESTIONS[step - 1] : null;

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
      {/* Tunnel rings */}
      <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        {Array.from({ length: RING_COUNT }).map((_, i) => (
          <Box
            key={i}
            ref={(el) => { ringsRef.current[i] = el as HTMLDivElement | null; }}
            sx={{
              position: 'absolute',
              width: { xs: 110, md: 180 },
              height: { xs: 55, md: 90 },
              borderRadius: '50%',
              border: `2px solid ${i % 2 === 0 ? '#0057FF' : '#C084FC'}`,
              boxShadow: `0 0 14px ${i % 2 === 0 ? 'rgba(0,87,255,0.6)' : 'rgba(192,132,252,0.6)'}`,
            }}
          />
        ))}
      </Box>

      {/* Center glow */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(0,87,255,0.1) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Unicorn guide — left side */}
      <Box
        ref={unicornRef}
        sx={{
          position: 'absolute',
          left: { xs: 14, md: 36 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 4,
          maxWidth: { xs: 190, md: 260 },
          opacity: 0,
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(0,22,80,0.88)',
            border: '1.5px solid rgba(125,211,252,0.35)',
            borderRadius: '16px',
            p: 2,
            backdropFilter: 'blur(12px)',
          }}
        >
          <Typography sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' }, mb: 0.5 }}>🦄</Typography>
          <Typography sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: { xs: '0.82rem', md: '0.9rem' }, color: '#7DD3FC', mb: 0.5 }}>
            Sparkle the Guide
          </Typography>
          <Typography sx={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 400, fontSize: { xs: '0.74rem', md: '0.8rem' }, color: 'rgba(255,255,255,0.8)', lineHeight: 1.4 }}>
            {step === 0 && 'Welcome to the Data Mesh! Before we hunt for D-Teddy, you must learn the Rules of the Realm...'}
            {step >= 1 && step <= QUESTIONS.length && `Question ${step} of ${QUESTIONS.length}`}
            {step > QUESTIONS.length && "Amazing! You've mastered the Rules of the Realm! 🎉"}
          </Typography>
        </Box>
      </Box>

      {/* Game panel — right side */}
      <Box
        sx={{
          position: 'absolute',
          right: { xs: 14, md: 52 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 4,
          width: { xs: 'calc(100vw - 220px)', md: 'min(460px, calc(100vw - 340px))' },
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(0,22,80,0.82)',
            border: '1.5px solid rgba(0,87,255,0.45)',
            borderRadius: '16px',
            p: { xs: 2, md: 3 },
            backdropFilter: 'blur(12px)',
          }}
        >
          {step === 0 && (
            <>
              <Typography sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: { xs: '0.98rem', md: '1.1rem' }, color: '#fff', mb: 1 }}>
                The Rules of the Realm ⚔️
              </Typography>
              <Typography sx={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 400, fontSize: { xs: '0.8rem', md: '0.86rem' }, color: 'rgba(255,255,255,0.72)', mb: 2.5, lineHeight: 1.5 }}>
                In the Data Mesh, every piece of information belongs to someone. To travel safely, you must understand the rules of Consent!
              </Typography>
              <Button
                variant="contained"
                disableElevation
                onClick={() => setStep(1)}
                sx={{
                  backgroundColor: '#0057FF',
                  color: '#fff',
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 700,
                  px: 3,
                  py: 1.1,
                  borderRadius: '50px',
                  boxShadow: '0 0 16px rgba(0,87,255,0.5)',
                  '&:hover': { backgroundColor: '#0043CC', boxShadow: '0 0 28px rgba(0,87,255,0.7)' },
                }}
              >
                I'm ready! Start the quiz →
              </Button>
            </>
          )}

          {currentQ && (
            <>
              <Typography sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: { xs: '0.9rem', md: '1rem' }, color: '#7DD3FC', mb: 2, lineHeight: 1.4 }}>
                {currentQ.q}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {currentQ.options.map((opt, i) => {
                  const isSelected = selected === i;
                  const bg = isSelected ? (correct ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)') : 'rgba(255,255,255,0.06)';
                  const border = isSelected ? (correct ? '1.5px solid #22C55E' : '1.5px solid #EF4444') : '1.5px solid rgba(125,211,252,0.2)';
                  const color = isSelected ? (correct ? '#86EFAC' : '#FCA5A5') : '#fff';
                  return (
                    <Box
                      key={i}
                      onClick={() => handleAnswer(i)}
                      sx={{
                        backgroundColor: bg,
                        border,
                        borderRadius: '12px',
                        px: 2.5,
                        py: 1.4,
                        cursor: selected !== null ? 'default' : 'pointer',
                        transition: 'all 0.18s ease',
                        '&:hover': selected === null ? { backgroundColor: 'rgba(0,87,255,0.15)', border: '1.5px solid rgba(125,211,252,0.6)' } : {},
                      }}
                    >
                      <Typography sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 600, fontSize: { xs: '0.8rem', md: '0.86rem' }, color }}>
                        {opt}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
              {selected !== null && (
                <Typography sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: '0.8rem', color: correct ? '#86EFAC' : '#FCA5A5', mt: 1.5 }}>
                  {correct ? `✅ ${currentQ.feedback}` : '❌ Try again!'}
                </Typography>
              )}
            </>
          )}

          {step > QUESTIONS.length && (
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: '2.2rem', mb: 1 }}>🏆</Typography>
              <Typography sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: { xs: '1rem', md: '1.1rem' }, color: '#7DD3FC', mb: 1 }}>
                Rules Mastered!
              </Typography>
              <Typography sx={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 400, fontSize: { xs: '0.8rem', md: '0.86rem' }, color: 'rgba(255,255,255,0.78)', mb: 2.5, lineHeight: 1.5 }}>
                "Amazing! But the Data Pirates' fortress lies ahead. To rescue D-Teddy, we need the Official Field Guide!"
              </Typography>
              <Button
                variant="contained"
                disableElevation
                onClick={onAdvance}
                sx={{
                  backgroundColor: '#F97316',
                  color: '#fff',
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 800,
                  px: 3,
                  py: 1.1,
                  borderRadius: '50px',
                  boxShadow: '0 0 20px rgba(249,115,22,0.5)',
                  '&:hover': { backgroundColor: '#EA6F0F', boxShadow: '0 0 32px rgba(249,115,22,0.7)' },
                }}
              >
                See the Field Guide! →
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
