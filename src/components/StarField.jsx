import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const BASE_COUNT = 140;
const MAX_SHOOTING_STARS = 3;

export default function StarField({ config, offsetX, offsetY }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const shootingStarsRef = useRef([]);
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
      if (rand < 0.55) type = 'dust';
      else if (rand < 0.92) type = 'star';
      else type = 'flare';

      return {
        x: Math.random() * w,
        y: Math.random() * h,
        size: type === 'dust' ? Math.random() * 1.8 + 0.5
            : type === 'star' ? Math.random() * 2.8 + 1.2
            : Math.random() * 3.5 + 2,
        type,
        // More visible drift — diagonal upward-right
        speedX: (Math.random() - 0.2) * 0.4,
        speedY: -(Math.random() * 0.35 + 0.1),
        opacity: Math.random() * 0.7 + 0.2,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.04 + 0.015,
        blur: Math.random() < 0.25,
        hueShift: Math.random() * 40 - 20,
      };
    }

    function createShootingStar(w, h) {
      const startX = Math.random() * w * 0.8;
      const startY = Math.random() * h * 0.5;
      const angle = Math.PI * 0.15 + Math.random() * Math.PI * 0.2; // ~30-60 degrees downward-right
      const speed = 8 + Math.random() * 12;
      return {
        x: startX,
        y: startY,
        angle,
        speed,
        length: 60 + Math.random() * 80,
        life: 1.0,
        decay: 0.008 + Math.random() * 0.012,
        thickness: 1.5 + Math.random() * 1.5,
        hue: 260 + Math.random() * 60,
      };
    }

    // Initialize
    const isMobile = width < 768;
    const countMultiplier = isMobile ? 0.6 : 1;
    const count = Math.floor(BASE_COUNT * countMultiplier * (configRef.current?.starDensity || 1));
    particlesRef.current = Array.from({ length: count }, () => createParticle(width, height));
    shootingStarsRef.current = [];

    let shootingStarTimer = 0;
    let nextShootingStarAt = 120 + Math.random() * 200; // frames until next

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

      // --- Draw stars ---
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
          ? 0.4 + Math.sin(p.twinklePhase) * 0.6
          : p.type === 'flare'
          ? 0.2 + Math.sin(p.twinklePhase * 0.5) * 0.8
          : 0.6 + Math.sin(p.twinklePhase) * 0.4;

        const alpha = p.opacity * twinkle * brightness;

        ctx.save();

        if (p.blur) {
          ctx.filter = 'blur(1px)';
        }

        const baseHue = 270 + (cfg?.progress || 0) * 30 + p.hueShift;
        const saturation = p.type === 'dust' ? 20 : p.type === 'star' ? 45 : 60;
        const lightness = p.type === 'flare' ? 88 : 82;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${baseHue}, ${saturation}%, ${lightness}%, ${alpha})`;
        ctx.fill();

        // Cross sparkle for bright stars
        if (p.type === 'star' && twinkle > 0.7) {
          ctx.strokeStyle = `hsla(${baseHue}, 30%, 90%, ${alpha * 0.4})`;
          ctx.lineWidth = 0.5;
          const sparkSize = p.size * 3;
          ctx.beginPath();
          ctx.moveTo(p.x - sparkSize, p.y);
          ctx.lineTo(p.x + sparkSize, p.y);
          ctx.moveTo(p.x, p.y - sparkSize);
          ctx.lineTo(p.x, p.y + sparkSize);
          ctx.stroke();
        }

        // Bloom for flares
        if (p.type === 'flare' && twinkle > 0.6) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${baseHue}, 50%, 80%, ${alpha * 0.12})`;
          ctx.fill();
        }

        ctx.restore();
      }

      // --- Shooting stars ---
      shootingStarTimer++;
      if (shootingStarTimer >= nextShootingStarAt && shootingStarsRef.current.length < MAX_SHOOTING_STARS) {
        shootingStarsRef.current.push(createShootingStar(width, height));
        shootingStarTimer = 0;
        // More frequent as progress increases
        const freq = cfg?.progress || 0;
        nextShootingStarAt = Math.floor(150 - freq * 80 + Math.random() * 200);
      }

      for (let i = shootingStarsRef.current.length - 1; i >= 0; i--) {
        const s = shootingStarsRef.current[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.life -= s.decay;

        if (s.life <= 0 || s.x > width + 50 || s.y > height + 50) {
          shootingStarsRef.current.splice(i, 1);
          continue;
        }

        // Draw shooting star trail
        const tailX = s.x - Math.cos(s.angle) * s.length * s.life;
        const tailY = s.y - Math.sin(s.angle) * s.length * s.life;

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, `hsla(${s.hue}, 50%, 90%, 0)`);
        grad.addColorStop(0.6, `hsla(${s.hue}, 60%, 90%, ${s.life * 0.4})`);
        grad.addColorStop(1, `hsla(${s.hue}, 40%, 98%, ${s.life * 0.9})`);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.thickness * s.life;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Bright head glow
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.thickness * 2 * s.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 30%, 95%, ${s.life * 0.6})`;
        ctx.fill();

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
