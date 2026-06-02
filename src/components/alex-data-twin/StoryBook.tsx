'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { Box } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scene1Kitchen from './Scene1Kitchen';
import Scene2DataMirror from './Scene2DataMirror';
import Scene3CyberTunnel from './Scene3CyberTunnel';
import Scene4CTA from './Scene4CTA';


const SCENES = 4;

export default function StoryBook() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [activeScene, setActiveScene] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const strip = stripRef.current;
    if (!container || !strip) return;

    const ctx = gsap.context(() => {
      const stConfig: ScrollTrigger.Vars = {
        trigger: container,
        pin: true,
        scrub: 1,
        end: () => `+=${window.innerWidth * (SCENES - 1)}`,
        invalidateOnRefresh: true,
        onUpdate(self: ScrollTrigger) {
          setActiveScene(Math.min(Math.floor(self.progress * SCENES), SCENES - 1));
        },
      };
      gsap.to(strip, { x: () => -(window.innerWidth * (SCENES - 1)), ease: 'none', scrollTrigger: stConfig });
      stRef.current = ScrollTrigger.getAll().at(-1) ?? null;
    }, container);

    return () => {
      stRef.current = null;
      ctx.revert();
    };
  }, []);

  const scrollToScene = useCallback((index: number) => {
    const st = stRef.current;
    if (!st) return;
    const progress = SCENES > 1 ? index / (SCENES - 1) : 0;
    const scrollPos = st.start + progress * (st.end - st.start);
    window.scrollTo({ top: scrollPos, behavior: 'smooth' });
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
    >
      <Box
        ref={stripRef}
        sx={{
          display: 'flex',
          width: `${SCENES * 100}vw`,
          height: '100%',
          willChange: 'transform',
        }}
      >
        <Scene1Kitchen onTabletClick={() => scrollToScene(1)} />
        <Scene2DataMirror
          active={activeScene === 1}
          onDive={() => scrollToScene(2)}
          onStay={() => scrollToScene(0)}
        />
        <Scene3CyberTunnel
          active={activeScene === 2}
          gameComplete={gameComplete}
          onGameComplete={() => setGameComplete(true)}
          onAdvance={() => scrollToScene(3)}
        />
        <Scene4CTA unlocked={gameComplete} />
      </Box>
    </Box>
  );
}
