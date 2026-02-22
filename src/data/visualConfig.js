// Pure functions mapping step/progress to visual parameters
// step ranges from 0 to totalSteps (typically 12)
// Each step represents a lunar phase from New Moon → Full Moon,
// with corresponding weather/atmosphere shifts.

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpHSL(h1, s1, l1, h2, s2, l2, t) {
  return [lerp(h1, h2, t), lerp(s1, s2, t), lerp(l1, l2, t)];
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

function getAtmosphere(step) {
  const idx = Math.min(step, PHASE_ATMOSPHERES.length - 1);
  return PHASE_ATMOSPHERES[idx];
}

export function getVisualConfig(step, totalSteps = 12) {
  const t = Math.min(step / totalSteps, 1); // 0 → 1

  // Moon phase: 0 = new moon, 1 = full moon
  const moonPhase = t;

  // Weather atmosphere for this lunar phase
  const atmo = getAtmosphere(step);

  // Sky colors driven by atmosphere preset
  const bgH = atmo.skyH;
  const bgS = atmo.skyS;
  const bgL = atmo.skyL;

  const [accentH, accentS, accentL] = lerpHSL(270, 70, 50, 280, 65, 65, t);
  // Glow shifts from cool purple (new moon) to warm gold (full moon)
  const [glowH, glowS, glowL] = lerpHSL(265, 80, 30, 45, 70, 60, t);

  return {
    step,
    progress: t,
    moonPhase,

    // Background colors (atmosphere-driven)
    bgDark: `hsl(${bgH}, ${bgS}%, ${bgL}%)`,
    bgMid: `hsl(${bgH + 5}, ${bgS - 10}%, ${bgL + 3}%)`,
    bgLight: `hsl(${bgH + 10}, ${bgS - 20}%, ${bgL + 6}%)`,

    // Accent colors for UI elements
    accent: `hsl(${accentH}, ${accentS}%, ${accentL}%)`,
    accentMuted: `hsl(${accentH}, ${accentS - 20}%, ${accentL - 15}%)`,

    // Glow/highlight color (shifts toward gold at end)
    glow: `hsl(${glowH}, ${glowS}%, ${glowL}%)`,
    glowAlpha: (a) => `hsla(${glowH}, ${glowS}%, ${glowL}%, ${a})`,

    // Star field — dim under clouds at new moon, brilliant at full moon
    starDensity: lerp(0.3, 1.5, t),
    starBrightness: lerp(0.25, 1.0, t),

    // Moon glow intensity — barely visible at new moon, radiant at full
    moonGlow: lerp(0.05, 1.0, t),
    moonSize: lerp(0.85, 1.05, t),

    // Ambient light intensity — dark new moon to luminous full moon
    lightIntensity: lerp(0.15, 0.85, t),

    // Animation speeds — restless early, calm at full moon
    breathingSpeed: lerp(5, 3.5, t),
    sparkleRate: lerp(0.15, 1.0, t),

    // Nebula opacity — heavy mist early, clear later
    nebulaOpacity: lerp(0.08, 0.35, t),

    // Weather parameters
    cloudOpacity: atmo.cloudOpacity,
    mistOpacity: atmo.mistOpacity,
    windSpeed: atmo.windSpeed,
  };
}
