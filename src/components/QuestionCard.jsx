import { motion } from 'framer-motion';

const categoryGradients = {
  intro: 'from-rose-950/40 via-pink-900/20 to-transparent',
  destiny: 'from-violet-950/40 via-purple-900/20 to-transparent',
  memory: 'from-amber-950/30 via-rose-900/20 to-transparent',
  romantic: 'from-rose-950/40 via-red-900/20 to-transparent',
  playful: 'from-pink-950/30 via-fuchsia-900/20 to-transparent',
  future: 'from-indigo-950/30 via-violet-900/20 to-transparent',
  emotional: 'from-rose-950/40 via-pink-900/30 to-transparent',
  curious: 'from-amber-950/30 via-orange-900/20 to-transparent',
  cinematic: 'from-slate-950/40 via-rose-950/30 to-transparent',
  proposal: 'from-rose-950/50 via-pink-900/30 to-transparent',
  moonlight: 'from-indigo-950/40 via-slate-900/20 to-transparent',
};

const categoryGlows = {
  intro: 'rgba(244, 63, 94, 0.08)',
  destiny: 'rgba(139, 92, 246, 0.08)',
  memory: 'rgba(251, 191, 36, 0.06)',
  romantic: 'rgba(244, 63, 94, 0.1)',
  playful: 'rgba(236, 72, 153, 0.08)',
  future: 'rgba(139, 92, 246, 0.08)',
  emotional: 'rgba(244, 63, 94, 0.1)',
  curious: 'rgba(251, 191, 36, 0.06)',
  cinematic: 'rgba(244, 63, 94, 0.12)',
  proposal: 'rgba(244, 63, 94, 0.15)',
  moonlight: 'rgba(186, 230, 253, 0.08)',
};

export default function QuestionCard({ node, onAnswer }) {
  if (!node) return null;

  const gradient = categoryGradients[node.category] || categoryGradients.romantic;
  const glow = categoryGlows[node.category] || categoryGlows.romantic;

  return (
    <motion.div
      key={node.id}
      className="relative z-10 flex flex-col items-center justify-center min-h-dvh px-6 sm:px-10 md:px-12 lg:px-24 py-16 pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${gradient} pointer-events-none`}
      />

      {/* Central glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ background: glow }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Emoji */}
        <motion.div
          className="text-5xl mb-6 md:mb-8 md:text-6xl"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
        >
          {node.emoji}
        </motion.div>

        {/* Main text */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight mb-4"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {node.text}
        </motion.h1>

        {/* Subtext */}
        {node.subtext && (
                                <motion.p
                                  className="text-base sm:text-lg text-rose-200/70 font-light max-w-sm sm:max-w-md leading-relaxed mb-12 md:mb-16"                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >            {node.subtext}
          </motion.p>
        )}

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-xs sm:max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {node.options.map((option, i) => (
            <OptionButton
              key={option.label}
              option={option}
              index={i}
              isPrimary={i === 0}
              total={node.options.length}
              onAnswer={onAnswer}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function OptionButton({ option, index, isPrimary, total, onAnswer }) {
  return (
    <motion.button
      onClick={() => onAnswer(option)}
      className={`
        relative overflow-hidden px-10 py-5 rounded-3xl text-base sm:text-lg font-medium tracking-wide
        transition-colors duration-300 cursor-pointer
        ${total === 1 ? 'w-full' : 'flex-1'}
        ${
          isPrimary
            ? 'bg-gradient-to-r from-rose-500/90 to-pink-500/90 text-white shadow-lg shadow-rose-500/20 border border-rose-400/30'
            : 'bg-white/5 text-rose-100 border border-white/10 hover:bg-white/10 hover:border-white/20'
        }
      `}
      whileHover={{
        scale: 1.03,
        boxShadow: isPrimary
          ? '0 8px 30px rgba(244, 63, 94, 0.3)'
          : '0 4px 20px rgba(255, 255, 255, 0.05)',
      }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
    >
      {/* Shimmer effect on primary */}
      {isPrimary && (
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)',
          }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
        />
      )}
      <span className="relative z-10">{option.label}</span>
    </motion.button>
  );
}
