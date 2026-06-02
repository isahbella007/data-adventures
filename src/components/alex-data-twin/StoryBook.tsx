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

  // Keep a ref to the active scene to prevent stale closures in GSAP callbacks
  const activeSceneRef = useRef(0);
  useEffect(() => {
    activeSceneRef.current = activeScene;
  }, [activeScene]);

  // Jump to a scene instantly (used under the curtain where the scroll is invisible)
  const jumpToScene = useCallback((index: number) => {
    const attempt = () => {
      const st = stRef.current;
      if (!st) {
        setTimeout(attempt, 80);
        return;
      }
      const progress = index / (SCENES - 1);
      window.scrollTo({ top: st.start + progress * (st.end - st.start) });
    };
    attempt();
  }, []);

  // Stay / Return to Scene 1 transition (covers peak coverage timing)
  const handleStay = useCallback(() => {
    if (curtainFiredRef.current) return;
    curtainFiredRef.current = true;
    setCurtainActive(true);
    setTimeout(() => {
      jumpToScene(0);
    }, 600); // 600ms matches when DigitalCurtain is fully opaque
  }, [jumpToScene]);

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
          const progress = self.progress;
          const newScene = Math.min(Math.floor(progress * SCENES), SCENES - 1);

          // Intercept manual scrolling forward from Scene 0 to Scene 1
          if (activeSceneRef.current === 0 && progress > 0.005) {
            if (!curtainFiredRef.current) {
              fireCurtain();
              self.scroll(self.start);
            }
            return;
          }

          // Intercept manual scrolling back from Scene 1 to Scene 0
          if (activeSceneRef.current === 1 && progress < 0.205) {
            if (!curtainFiredRef.current) {
              handleStay();
              self.scroll(self.start + 0.2 * (self.end - self.start));
            }
            return;
          }

          setActiveScene(newScene);
        },
      };
      gsap.to(strip, { x: () => -(window.innerWidth * (SCENES - 1)), ease: 'none', scrollTrigger: stConfig });
      stRef.current = ScrollTrigger.getAll().at(-1) ?? null;
    }, container);

    return () => {
      stRef.current = null;
      ctx.revert();
    };
  }, [handleStay]);

  // Smooth scroll for button-triggered navigation
  const scrollToScene = useCallback((index: number) => {
    const st = stRef.current;
    if (!st) return;
    const progress = index / (SCENES - 1);
    window.scrollTo({ top: st.start + progress * (st.end - st.start), behavior: 'smooth' });
  }, []);

  // Fire curtain transition — either on first wheel/touch or after 3 s
  const fireCurtain = useCallback(() => {
    if (curtainFiredRef.current) return;
    curtainFiredRef.current = true;
    setCurtainActive(true);
    // Scene 2 jumps into position invisibly under the curtain (at 600ms)
    setTimeout(() => {
      jumpToScene(1);
    }, 600);
  }, [jumpToScene]);

  // Intercept all wheel and touch interaction on Scene 1 to run the curtain transition
  useEffect(() => {
    if (activeScene !== 0) return;

    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        fireCurtain();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY; // swipe up / scroll down
      if (deltaY > 30) {
        fireCurtain();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [activeScene, fireCurtain]);

  // Auto-trigger curtain on Scene 1 after 3s
  useEffect(() => {
    if (activeScene !== 0) return;
    const timer = setTimeout(fireCurtain, 3000);
    return () => clearTimeout(timer);
  }, [activeScene, fireCurtain]);

  // Block scroll events globally while the curtain animation is active
  useEffect(() => {
    if (!curtainActive) return;
    const preventDefault = (e: Event) => e.preventDefault();
    window.addEventListener('wheel', preventDefault, { passive: false });
    window.addEventListener('touchmove', preventDefault, { passive: false });
    return () => {
      window.removeEventListener('wheel', preventDefault);
      window.removeEventListener('touchmove', preventDefault);
    };
  }, [curtainActive]);

  const handleCurtainComplete = useCallback(() => {
    setCurtainActive(false);
    curtainFiredRef.current = false;
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
            onStay={handleStay}
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
