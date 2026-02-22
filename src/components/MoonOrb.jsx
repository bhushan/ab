import { motion } from 'framer-motion';

// 13 lunar phases (steps 0–12): new moon → waxing crescent → first quarter → … → full moon
// Each entry: { name, maskCx, maskCy, maskR, showDark }
// maskCx controls the shadow circle position to shape the illuminated area.
// For "new moon" we cover entirely; for "full moon" we push the mask offscreen.
const LUNAR_PHASES = [
  { name: 'New Moon',        maskCx: 50,  visible: 0.02 }, // step 0 – barely visible sliver
  { name: 'Waxing Crescent', maskCx: 38,  visible: 0.15 },
  { name: 'Waxing Crescent', maskCx: 30,  visible: 0.25 },
  { name: 'First Quarter',   maskCx: 18,  visible: 0.40 },
  { name: 'First Quarter',   maskCx: 8,   visible: 0.50 },
  { name: 'Waxing Gibbous',  maskCx: -2,  visible: 0.60 },
  { name: 'Waxing Gibbous',  maskCx: -14, visible: 0.70 },
  { name: 'Waxing Gibbous',  maskCx: -26, visible: 0.78 },
  { name: 'Waxing Gibbous',  maskCx: -38, visible: 0.85 },
  { name: 'Nearly Full',     maskCx: -52, visible: 0.90 },
  { name: 'Nearly Full',     maskCx: -68, visible: 0.95 },
  { name: 'Almost Full',     maskCx: -90, visible: 0.98 },
  { name: 'Full Moon',       maskCx: -120, visible: 1.0  }, // step 12 – fully illuminated
];

function getPhase(step) {
  const idx = Math.min(step, LUNAR_PHASES.length - 1);
  return LUNAR_PHASES[idx];
}

export default function MoonOrb({ config, offsetX, offsetY }) {
  const { moonGlow, moonSize, breathingSpeed, step } = config;

  const phase = getPhase(step);
  const moonRadius = 50;

  return (
    <motion.div
      className="absolute"
      animate={{
        scale: [moonSize, moonSize * 1.04, moonSize],
      }}
      transition={{
        scale: { duration: breathingSpeed, repeat: Infinity, ease: 'easeInOut' },
      }}
      style={{
        top: '8%',
        right: '10%',
        width: 'clamp(100px, 18vw, 220px)',
        height: 'clamp(100px, 18vw, 220px)',
        x: offsetX,
        y: offsetY,
        willChange: 'transform',
      }}
    >
      {/* Outer glow — gets larger and brighter toward full moon */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          opacity: [0.6 + moonGlow * 0.2, 0.9 + moonGlow * 0.1, 0.6 + moonGlow * 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: `radial-gradient(circle, hsla(55, 60%, 92%, ${moonGlow * 0.3}) 0%, hsla(270, 40%, 60%, ${moonGlow * 0.12}) 40%, transparent 70%)`,
          transform: `scale(${2.2 + moonGlow * 0.8})`,
          filter: 'blur(20px)',
          transition: 'background 1.5s ease, transform 1.5s ease',
        }}
      />

      {/* Secondary glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, hsla(50, 50%, 95%, ${moonGlow * 0.18}) 0%, transparent 60%)`,
          transform: 'scale(1.8)',
          filter: 'blur(10px)',
          transition: 'background 1.5s ease',
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: breathingSpeed * 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Moon SVG with lunar phase mask */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        style={{
          filter: `drop-shadow(0 0 ${8 + moonGlow * 15}px hsla(50, 60%, 85%, ${moonGlow * 0.6}))`,
          transition: 'filter 1.5s ease',
        }}
      >
        <defs>
          <mask id="moonMask">
            <rect width="100" height="100" fill="white" />
            <circle
              cx={phase.maskCx}
              cy={48}
              r={moonRadius - 2}
              fill="black"
              style={{ transition: 'cx 2s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
          </mask>
          <radialGradient id="moonGrad" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#fef9ef" />
            <stop offset="50%" stopColor="#f0e6d0" />
            <stop offset="100%" stopColor="#d4c4a8" />
          </radialGradient>
        </defs>

        {/* Faint outline of the dark side (always visible) */}
        <circle
          cx="50"
          cy="50"
          r={moonRadius}
          fill="none"
          stroke="rgba(200, 190, 220, 0.08)"
          strokeWidth="0.5"
        />
        {/* Dark side hint — very subtle disc */}
        <circle
          cx="50"
          cy="50"
          r={moonRadius}
          fill="rgba(100, 90, 130, 0.06)"
        />

        {/* Illuminated portion */}
        <circle
          cx="50"
          cy="50"
          r={moonRadius}
          fill="url(#moonGrad)"
          mask="url(#moonMask)"
        />

        {/* Subtle surface texture spots */}
        <g mask="url(#moonMask)" opacity="0.08">
          <circle cx="38" cy="42" r="8" fill="#b8a88a" />
          <circle cx="58" cy="55" r="6" fill="#b8a88a" />
          <circle cx="45" cy="62" r="5" fill="#b8a88a" />
          <circle cx="55" cy="38" r="4" fill="#b8a88a" />
          <circle cx="42" cy="52" r="3" fill="#b8a88a" />
        </g>
      </svg>
    </motion.div>
  );
}
