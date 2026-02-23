import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MUSIC_SRC = import.meta.env.BASE_URL + 'music/bg.mp3';

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(MUSIC_SRC);
      audio.loop = true;
      audio.volume = 0.5;
      audioRef.current = audio;
    }

    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
    setHasInteracted(true);
  }, [isPlaying]);

  return (
    <motion.button
      onClick={toggleMusic}
      className="fixed z-50 flex items-center gap-2.5 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-xl sm:rounded-2xl backdrop-blur-xl border cursor-pointer"
      style={{
        bottom: 'calc(0.9rem + env(safe-area-inset-bottom))',
        right: 'calc(0.9rem + env(safe-area-inset-right))',
        minWidth: '7.5rem',
        background: 'rgba(18, 10, 32, 0.52)',
        borderColor: 'rgba(167, 139, 250, 0.42)',
        boxShadow: '0 10px 28px rgba(2, 0, 12, 0.45), inset 0 1px 0 rgba(255,255,255,0.08)',
      }}
      whileHover={{
        scale: 1.03,
        borderColor: 'rgba(196, 181, 253, 0.62)',
        boxShadow: '0 14px 34px rgba(2, 0, 12, 0.55), inset 0 1px 0 rgba(255,255,255,0.12)',
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
    >
      {/* Animated bars */}
      <div className="flex items-end gap-[3px] h-4 shrink-0">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-[3px] rounded-full bg-violet-300"
            animate={
              isPlaying
                ? {
                    height: ['4px', '16px', '8px', '14px', '4px'],
                  }
                : { height: '4px' }
            }
            transition={
              isPlaying
                ? {
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: 'easeInOut',
                  }
                : { duration: 0.3 }
            }
          />
        ))}
      </div>

      <span className="text-[0.72rem] sm:text-[0.8rem] md:text-sm font-medium text-violet-100 tracking-wide whitespace-nowrap">
        {isPlaying ? 'Music On' : 'Music Off'}
      </span>

      {/* Pulse ring when not yet interacted */}
      <AnimatePresence>
        {!hasInteracted && (
          <motion.div
            className="absolute inset-0 rounded-full border border-violet-400/40"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}
