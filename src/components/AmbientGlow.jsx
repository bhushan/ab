import { useRef, useEffect } from 'react';

export default function AmbientGlow({ mouseX, mouseY, config }) {
  const glowRef = useRef(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    const unsubX = mouseX.on('change', (x) => {
      el.style.left = `${x * 100}%`;
    });
    const unsubY = mouseY.on('change', (y) => {
      el.style.top = `${y * 100}%`;
    });

    return () => {
      unsubX();
      unsubY();
    };
  }, [mouseX, mouseY]);

  const hue = 270 + config.progress * 30;
  const opacity = 0.04 + config.lightIntensity * 0.04;

  return (
    <div
      ref={glowRef}
      className="absolute pointer-events-none"
      style={{
        width: '40vw',
        height: '40vw',
        maxWidth: '500px',
        maxHeight: '500px',
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, hsla(${hue}, 50%, 60%, ${opacity}) 0%, transparent 70%)`,
        filter: 'blur(30px)',
        transition: 'background 1.5s ease',
        willChange: 'left, top',
      }}
      aria-hidden="true"
    />
  );
}
