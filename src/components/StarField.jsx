import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const BASE_COUNT = 120;

export default function StarField({ config, offsetX, offsetY }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const configRef = useRef(config);

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);

    function createParticle(w, h) {
      const rand = Math.random();
      let type;
      if (rand < 0.6) type = 'dust';
      else if (rand < 0.95) type = 'star';
      else type = 'flare';

      return {
        x: Math.random() * w,
        y: Math.random() * h,
        size: type === 'dust' ? Math.random() * 1.5 + 0.5
            : type === 'star' ? Math.random() * 2.5 + 1
            : Math.random() * 3 + 2,
        type,
        speedX: (Math.random() - 0.3) * 0.25, // slight diagonal drift
        speedY: -(Math.random() * 0.2 + 0.05),
        opacity: Math.random() * 0.6 + 0.2,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        blur: Math.random() < 0.3, // 30% get depth blur
        hueShift: Math.random() * 40 - 20, // -20 to +20 from base
      };
    }

    // Initialize
    const isMobile = width < 768;
    const countMultiplier = isMobile ? 0.6 : 1;
    const count = Math.floor(BASE_COUNT * countMultiplier * (configRef.current?.starDensity || 1));
    particlesRef.current = Array.from({ length: count }, () => createParticle(width, height));

    function animate() {
      const cfg = configRef.current;
      const density = cfg?.starDensity || 1;
      const brightness = cfg?.starBrightness || 0.7;
      const sparkleRate = cfg?.sparkleRate || 0.5;

      ctx.clearRect(0, 0, width, height);

      // Adjust particle count dynamically
      const targetCount = Math.floor(BASE_COUNT * countMultiplier * density);
      while (particlesRef.current.length < targetCount) {
        particlesRef.current.push(createParticle(width, height));
      }

      for (const p of particlesRef.current) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.twinklePhase += p.twinkleSpeed * sparkleRate;

        // Wrap
        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Twinkle
        const twinkle = p.type === 'star'
          ? 0.5 + Math.sin(p.twinklePhase) * 0.5
          : p.type === 'flare'
          ? 0.3 + Math.sin(p.twinklePhase * 0.5) * 0.7
          : 0.7 + Math.sin(p.twinklePhase) * 0.3;

        const alpha = p.opacity * twinkle * brightness;

        ctx.save();

        if (p.blur) {
          ctx.filter = 'blur(1px)';
        }

        // Color: purple-white spectrum with hue shift based on progress
        const baseHue = 270 + (cfg?.progress || 0) * 30 + p.hueShift;
        const saturation = p.type === 'dust' ? 20 : p.type === 'star' ? 40 : 60;
        const lightness = p.type === 'flare' ? 85 : 80;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${baseHue}, ${saturation}%, ${lightness}%, ${alpha})`;
        ctx.fill();

        // Bloom for flares
        if (p.type === 'flare' && twinkle > 0.7) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${baseHue}, 50%, 80%, ${alpha * 0.15})`;
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{
        x: offsetX,
        y: offsetY,
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
}
