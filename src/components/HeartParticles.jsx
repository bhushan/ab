import { useEffect, useRef } from 'react';

const HEART_CHARS = ['♥', '♡', '❤', '💕', '✦', '·'];
const PARTICLE_COUNT = 35;

export default function HeartParticles({ intensity = 1 }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);

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

    // Initialize particles
    const count = Math.floor(PARTICLE_COUNT * intensity);
    particlesRef.current = Array.from({ length: count }, () => createParticle(width, height));

    function createParticle(w, h) {
      const isHeart = Math.random() > 0.5;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        size: isHeart ? Math.random() * 14 + 8 : Math.random() * 3 + 1,
        char: isHeart
          ? HEART_CHARS[Math.floor(Math.random() * 4)]
          : HEART_CHARS[4 + Math.floor(Math.random() * 2)],
        speedY: -(Math.random() * 0.5 + 0.15),
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.1,
        targetOpacity: Math.random() * 0.4 + 0.1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        pulse: Math.random() * Math.PI * 2,
        isHeart,
      };
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (const p of particlesRef.current) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.pulse += 0.02;
        p.opacity += (p.targetOpacity - p.opacity) * 0.01;

        // Wrap around
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // Gentle pulsing
        const pulseScale = 1 + Math.sin(p.pulse) * 0.15;
        const size = p.size * pulseScale;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity * intensity;

        if (p.isHeart) {
          ctx.font = `${size}px serif`;
          ctx.fillStyle = `rgba(244, 63, 94, ${p.opacity})`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.char, 0, 0);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(253, 164, 175, ${p.opacity * 0.6})`;
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
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
