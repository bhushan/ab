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
      className="relative z-10 flex flex-col items-center justify-center min-h-dvh px-7 sm:px-10 md:px-12 lg:px-24 py-8 pb-20 sm:py-14 sm:pb-32"
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
        className="relative z-10 flex flex-col items-center text-center w-full max-w-sm sm:max-w-xl md:max-w-2xl mx-auto px-5 sm:px-6 md:px-8 py-5 sm:py-4"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Glassmorphism card backdrop — border tinted by category */}
        <div
          className="absolute -inset-2 sm:-inset-8 md:-inset-10 rounded-2xl sm:rounded-[2rem]"
          style={{
            background: 'rgba(15, 5, 25, 0.42)',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            border: `1.5px solid ${cardBorder}`,
            boxShadow: `0 14px 45px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.08)`,
            transition: 'border-color 1s ease, box-shadow 1s ease',
          }}
        />

        {/* Emoji */}
        <motion.div
          className="relative text-3xl sm:text-5xl md:text-6xl mb-2.5 sm:mb-6 md:mb-8"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
        >
          {node.emoji}
        </motion.div>

        {/* Main text */}
        <motion.h1
          className="relative max-w-[18ch] sm:max-w-[14ch] mx-auto text-xl sm:text-3xl md:text-5xl lg:text-6xl font-extralight leading-[1.12] sm:leading-[1.08] tracking-tight mb-2.5 sm:mb-5 text-violet-50"
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
            className="relative text-xs sm:text-base md:text-lg text-violet-200/70 font-light max-w-[260px] sm:max-w-lg leading-relaxed mb-5 sm:mb-10 md:mb-12 px-1 sm:px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {node.subtext}
          </motion.p>
        )}

        {/* Buttons */}
        <motion.div
          className="relative flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 w-full max-w-[260px] sm:max-w-md"
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
        relative overflow-hidden px-4 sm:px-7 md:px-8 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl text-[0.8rem] sm:text-base md:text-lg font-semibold leading-snug text-center min-h-[44px] sm:min-h-[64px] md:min-h-[70px]
        transition-colors duration-300 cursor-pointer
        ${total === 1 ? 'w-full' : 'flex-1 sm:basis-0'}
        ${
          isPrimary
            ? 'text-white shadow-lg border'
            : 'bg-white/8 text-violet-100 border border-white/20 hover:bg-white/12 hover:border-violet-300/30'
        }
      `}
      style={isPrimary ? {
        background: `linear-gradient(135deg, hsla(${accentHue}, ${accentSat}%, 55%, 0.85) 0%, hsla(${accentHue + 10}, ${accentSat}%, 48%, 0.85) 50%, hsla(${accentHue}, ${accentSat}%, 55%, 0.85) 100%)`,
        borderColor: `hsla(${accentHue}, ${accentSat}%, 76%, 0.52)`,
        boxShadow: `0 8px 24px hsla(${accentHue}, ${accentSat}%, 50%, 0.32)`,
        transition: 'background 1s ease, border-color 1s ease, box-shadow 1s ease',
      } : undefined}
      whileHover={{
        scale: 1.02,
        boxShadow: isPrimary
          ? `0 10px 32px hsla(${accentHue}, ${accentSat}%, 50%, 0.4)`
          : '0 8px 24px rgba(139, 92, 246, 0.16)',
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
