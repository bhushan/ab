import { motion } from 'framer-motion';

export default function MoonOrb({ config, offsetX, offsetY }) {
  const { moonPhase, moonGlow, moonSize, breathingSpeed } = config;

  // Phase 0 = thin crescent (mask covers most), 1 = full (mask off to side)
  // Mask circle X offset: from overlapping the moon to being far off
  const maskOffsetX = -35 + moonPhase * 70; // -35 (crescent) → +35 (full)
  const moonRadius = 50;

  return (
    <motion.div
      className="absolute"
      style={{
        top: '8%',
        right: '10%',
        width: 'clamp(100px, 18vw, 200px)',
        height: 'clamp(100px, 18vw, 200px)',
        x: offsetX,
        y: offsetY,
        willChange: 'transform',
      }}
      animate={{
        scale: [moonSize, moonSize * 1.04, moonSize],
      }}
      transition={{
        duration: breathingSpeed,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, hsla(55, 60%, 90%, ${moonGlow * 0.25}) 0%, hsla(270, 40%, 60%, ${moonGlow * 0.1}) 40%, transparent 70%)`,
          transform: 'scale(2.5)',
          filter: 'blur(20px)',
          transition: 'background 1.5s ease',
        }}
      />

      {/* Secondary glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, hsla(50, 50%, 95%, ${moonGlow * 0.15}) 0%, transparent 60%)`,
          transform: 'scale(1.8)',
          filter: 'blur(10px)',
          transition: 'background 1.5s ease',
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: breathingSpeed * 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Moon SVG with crescent mask */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        style={{ filter: `drop-shadow(0 0 ${8 + moonGlow * 12}px hsla(50, 60%, 85%, ${moonGlow * 0.5}))` }}
      >
        <defs>
          <mask id="moonMask">
            <rect width="100" height="100" fill="white" />
            <circle
              cx={50 + maskOffsetX}
              cy={48}
              r={moonRadius - 2}
              fill="black"
              style={{ transition: 'cx 1.5s ease' }}
            />
          </mask>
          <radialGradient id="moonGrad" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#fef9ef" />
            <stop offset="50%" stopColor="#f0e6d0" />
            <stop offset="100%" stopColor="#d4c4a8" />
          </radialGradient>
        </defs>

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
        </g>
      </svg>
    </motion.div>
  );
}
