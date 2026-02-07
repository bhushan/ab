import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

function fireConfetti() {
  const duration = 6000;
  const end = Date.now() + duration;

  // Heart-shaped confetti colors
  const colors = ['#f43f5e', '#ec4899', '#fb7185', '#fda4af', '#fecdd3', '#fff1f2'];

  // Initial big burst
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
    colors,
    shapes: ['circle'],
    scalar: 1.2,
  });

  // Continuous shower
  const interval = setInterval(() => {
    if (Date.now() > end) {
      clearInterval(interval);
      return;
    }

    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    });
  }, 80);
}

export default function FinalProposal({ node, onAnswer }) {
  const [answered, setAnswered] = useState(false);

  const handleYes = useCallback(() => {
    setAnswered(true);
    fireConfetti();
    if (node.options[0]) {
      onAnswer(node.options[0]);
    }
  }, [node, onAnswer]);

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-dvh px-6 sm:px-10 md:px-12 lg:px-24 pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Radial glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(244,63,94,0.15) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <AnimatePresence mode="wait">
        {!answered ? (
          <motion.div
            key="proposal"
            className="relative z-10 flex flex-col items-center text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Animated heart */}
            <motion.div
              className="text-7xl md:text-8xl mb-8"
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              💝
            </motion.div>

            {/* The question */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-4"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Will you be my
              <br />
              <span className="font-semibold italic bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                Valentine?
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-rose-200/60 font-light mb-20 max-w-sm sm:max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {node.subtext}
            </motion.p>

            {/* YES button */}
            <motion.button
              onClick={handleYes}
              className="relative px-24 sm:px-28 py-6 sm:py-7 rounded-full text-lg sm:text-xl font-medium tracking-widest uppercase cursor-pointer overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #f43f5e 100%)',
                backgroundSize: '200% 200%',
                boxShadow: '0 0 40px rgba(244, 63, 94, 0.4), 0 0 80px rgba(244, 63, 94, 0.2)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                boxShadow: [
                  '0 0 40px rgba(244, 63, 94, 0.4), 0 0 80px rgba(244, 63, 94, 0.2)',
                  '0 0 60px rgba(244, 63, 94, 0.6), 0 0 120px rgba(244, 63, 94, 0.3)',
                  '0 0 40px rgba(244, 63, 94, 0.4), 0 0 80px rgba(244, 63, 94, 0.2)',
                ],
              }}
              transition={{
                opacity: { delay: 1.2, duration: 0.6 },
                y: { delay: 1.2, duration: 0.6 },
                backgroundPosition: { duration: 4, repeat: Infinity, ease: 'linear' },
                boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              }}
              whileHover={{
                scale: 1.08,
                boxShadow: '0 0 60px rgba(244, 63, 94, 0.6), 0 0 120px rgba(244, 63, 94, 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Shimmer */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
              />
              <span className="relative z-10 text-white">Yes</span>
            </motion.button>
          </motion.div>
        ) : (
          <CelebrationView />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CelebrationView() {
  return (
    <motion.div
      key="celebration"
      className="relative z-10 flex flex-col items-center text-center px-8 sm:px-10"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="text-7xl md:text-8xl mb-6"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 150, damping: 12 }}
      >
        🎉
      </motion.div>

      <motion.h1
        className="text-3xl sm:text-4xl md:text-6xl font-light tracking-tight mb-4"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        You just made me the
        <br />
        <span className="font-semibold italic bg-gradient-to-r from-rose-400 via-amber-300 to-rose-400 bg-clip-text text-transparent">
          happiest person alive
        </span>
      </motion.h1>

      <motion.p
        className="text-rose-200/60 text-base font-light max-w-sm mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        This is just the beginning of our forever.
      </motion.p>

      {/* Floating hearts around celebration */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl pointer-events-none"
          style={{
            left: `${15 + Math.random() * 70}%`,
            top: `${15 + Math.random() * 70}%`,
          }}
          initial={{ opacity: 0, scale: 0, rotate: Math.random() * 360 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0.8],
            y: [0, -60 - Math.random() * 40],
          }}
          transition={{
            delay: 0.8 + i * 0.2,
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
          }}
        >
          {['💕', '❤️', '✨', '💗', '🌹', '💝'][i % 6]}
        </motion.span>
      ))}
    </motion.div>
  );
}
