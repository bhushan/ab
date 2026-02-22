import { motion } from 'framer-motion';
import { TOTAL_STEPS } from '../data/questionTree';

const PHASE_NAMES = [
  'New Moon',          // 0
  'Waxing Crescent',   // 1
  'Waxing Crescent',   // 2
  'First Quarter',     // 3
  'First Quarter',     // 4
  'Waxing Gibbous',    // 5
  'Waxing Gibbous',    // 6
  'Waxing Gibbous',    // 7
  'Waxing Gibbous',    // 8
  'Nearly Full',       // 9
  'Nearly Full',       // 10
  'Almost Full',       // 11
  'Full Moon',         // 12
];

// Simple crescent moon SVG icon showing current phase
function MoonIcon({ phase }) {
  const maskOffset = -12 + phase * 24;
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5">
      <defs>
        <mask id="progressMoonMask">
          <rect width="24" height="24" fill="white" />
          <circle
            cx={12 + maskOffset}
            cy={11.5}
            r={10}
            fill="black"
            style={{ transition: 'cx 0.8s ease' }}
          />
        </mask>
      </defs>
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="#e8e0f0"
        mask="url(#progressMoonMask)"
      />
    </svg>
  );
}

export default function MoonProgress({ step, moonPhase }) {
  const phaseIndex = Math.round(
    Math.min(Math.max(moonPhase, 0), 1) * (PHASE_NAMES.length - 1)
  );
  const phaseName = PHASE_NAMES[phaseIndex];
  const progressLabel = `${Math.min(step, TOTAL_STEPS)}/${TOTAL_STEPS}`;

  return (
    <motion.div
      className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 sm:gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <MoonIcon phase={moonPhase} />

      <span
        className="text-[0.65rem] sm:text-xs tracking-wider uppercase"
        style={{
          color: 'rgba(196, 181, 253, 0.6)',
          fontFamily: 'inherit',
          letterSpacing: '0.1em',
          transition: 'color 0.5s ease',
          minWidth: '5rem',
          textAlign: 'center',
        }}
      >
        {phaseName} {progressLabel}
      </span>

      <div className="flex items-center gap-[3px] sm:gap-1.5">
        {Array.from({ length: TOTAL_STEPS + 1 }).map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            style={{
              width: i <= step ? 5 : 3,
              height: i <= step ? 5 : 3,
              background: i <= step
                ? 'rgba(196, 181, 253, 0.8)'
                : 'rgba(139, 92, 246, 0.25)',
              transition: 'all 0.5s ease',
            }}
            animate={i === step ? {
              scale: [1, 1.4, 1],
              opacity: [0.8, 1, 0.8],
            } : {}}
            transition={i === step ? {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            } : {}}
          />
        ))}
      </div>
    </motion.div>
  );
}
