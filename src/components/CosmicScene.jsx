import { useRef, useEffect, useCallback } from 'react';
import { useMotionValue, useTransform, useSpring } from 'framer-motion';
import CosmicBackground from './CosmicBackground';
import StarField from './StarField';
import MoonOrb from './MoonOrb';
import GirlSilhouette from './GirlSilhouette';
import NebulaCurtains from './NebulaCurtains';
import AmbientGlow from './AmbientGlow';

export default function CosmicScene({ config }) {
  const containerRef = useRef(null);

  // Mouse position as motion values (no re-renders)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth spring for mouse movement
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  // Parallax offsets per layer (different multipliers)
  const bgOffsetX = useTransform(smoothX, [0, 1], [5, -5]);
  const bgOffsetY = useTransform(smoothY, [0, 1], [5, -5]);
  const starOffsetX = useTransform(smoothX, [0, 1], [15, -15]);
  const starOffsetY = useTransform(smoothY, [0, 1], [15, -15]);
  const moonOffsetX = useTransform(smoothX, [0, 1], [8, -8]);
  const moonOffsetY = useTransform(smoothY, [0, 1], [8, -8]);
  const girlOffsetX = useTransform(smoothX, [0, 1], [-3, 3]); // inverse

  // Check for touch device
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isTouchDevice.current) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, [mouseX, mouseY]);

  // Gentle auto-sway for mobile
  useEffect(() => {
    if (!isTouchDevice.current) return;
    let frame;
    let t = 0;
    const sway = () => {
      t += 0.008;
      mouseX.set(0.5 + Math.sin(t) * 0.15);
      mouseY.set(0.5 + Math.cos(t * 0.7) * 0.1);
      frame = requestAnimationFrame(sway);
    };
    // Delay check - might not be set on first render
    const timeout = setTimeout(() => {
      if (isTouchDevice.current) sway();
    }, 100);
    return () => {
      clearTimeout(timeout);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      onMouseMove={handleMouseMove}
      style={{ pointerEvents: 'auto', zIndex: 0 }}
      aria-hidden="true"
    >
      <CosmicBackground
        config={config}
        offsetX={bgOffsetX}
        offsetY={bgOffsetY}
      />
      <StarField
        config={config}
        offsetX={starOffsetX}
        offsetY={starOffsetY}
      />
      <NebulaCurtains config={config} />
      <MoonOrb
        config={config}
        offsetX={moonOffsetX}
        offsetY={moonOffsetY}
      />
      <GirlSilhouette
        config={config}
        offsetX={girlOffsetX}
      />
      <AmbientGlow
        mouseX={smoothX}
        mouseY={smoothY}
        config={config}
      />
    </div>
  );
}
