import { motion } from 'framer-motion';

export default function GirlSilhouette({ config, offsetX }) {
  const { breathingSpeed } = config;

  return (
    <motion.div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 hidden sm:block"
      style={{
        x: offsetX,
        willChange: 'transform',
      }}
    >
      {/* Floor glow line */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: '200%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.15) 30%, rgba(196,181,253,0.25) 50%, rgba(139,92,246,0.15) 70%, transparent 100%)',
          filter: 'blur(1px)',
        }}
      />
      {/* Floor ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: '250%',
          height: '40px',
          background: 'radial-gradient(ellipse at center bottom, rgba(139,92,246,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Seated girl silhouette */}
      <motion.svg
        viewBox="0 0 200 300"
        className="h-[25vh] sm:h-[30vh] md:h-[35vh]"
        style={{ filter: 'drop-shadow(0 0 8px rgba(139,92,246,0.1))' }}
        animate={{
          scaleY: [1, 1.005, 1],
        }}
        transition={{
          duration: breathingSpeed,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Seated figure - side profile, elegant pose */}
        <path
          d={`
            M 95 70
            C 85 70, 78 60, 80 50
            C 82 38, 92 30, 100 30
            C 108 30, 118 38, 120 50
            C 122 60, 115 70, 105 70

            C 108 72, 110 75, 112 80
            C 114 85, 115 90, 114 95

            L 120 95
            C 130 96, 138 100, 142 108
            C 146 116, 145 120, 142 125

            L 140 130
            C 138 140, 135 155, 134 170

            C 133 180, 130 190, 125 200
            C 122 210, 118 215, 115 220

            L 112 230
            C 110 240, 108 255, 108 265
            C 108 275, 110 285, 112 295
            L 115 300

            L 60 300

            L 65 290
            C 68 280, 72 265, 75 255
            C 78 245, 80 238, 82 230

            L 78 220
            C 72 215, 68 210, 65 200
            C 60 188, 58 175, 60 165

            C 62 155, 65 148, 68 140
            L 70 130
            C 68 125, 66 118, 68 110

            C 70 102, 75 96, 82 94
            L 88 93
            C 86 88, 86 83, 88 78
            C 90 74, 92 72, 95 70
            Z
          `}
          fill="#0a0612"
        />

        {/* Hair flowing detail */}
        <path
          d={`
            M 80 50
            C 78 45, 82 32, 95 28
            C 100 27, 105 27, 110 28
            C 118 30, 125 38, 126 48
            C 127 55, 125 62, 122 68
            C 130 65, 135 72, 132 82
            C 130 88, 125 92, 120 94
            L 114 95
            C 115 90, 114 85, 112 80
            C 110 75, 108 72, 105 70
            C 115 70, 122 60, 120 50
            C 118 40, 108 33, 100 33
            C 92 33, 85 40, 83 50
            Z
          `}
          fill="#070510"
        />
      </motion.svg>
    </motion.div>
  );
}
