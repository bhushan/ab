import { useMemo } from 'react';

export default function CosmicBackground({ config }) {
  const { progress, lightIntensity } = config;

  const gradientStyle = useMemo(() => {
    const t = progress;
    // Deep purple cosmic gradients that shift warmer with progress
    const h1 = 260 + t * 15;
    const h2 = 270 + t * 10;
    const h3 = 250 + t * 20;
    const s = 70 + t * 10;
    const l1 = 3 + t * 3;
    const l2 = 5 + t * 4;
    const l3 = 4 + t * 2;

    return {
      background: `
        radial-gradient(ellipse 80% 50% at 50% 0%, hsla(${h1}, ${s}%, ${l2 + 8}%, ${0.4 + t * 0.2}) 0%, transparent 60%),
        radial-gradient(ellipse 60% 40% at 20% 80%, hsla(${h3}, ${s - 10}%, ${l3 + 5}%, ${0.2 + t * 0.15}) 0%, transparent 50%),
        radial-gradient(ellipse 50% 50% at 80% 60%, hsla(${h2}, ${s}%, ${l1 + 4}%, ${0.15 + t * 0.1}) 0%, transparent 50%),
        linear-gradient(135deg, hsl(${h1}, ${s}%, ${l1}%) 0%, hsl(${h2}, ${s - 5}%, ${l2}%) 40%, hsl(${h3}, ${s - 15}%, ${l3}%) 70%, hsl(${h1 - 5}, ${s}%, ${l1 + 1}%) 100%)
      `,
      transition: 'background 1.5s ease',
    };
  }, [progress]);

  const nebulaStyle = useMemo(() => ({
    opacity: 0.03 + lightIntensity * 0.04,
    background: `
      radial-gradient(ellipse 120% 60% at 30% 30%, hsla(280, 60%, 25%, 0.12) 0%, transparent 70%),
      radial-gradient(ellipse 100% 50% at 70% 70%, hsla(260, 50%, 20%, 0.1) 0%, transparent 60%)
    `,
    transition: 'opacity 1.5s ease',
  }), [lightIntensity]);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {/* Main layered gradient */}
      <div className="absolute inset-0" style={gradientStyle} />

      {/* Nebula light waves */}
      <div className="absolute inset-0" style={nebulaStyle} />

      {/* Film grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.5) 100%)',
        }}
      />
    </div>
  );
}
