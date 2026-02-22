// Pure functions mapping step/progress to visual parameters
// step ranges from 0 to totalSteps (typically 20)
// Each step represents a lunar phase from New Moon → Full Moon,
// with corresponding weather/atmosphere shifts.
// Category tones overlay mood-specific colors on each question.

function lerp(a, b, t) {
  return a + (b - a) * t;
}

// 13 atmosphere presets (steps 0–12) — one per lunar phase
// Each defines the "weather mood" that accompanies that moon phase
const PHASE_ATMOSPHERES = [
  // 0: New Moon — pitch dark, mysterious, heavy clouds
  { skyH: 240, skyS: 60, skyL: 2,  cloudOpacity: 0.5,  mistOpacity: 0.4,  windSpeed: 1.2 },
  // 1: Waxing Crescent — very dark, thin clouds parting
  { skyH: 245, skyS: 65, skyL: 3,  cloudOpacity: 0.42, mistOpacity: 0.35, windSpeed: 1.1 },
  // 2: Waxing Crescent — dark indigo, slight clearing
  { skyH: 250, skyS: 70, skyL: 4,  cloudOpacity: 0.35, mistOpacity: 0.30, windSpeed: 1.0 },
  // 3: First Quarter — deep purple-blue, clouds thinning
  { skyH: 255, skyS: 72, skyL: 5,  cloudOpacity: 0.28, mistOpacity: 0.25, windSpeed: 0.9 },
  // 4: First Quarter — purple night, clearer
  { skyH: 258, skyS: 70, skyL: 5,  cloudOpacity: 0.22, mistOpacity: 0.20, windSpeed: 0.8 },
  // 5: Waxing Gibbous — violet hues emerging
  { skyH: 262, skyS: 68, skyL: 6,  cloudOpacity: 0.18, mistOpacity: 0.16, windSpeed: 0.7 },
  // 6: Waxing Gibbous — gentle violet-indigo
  { skyH: 265, skyS: 65, skyL: 6,  cloudOpacity: 0.14, mistOpacity: 0.12, windSpeed: 0.6 },
  // 7: Waxing Gibbous — warming purple
  { skyH: 268, skyS: 62, skyL: 7,  cloudOpacity: 0.10, mistOpacity: 0.09, windSpeed: 0.5 },
  // 8: Waxing Gibbous — soft violet
  { skyH: 270, skyS: 60, skyL: 7,  cloudOpacity: 0.08, mistOpacity: 0.06, windSpeed: 0.45 },
  // 9: Nearly Full — warm purple-rose
  { skyH: 273, skyS: 58, skyL: 8,  cloudOpacity: 0.05, mistOpacity: 0.04, windSpeed: 0.4 },
  // 10: Nearly Full — luminous violet
  { skyH: 275, skyS: 55, skyL: 8,  cloudOpacity: 0.03, mistOpacity: 0.03, windSpeed: 0.35 },
  // 11: Almost Full — serene, clear sky
  { skyH: 278, skyS: 52, skyL: 9,  cloudOpacity: 0.02, mistOpacity: 0.02, windSpeed: 0.3 },
  // 12: Full Moon — crystal clear, golden-violet glow, perfectly calm
  { skyH: 280, skyS: 50, skyL: 10, cloudOpacity: 0.0,  mistOpacity: 0.0,  windSpeed: 0.2 },
];

// Category-specific tone overlays — each shifts the mood uniquely
// hueShift: added to base sky hue   accentHue: card/glow hue
// warmth: 0=cool, 1=warm            sparkle: multiplier on sparkleRate
// glowHue/glowSat: override glow    cardBorder: rgba border color
const CATEGORY_TONES = {
  intro:       { hueShift: 0,   accentHue: 270, accentSat: 60, warmth: 0.3, sparkle: 0.5,  glowHue: 270, glowSat: 60, cardBorder: 'rgba(139, 92, 246, 0.15)' },
  playful:     { hueShift: -15, accentHue: 320, accentSat: 70, warmth: 0.4, sparkle: 1.4,  glowHue: 320, glowSat: 65, cardBorder: 'rgba(236, 72, 153, 0.18)' },
  destiny:     { hueShift: 10,  accentHue: 260, accentSat: 75, warmth: 0.5, sparkle: 1.2,  glowHue: 265, glowSat: 70, cardBorder: 'rgba(124, 58, 237, 0.20)' },
  memory:      { hueShift: -5,  accentHue: 30,  accentSat: 55, warmth: 0.7, sparkle: 0.7,  glowHue: 35,  glowSat: 50, cardBorder: 'rgba(251, 191, 36, 0.15)' },
  moonlight:   { hueShift: 5,   accentHue: 220, accentSat: 50, warmth: 0.2, sparkle: 1.0,  glowHue: 210, glowSat: 45, cardBorder: 'rgba(147, 197, 253, 0.18)' },
  romantic:    { hueShift: -10, accentHue: 340, accentSat: 65, warmth: 0.8, sparkle: 0.9,  glowHue: 345, glowSat: 60, cardBorder: 'rgba(244, 63, 94, 0.18)' },
  future:      { hueShift: 15,  accentHue: 200, accentSat: 60, warmth: 0.4, sparkle: 1.1,  glowHue: 195, glowSat: 55, cardBorder: 'rgba(56, 189, 248, 0.16)' },
  cinematic:   { hueShift: 5,   accentHue: 280, accentSat: 70, warmth: 0.6, sparkle: 1.3,  glowHue: 280, glowSat: 65, cardBorder: 'rgba(167, 139, 250, 0.22)' },
  proposal:    { hueShift: 0,   accentHue: 45,  accentSat: 80, warmth: 1.0, sparkle: 1.8,  glowHue: 45,  glowSat: 75, cardBorder: 'rgba(250, 204, 21, 0.25)' },
  celebration: { hueShift: 0,   accentHue: 50,  accentSat: 85, warmth: 1.0, sparkle: 2.0,  glowHue: 50,  glowSat: 80, cardBorder: 'rgba(253, 224, 71, 0.30)' },
};

function getAtmosphere(step, totalSteps) {
  const safeTotal = Math.max(totalSteps, 1);
  const scaled = Math.min(Math.max(step / safeTotal, 0), 1) * (PHASE_ATMOSPHERES.length - 1);
  const startIdx = Math.floor(scaled);
  const endIdx = Math.min(startIdx + 1, PHASE_ATMOSPHERES.length - 1);
  const blend = scaled - startIdx;
  const start = PHASE_ATMOSPHERES[startIdx];
  const end = PHASE_ATMOSPHERES[endIdx];

  return {
    skyH: lerp(start.skyH, end.skyH, blend),
    skyS: lerp(start.skyS, end.skyS, blend),
    skyL: lerp(start.skyL, end.skyL, blend),
    cloudOpacity: lerp(start.cloudOpacity, end.cloudOpacity, blend),
    mistOpacity: lerp(start.mistOpacity, end.mistOpacity, blend),
    windSpeed: lerp(start.windSpeed, end.windSpeed, blend),
  };
}

function getCategoryTone(category) {
  return CATEGORY_TONES[category] || CATEGORY_TONES.intro;
}

export function getVisualConfig(step, totalSteps = 20, category = 'intro') {
  const t = Math.min(step / totalSteps, 1); // 0 → 1

  // Moon phase: 0 = new moon, 1 = full moon
  const moonPhase = t;

  // Weather atmosphere for this lunar phase
  const atmo = getAtmosphere(step, totalSteps);

  // Category-specific tone overlay
  const tone = getCategoryTone(category);

  // Sky colors: base from atmosphere, shifted by category
  const bgH = atmo.skyH + tone.hueShift;
  const bgS = atmo.skyS;
  const bgL = atmo.skyL;

  // Accent from category tone (not just progress)
  const accentH = tone.accentHue;
  const accentS = tone.accentSat;
  const accentL = lerp(50, 65, t);

  // Glow from category tone, brightening with progress
  const glowH = tone.glowHue;
  const glowS = tone.glowSat;
  const glowL = lerp(30, 60, t);

  return {
    step,
    progress: t,
    moonPhase,
    category,

    // Background colors (atmosphere + category tint)
    bgDark: `hsl(${bgH}, ${bgS}%, ${bgL}%)`,
    bgMid: `hsl(${bgH + 5}, ${bgS - 10}%, ${bgL + 3}%)`,
    bgLight: `hsl(${bgH + 10}, ${bgS - 20}%, ${bgL + 6}%)`,

    // Category-driven accent colors
    accent: `hsl(${accentH}, ${accentS}%, ${accentL}%)`,
    accentMuted: `hsl(${accentH}, ${accentS - 20}%, ${accentL - 15}%)`,

    // Category-driven glow color
    glow: `hsl(${glowH}, ${glowS}%, ${glowL}%)`,
    glowAlpha: (a) => `hsla(${glowH}, ${glowS}%, ${glowL}%, ${a})`,

    // Star field — dim under clouds at new moon, brilliant at full moon
    starDensity: lerp(0.3, 1.5, t),
    starBrightness: lerp(0.25, 1.0, t),

    // Moon glow intensity — barely visible at new moon, radiant at full
    moonGlow: lerp(0.05, 1.0, t),
    // Larger visual change so growth is clearly noticeable over long journeys
    moonSize: lerp(0.72, 1.25, t),

    // Ambient light — warmth from category blended with progress
    lightIntensity: lerp(0.15, 0.85, t) * (0.8 + tone.warmth * 0.2),

    // Animation speeds — restless early, calm at full moon
    breathingSpeed: lerp(5, 3.5, t),
    sparkleRate: lerp(0.15, 1.0, t) * tone.sparkle,

    // Nebula opacity
    nebulaOpacity: lerp(0.08, 0.35, t),

    // Weather parameters
    cloudOpacity: atmo.cloudOpacity,
    mistOpacity: atmo.mistOpacity,
    windSpeed: atmo.windSpeed,

    // Category tone (for components that want direct access)
    tone,
  };
}
