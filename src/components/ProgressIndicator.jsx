import { motion } from 'framer-motion';
import { TOTAL_STEPS } from '../data/questionTree';

export default function ProgressIndicator({ depth }) {
  const progress = Math.min((depth / TOTAL_STEPS) * 100, 100);

  return (
    <div className="fixed top-0 left-0 right-0 z-50" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
      {/* Glow track */}
      <div className="h-[3px] bg-white/5 w-full">
        <motion.div
          className="h-full relative"
          style={{
            background: 'linear-gradient(90deg, #f43f5e, #ec4899, #f43f5e)',
            backgroundSize: '200% 100%',
          }}
          initial={{ width: 0 }}
          animate={{
            width: `${progress}%`,
            backgroundPosition: ['0% 0%', '100% 0%'],
          }}
          transition={{
            width: { duration: 0.8, ease: 'easeOut' },
            backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' },
          }}
        >
          {/* Glow effect at the tip */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(244,63,94,0.6) 0%, transparent 70%)',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
