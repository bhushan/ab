import { motion } from 'framer-motion';

export default function QuestionCard({ node, onAnswer, config }) {
  if (!node) return null;

  const tone = config?.tone;
  const accentHue = tone?.accentHue ?? 270;
  const accentSat = tone?.accentSat ?? 60;
  const cardBorder = tone?.cardBorder ?? 'rgba(139, 92, 246, 0.12)';
  const glowHue = tone?.glowHue ?? 270;

  return (
    <motion.div
      key={node.id}
      className="relative z-10 flex flex-col items-center justify-center min-h-dvh px-6 sm:px-10 md:px-12 lg:px-24 py-16 pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Central glow — color matches category */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: `hsla(${glowHue}, 50%, 50%, 0.06)`,
          transition: 'background 1.2s ease',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Glassmorphism card backdrop — border tinted by category */}
        <div
          className="absolute -inset-8 sm:-inset-12 rounded-3xl"
          style={{
            background: 'rgba(15, 5, 25, 0.35)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `1px solid ${cardBorder}`,
            boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03)`,
            transition: 'border-color 1s ease, box-shadow 1s ease',
          }}
        />

        {/* Emoji */}
        <motion.div
          className="relative text-5xl mb-6 md:mb-8 md:text-6xl"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
        >
          {node.emoji}
        </motion.div>

        {/* Main text */}
        <motion.h1
          className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight leading-tight tracking-tight mb-4 text-violet-50"
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
            className="relative text-base sm:text-lg text-violet-200/60 font-light max-w-sm sm:max-w-md leading-relaxed mb-12 md:mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {node.subtext}
          </motion.p>
        )}

        {/* Buttons */}
        <motion.div
          className="relative flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-xs sm:max-w-sm"
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
              accentHue={accentHue}
              accentSat={accentSat}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function OptionButton({ option, index, isPrimary, total, onAnswer, accentHue, accentSat }) {
  return (
    <motion.button
      onClick={() => onAnswer(option)}
      className={`
        relative overflow-hidden px-10 py-5 rounded-3xl text-base sm:text-lg font-medium tracking-wide
        transition-colors duration-300 cursor-pointer
        ${total === 1 ? 'w-full' : 'flex-1'}
        ${
          isPrimary
            ? 'text-white shadow-lg border'
            : 'bg-white/5 text-violet-100 border border-white/10 hover:bg-white/10 hover:border-violet-400/20'
        }
      `}
      style={isPrimary ? {
        background: `linear-gradient(135deg, hsla(${accentHue}, ${accentSat}%, 55%, 0.85) 0%, hsla(${accentHue + 10}, ${accentSat}%, 48%, 0.85) 50%, hsla(${accentHue}, ${accentSat}%, 55%, 0.85) 100%)`,
        borderColor: `hsla(${accentHue}, ${accentSat}%, 70%, 0.4)`,
        boxShadow: `0 4px 20px hsla(${accentHue}, ${accentSat}%, 50%, 0.25)`,
        transition: 'background 1s ease, border-color 1s ease, box-shadow 1s ease',
      } : undefined}
      whileHover={{
        scale: 1.03,
        boxShadow: isPrimary
          ? `0 8px 30px hsla(${accentHue}, ${accentSat}%, 50%, 0.35)`
          : '0 4px 20px rgba(139, 92, 246, 0.1)',
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
