import { useEffect, useRef } from 'react';

// Simple bird as two curved wing strokes
function drawBird(ctx, x, y, size, flapPhase, alpha) {
  const wingAngle = Math.sin(flapPhase) * 0.4; // wing flap range
  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = `rgba(200, 180, 230, ${alpha})`;
  ctx.lineWidth = 1.2;
  ctx.lineCap = 'round';

  // Left wing
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(
    -size * 0.5, -size * (0.4 + wingAngle),
    -size, -size * (0.1 + wingAngle * 0.5)
  );
  ctx.stroke();

  // Right wing
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(
    size * 0.5, -size * (0.4 + wingAngle),
    size, -size * (0.1 + wingAngle * 0.5)
  );
  ctx.stroke();

  ctx.restore();
}

const FLOCK_COUNT = 2; // Number of flocks visible at a time

export default function FlyingBirds({ config }) {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const flocksRef = useRef([]);
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

    function createFlock(w, h) {
      const birdCount = 3 + Math.floor(Math.random() * 5); // 3-7 birds
      const startX = -60 - Math.random() * 100;
      const startY = h * (0.1 + Math.random() * 0.35); // upper portion of sky
      const speed = 0.3 + Math.random() * 0.5;
      const direction = Math.random() > 0.3 ? 1 : -1; // mostly left-to-right

      return {
        birds: Array.from({ length: birdCount }, (_, i) => ({
          // V-formation offset
          offsetX: (i - Math.floor(birdCount / 2)) * (12 + Math.random() * 8) * direction,
          offsetY: Math.abs(i - Math.floor(birdCount / 2)) * (6 + Math.random() * 4),
          flapPhase: Math.random() * Math.PI * 2,
          flapSpeed: 0.06 + Math.random() * 0.03,
          size: 5 + Math.random() * 4,
        })),
        x: direction === 1 ? startX : w + 60 + Math.random() * 100,
        y: startY,
        speed,
        direction,
        driftY: (Math.random() - 0.5) * 0.08, // gentle vertical drift
        opacity: 0, // fade in
        fadeState: 'in',
      };
    }

    // Start with flocks at different progress levels
    flocksRef.current = Array.from({ length: FLOCK_COUNT }, () => {
      const f = createFlock(width, height);
      f.x = width * (0.2 + Math.random() * 0.6) * f.direction;
      f.opacity = 0.3 + Math.random() * 0.3;
      f.fadeState = 'visible';
      return f;
    });

    let spawnTimer = 0;
    let nextSpawnAt = 300 + Math.random() * 400;

    function animate() {
      ctx.clearRect(0, 0, width, height);

      spawnTimer++;
      if (spawnTimer >= nextSpawnAt && flocksRef.current.length < FLOCK_COUNT + 1) {
        flocksRef.current.push(createFlock(width, height));
        spawnTimer = 0;
        nextSpawnAt = 400 + Math.random() * 500;
      }

      for (let fi = flocksRef.current.length - 1; fi >= 0; fi--) {
        const flock = flocksRef.current[fi];

        // Move flock
        flock.x += flock.speed * flock.direction;
        flock.y += flock.driftY;

        // Fade logic
        if (flock.fadeState === 'in') {
          flock.opacity = Math.min(flock.opacity + 0.003, 0.5);
          if (flock.opacity >= 0.5) flock.fadeState = 'visible';
        }

        // Check if off-screen
        const outOfBounds = flock.direction === 1
          ? flock.x > width + 150
          : flock.x < -150;

        if (outOfBounds) {
          flock.fadeState = 'out';
        }

        if (flock.fadeState === 'out') {
          flock.opacity -= 0.005;
          if (flock.opacity <= 0) {
            flocksRef.current.splice(fi, 1);
            continue;
          }
        }

        // Draw each bird in flock
        for (const bird of flock.birds) {
          bird.flapPhase += bird.flapSpeed;
          drawBird(
            ctx,
            flock.x + bird.offsetX,
            flock.y + bird.offsetY,
            bird.size,
            bird.flapPhase,
            flock.opacity
          );
        }
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
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 2 }}
      aria-hidden="true"
    />
  );
}
