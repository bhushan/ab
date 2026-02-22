import { motion } from 'framer-motion';

export default function MountainSilhouette({ config, offsetX }) {
  const { progress } = config;

  // Mountains get slightly more visible as scene progresses
  const baseOpacity = 0.6 + progress * 0.3;

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 pointer-events-none"
      style={{
        x: offsetX,
        willChange: 'transform',
        height: '35vh',
      }}
    >
      {/* Back mountain range — darker, larger, slower parallax */}
      <svg
        className="absolute bottom-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: '100%' }}
      >
        <defs>
          <linearGradient id="mountainBackGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={`rgba(10, 4, 20, ${baseOpacity * 0.7})`} />
            <stop offset="100%" stopColor={`rgba(8, 3, 16, ${baseOpacity * 0.95})`} />
          </linearGradient>
        </defs>
        <path
          d="M0,320 L0,220 Q80,180 120,200 L200,160 Q240,140 280,155 L380,120 Q420,100 460,115 L520,85 Q560,65 600,80 L680,110 Q720,95 760,105 L840,70 Q880,50 920,65 L980,90 Q1020,80 1060,95 L1120,60 Q1160,40 1200,55 L1260,80 Q1300,90 1340,85 L1400,100 Q1420,105 1440,110 L1440,320 Z"
          fill="url(#mountainBackGrad)"
        />
      </svg>

      {/* Front mountain range — slightly lighter, smaller peaks */}
      <svg
        className="absolute bottom-0 w-full"
        viewBox="0 0 1440 280"
        preserveAspectRatio="none"
        style={{ height: '75%' }}
      >
        <defs>
          <linearGradient id="mountainFrontGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={`rgba(12, 5, 24, ${baseOpacity * 0.8})`} />
            <stop offset="40%" stopColor={`rgba(8, 3, 18, ${baseOpacity * 0.95})`} />
            <stop offset="100%" stopColor={`rgba(5, 2, 12, ${baseOpacity})`} />
          </linearGradient>
        </defs>
        <path
          d="M0,280 L0,200 Q60,185 100,195 L160,170 Q200,155 240,165 L320,140 Q360,125 400,138 L480,115 Q520,100 560,110 L620,130 Q660,120 700,128 L780,105 Q820,90 860,100 L920,120 Q960,110 1000,118 L1060,95 Q1100,80 1140,92 L1200,115 Q1240,108 1280,112 L1340,125 Q1380,130 1420,128 L1440,130 L1440,280 Z"
          fill="url(#mountainFrontGrad)"
        />
      </svg>

      {/* Ridge line glow — subtle purple edge light from moonlight */}
      <svg
        className="absolute bottom-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: '100%' }}
      >
        <defs>
          <linearGradient id="ridgeGlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor={`rgba(139, 92, 246, ${0.04 + progress * 0.06})`} />
            <stop offset="70%" stopColor={`rgba(139, 92, 246, ${0.06 + progress * 0.08})`} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M0,220 Q80,180 120,200 L200,160 Q240,140 280,155 L380,120 Q420,100 460,115 L520,85 Q560,65 600,80 L680,110 Q720,95 760,105 L840,70 Q880,50 920,65 L980,90 Q1020,80 1060,95 L1120,60 Q1160,40 1200,55 L1260,80 Q1300,90 1340,85 L1400,100 Q1420,105 1440,110"
          fill="none"
          stroke="url(#ridgeGlow)"
          strokeWidth="2"
        />
      </svg>

      {/* Atmospheric haze at base of mountains */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '30%',
          background: `linear-gradient(to top, rgba(8,3,18,0.9) 0%, rgba(15,5,30,${0.3 + progress * 0.2}) 50%, transparent 100%)`,
        }}
      />
    </motion.div>
  );
}
