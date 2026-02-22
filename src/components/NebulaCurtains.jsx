import { motion } from 'framer-motion';

export default function NebulaCurtains({ config }) {
  const { nebulaOpacity, progress } = config;
  const hue = 270 + progress * 15;

  return (
    <>
      {/* Left curtain */}
      <motion.svg
        className="absolute left-0 top-0 h-full pointer-events-none"
        style={{ width: '12vw', maxWidth: '150px' }}
        viewBox="0 0 100 600"
        preserveAspectRatio="none"
        animate={{ x: [-2, 2, -2] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        <defs>
          <linearGradient id="leftCurtainGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={`hsla(${hue}, 50%, 15%, ${nebulaOpacity})`} />
            <stop offset="60%" stopColor={`hsla(${hue}, 40%, 10%, ${nebulaOpacity * 0.3})`} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d={`M 0 0 Q 60 100 40 200 Q 80 300 30 400 Q 70 500 50 600 L 0 600 Z`}
          fill="url(#leftCurtainGrad)"
        />
      </motion.svg>

      {/* Right curtain */}
      <motion.svg
        className="absolute right-0 top-0 h-full pointer-events-none"
        style={{ width: '12vw', maxWidth: '150px' }}
        viewBox="0 0 100 600"
        preserveAspectRatio="none"
        animate={{ x: [2, -2, 2] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      >
        <defs>
          <linearGradient id="rightCurtainGrad" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor={`hsla(${hue + 10}, 50%, 15%, ${nebulaOpacity})`} />
            <stop offset="60%" stopColor={`hsla(${hue + 10}, 40%, 10%, ${nebulaOpacity * 0.3})`} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d={`M 100 0 Q 40 80 60 200 Q 20 320 70 420 Q 30 520 50 600 L 100 600 Z`}
          fill="url(#rightCurtainGrad)"
        />
      </motion.svg>
    </>
  );
}
