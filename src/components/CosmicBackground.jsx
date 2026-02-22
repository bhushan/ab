import { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function CosmicBackground({ config, offsetX, offsetY }) {
  const { progress, lightIntensity, cloudOpacity, mistOpacity } = config;

  const gradientStyle = useMemo(() => {
    const t = progress;
    // Deep purple cosmic gradients that shift warmer with progress
    const h1 = 260 + t * 15;
    const h2 = 270 + t * 10;
    const h3 = 250 + t * 20;
    const s = 70 + t * 10;
    const l1 = 3 + t * 3;
    const l2 = 5 + t * 4;
    const l3 = 4 + t * 2;

    return {
      background: `
        radial-gradient(ellipse 80% 50% at 50% 0%, hsla(${h1}, ${s}%, ${l2 + 8}%, ${0.4 + t * 0.2}) 0%, transparent 60%),
        radial-gradient(ellipse 60% 40% at 20% 80%, hsla(${h3}, ${s - 10}%, ${l3 + 5}%, ${0.2 + t * 0.15}) 0%, transparent 50%),
        radial-gradient(ellipse 50% 50% at 80% 60%, hsla(${h2}, ${s}%, ${l1 + 4}%, ${0.15 + t * 0.1}) 0%, transparent 50%),
        linear-gradient(135deg, hsl(${h1}, ${s}%, ${l1}%) 0%, hsl(${h2}, ${s - 5}%, ${l2}%) 40%, hsl(${h3}, ${s - 15}%, ${l3}%) 70%, hsl(${h1 - 5}, ${s}%, ${l1 + 1}%) 100%)
      `,
      transition: 'background 1.5s ease',
    };
  }, [progress]);

  const nebulaStyle = useMemo(() => ({
    opacity: 0.03 + lightIntensity * 0.04,
    background: `
      radial-gradient(ellipse 120% 60% at 30% 30%, hsla(280, 60%, 25%, 0.12) 0%, transparent 70%),
      radial-gradient(ellipse 100% 50% at 70% 70%, hsla(260, 50%, 20%, 0.1) 0%, transparent 60%)
    `,
    transition: 'opacity 1.5s ease',
  }), [lightIntensity]);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {/* Main layered gradient */}
      <motion.div
        className="absolute inset-0"
        style={{ ...gradientStyle, x: offsetX, y: offsetY }}
      />

      {/* Nebula light waves */}
      <div className="absolute inset-0" style={nebulaStyle} />

      {/* Drifting cloud layer — thick at new moon, clears by full moon */}
      {cloudOpacity > 0 && (
        <motion.div
          className="absolute inset-0"
          animate={{ x: [-20, 20, -20] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: `
              radial-gradient(ellipse 90% 35% at 25% 30%, rgba(60, 50, 80, ${cloudOpacity}) 0%, transparent 70%),
              radial-gradient(ellipse 70% 40% at 65% 50%, rgba(50, 40, 70, ${cloudOpacity * 0.8}) 0%, transparent 65%),
              radial-gradient(ellipse 80% 30% at 80% 25%, rgba(55, 45, 75, ${cloudOpacity * 0.6}) 0%, transparent 60%),
              radial-gradient(ellipse 60% 25% at 40% 70%, rgba(45, 35, 65, ${cloudOpacity * 0.5}) 0%, transparent 55%)
            `,
            filter: 'blur(25px)',
            transition: 'opacity 2s ease',
          }}
        />
      )}

      {/* Low mist layer — hugs the bottom, fades with moon phases */}
      {mistOpacity > 0 && (
        <motion.div
          className="absolute inset-x-0 bottom-0"
          style={{ height: '40%' }}
          animate={{ x: [10, -10, 10] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: `linear-gradient(to top, rgba(80, 70, 100, ${mistOpacity}) 0%, rgba(60, 50, 80, ${mistOpacity * 0.5}) 40%, transparent 100%)`,
              filter: 'blur(15px)',
              transition: 'opacity 2s ease',
            }}
          />
        </motion.div>
      )}

      {/* Film grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette — stronger at new moon */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,${0.4 + (1 - progress) * 0.2}) 100%)`,
          transition: 'background 1.5s ease',
        }}
      />
    </div>
  );
}
