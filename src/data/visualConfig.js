// Pure functions mapping step/progress to visual parameters
// step ranges from 0 to totalSteps (typically 12)

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpHSL(h1, s1, l1, h2, s2, l2, t) {
  return [lerp(h1, h2, t), lerp(s1, s2, t), lerp(l1, l2, t)];
}

export function getVisualConfig(step, totalSteps = 12) {
  const t = Math.min(step / totalSteps, 1); // 0 → 1

  // Moon phase: 0 = thin crescent, 1 = full moon
  const moonPhase = t;

  // Color palette shifts from deep indigo-purple to warm violet-gold
  const [bgH, bgS, bgL] = lerpHSL(260, 80, 4, 275, 60, 8, t);
  const [accentH, accentS, accentL] = lerpHSL(270, 70, 50, 280, 65, 65, t);
  const [glowH, glowS, glowL] = lerpHSL(265, 80, 30, 45, 70, 60, t);

  return {
    step,
    progress: t,
    moonPhase,

    // Background colors
    bgDark: `hsl(${bgH}, ${bgS}%, ${bgL}%)`,
    bgMid: `hsl(${bgH + 5}, ${bgS - 10}%, ${bgL + 3}%)`,
    bgLight: `hsl(${bgH + 10}, ${bgS - 20}%, ${bgL + 6}%)`,

    // Accent colors for UI elements
    accent: `hsl(${accentH}, ${accentS}%, ${accentL}%)`,
    accentMuted: `hsl(${accentH}, ${accentS - 20}%, ${accentL - 15}%)`,

    // Glow/highlight color (shifts toward gold at end)
    glow: `hsl(${glowH}, ${glowS}%, ${glowL}%)`,
    glowAlpha: (a) => `hsla(${glowH}, ${glowS}%, ${glowL}%, ${a})`,

    // Star field parameters
    starDensity: lerp(0.6, 1.4, t),
    starBrightness: lerp(0.5, 1.0, t),

    // Moon glow intensity
    moonGlow: lerp(0.3, 1.0, t),
    moonSize: lerp(0.85, 1.0, t),

    // Ambient light intensity
    lightIntensity: lerp(0.3, 0.8, t),

    // Animation speeds
    breathingSpeed: lerp(5, 3.5, t),
    sparkleRate: lerp(0.3, 1.0, t),

    // Nebula opacity
    nebulaOpacity: lerp(0.15, 0.35, t),
  };
}
