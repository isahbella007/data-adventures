'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { Box } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scene1Kitchen from './Scene1Kitchen';
import Scene2DataMirror from './Scene2DataMirror';
import Scene3Warp from './Scene3Warp';
import Scene4CyberTunnel from './Scene4CyberTunnel';
import Scene5CTA from './Scene5CTA';
import DigitalCurtain from './DigitalCurtain';

const SCENES = 5;

export default function StoryBook() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const curtainFiredRef = useRef(false);
  const [activeScene, setActiveScene] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [curtainActive, setCurtainActive] = useState(false);

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

  // Jump to a scene instantly (used under the curtain where the scroll is invisible)
  const jumpToScene = useCallback((index: number) => {
    const attempt = () => {
      const st = stRef.current;
      if (!st) { setTimeout(attempt, 80); return; }
      const progress = index / (SCENES - 1);
      window.scrollTo({ top: st.start + progress * (st.end - st.start) });
    };
    attempt();
  }, []);

  // Smooth scroll for button-triggered navigation
  const scrollToScene = useCallback((index: number) => {
    const st = stRef.current;
    if (!st) return;
    const progress = index / (SCENES - 1);
    window.scrollTo({ top: st.start + progress * (st.end - st.start), behavior: 'smooth' });
  }, []);

  // Fire curtain once — either on first wheel/touch or after 3 s
  const fireCurtain = useCallback(() => {
    if (curtainFiredRef.current) return;
    curtainFiredRef.current = true;
    setCurtainActive(true);
    // Scene 2 jumps into position invisibly under the curtain
    setTimeout(() => jumpToScene(1), 60);
  }, [jumpToScene]);

  useEffect(() => {
    const timer = setTimeout(fireCurtain, 3000);
    const onWheel = () => fireCurtain();
    const onTouch = () => fireCurtain();
    window.addEventListener('wheel', onWheel, { once: true, passive: true });
    window.addEventListener('touchstart', onTouch, { once: true, passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouch);
    };
  }, [fireCurtain]);

  const handleCurtainComplete = useCallback(() => {
    setCurtainActive(false);
  }, []);

  return (
    <>
      <DigitalCurtain active={curtainActive} onComplete={handleCurtainComplete} />

      <Box ref={containerRef} sx={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <Box
          ref={stripRef}
          sx={{ display: 'flex', width: `${SCENES * 100}vw`, height: '100%', willChange: 'transform' }}
        >
          <Scene1Kitchen />
          <Scene2DataMirror
            active={activeScene === 1}
            onDive={() => scrollToScene(2)}
            onStay={() => scrollToScene(0)}
          />
          <Scene3Warp active={activeScene === 2} onAdvance={() => scrollToScene(3)} />
          <Scene4CyberTunnel
            active={activeScene === 3}
            gameComplete={gameComplete}
            onGameComplete={() => setGameComplete(true)}
            onAdvance={() => scrollToScene(4)}
          />
          <Scene5CTA unlocked={gameComplete} />
        </Box>
      </Box>
    </>
  );
}
