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

const SCENES = 4;

export default function StoryBook() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const kitchenRef = useRef<HTMLDivElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);
  const curtainFiredRef = useRef(false);
  const curtainActiveRef = useRef(false);
  const isJumpingRef = useRef(false);
  const isMirrorActiveRef = useRef(false);
  const [activeScene, setActiveScene] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [curtainActive, setCurtainActive] = useState(false);
  const [isMirrorActive, setIsMirrorActive] = useState(false);
  const activeSceneRef = useRef(0);

  // Synchronous state and ref updater to eliminate frame lag
  const updateActiveScene = useCallback((newScene: number) => {
    setActiveScene(newScene);
    activeSceneRef.current = newScene;
  }, []);

  // Jump to a scene instantly (used under the curtain where the scroll is invisible)
  const jumpToScene = useCallback((index: number) => {
    isJumpingRef.current = true;
    updateActiveScene(index);
    const attempt = () => {
      const st = stRef.current;
      if (!st) {
        setTimeout(attempt, 80);
        return;
      }
      const progress = index / (SCENES - 1);
      window.scrollTo({ top: st.start + progress * (st.end - st.start) });
      setTimeout(() => {
        isJumpingRef.current = false;
      }, 150);
    };
    attempt();
  }, [updateActiveScene]);

  // Stay / Return to Scene 1 transition (covers peak coverage timing)
  const handleStay = useCallback(() => {
    if (curtainFiredRef.current) return;
    curtainFiredRef.current = true;
    curtainActiveRef.current = true;
    setCurtainActive(true);
    setTimeout(() => {
      setIsMirrorActive(false);
      isMirrorActiveRef.current = false;
      gsap.to(kitchenRef.current, { opacity: 1, duration: 1.5, ease: 'power2.inOut' });
      gsap.to(mirrorRef.current, { opacity: 0, duration: 1.5, ease: 'power2.inOut' });
    }, 800);
  }, []);

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

          if (isJumpingRef.current || curtainActiveRef.current) {
            updateActiveScene(newScene);
            return;
          }

          // Intercept manual scrolling forward from Scene 0 to Scene 1
          if (activeSceneRef.current === 0 && !isMirrorActiveRef.current && progress > 0.002) {
            if (!curtainFiredRef.current) {
              fireCurtain();
              self.scroll(self.start);
            }
            return;
          }

          updateActiveScene(newScene);
        },
      };
      gsap.to(strip, { x: () => -(window.innerWidth * (SCENES - 1)), ease: 'none', scrollTrigger: stConfig });
      stRef.current = ScrollTrigger.getAll().at(-1) ?? null;
    }, container);

    return () => {
      stRef.current = null;
      ctx.revert();
    };
  }, [handleStay, updateActiveScene]);

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
    curtainActiveRef.current = true;
    setCurtainActive(true);
    // Cross-fade the views under the curtain (at 800ms)
    setTimeout(() => {
      setIsMirrorActive(true);
      isMirrorActiveRef.current = true;
      gsap.to(kitchenRef.current, { opacity: 0, duration: 1.5, ease: 'power2.inOut' });
      gsap.to(mirrorRef.current, { opacity: 1, duration: 1.5, ease: 'power2.inOut' });
    }, 800);
  }, []);

  // Intercept all wheel and touch interaction on Scene 1 to run the curtain transition
  useEffect(() => {
    if (activeScene !== 0) return;

    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isMirrorActiveRef.current) {
        if (e.deltaY > 0) scrollToScene(1);
        return;
      }
      if (e.deltaY > 0) fireCurtain();
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      if (isMirrorActiveRef.current) {
        if (deltaY > 30) scrollToScene(1);
        return;
      }
      if (deltaY > 30) fireCurtain();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [activeScene, fireCurtain, scrollToScene]);

  // Auto-trigger curtain on Scene 1 after 3s (only when kitchen is showing, not mirror)
  useEffect(() => {
    if (activeScene !== 0 || isMirrorActive) return;
    const timer = setTimeout(fireCurtain, 3000);
    return () => clearTimeout(timer);
  }, [activeScene, fireCurtain, isMirrorActive]);

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
    curtainActiveRef.current = false;
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
          {/* Slide 0: Kitchen & Data Mirror stacked in-place */}
          <Box sx={{ width: '100vw', height: '100vh', position: 'relative', flexShrink: 0, overflow: 'hidden' }}>
            {/* Status Badge */}
            <Box
              sx={{
                position: 'absolute',
                top: 90,
                left: '50%',
                transform: 'translateX(-50%)',
                background: !isMirrorActive ? 'rgba(255, 255, 255, 0.8)' : 'rgba(13, 148, 136, 0.2)',
                border: !isMirrorActive ? 'none' : '1px solid rgba(45, 212, 191, 0.4)',
                color: !isMirrorActive ? '#7c3aed' : '#2dd4bf',
                fontFamily: 'var(--font-nunito)',
                fontWeight: 700,
                fontSize: 13,
                px: 2,
                py: 0.75,
                borderRadius: '20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                zIndex: 30,
                letterSpacing: '0.5px',
                transition: 'all 1s ease',
              }}
            >
              {!isMirrorActive ? "Watching closely..." : "Inside the Data World 🌐"}
            </Box>

            <Box
              ref={kitchenRef}
              sx={{
                position: 'absolute',
                inset: 0,
                zIndex: 10,
                willChange: 'opacity',
              }}
            >
              <Scene1Kitchen />
            </Box>
            <Box
              ref={mirrorRef}
              sx={{
                position: 'absolute',
                inset: 0,
                zIndex: 5,
                opacity: 0,
                willChange: 'opacity',
              }}
            >
              <Scene2DataMirror
                active={isMirrorActive}
                onDive={() => scrollToScene(1)}
              />
            </Box>
          </Box>

          <Scene3Warp active={activeScene === 1} onAdvance={() => scrollToScene(2)} />
          <Scene4CyberTunnel
            active={activeScene === 2}
            gameComplete={gameComplete}
            onGameComplete={() => setGameComplete(true)}
            onAdvance={() => scrollToScene(3)}
          />
          <Scene5CTA unlocked={gameComplete} />
        </Box>
      </Box>
    </>
  );
}
