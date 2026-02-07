# Will You Be My Valentine?

A cinematic, interactive Valentine's proposal experience. Guide your special someone through a beautiful branching journey of heartfelt questions, sweet memories, and playful moments — all leading to the one question that truly matters.

**[See it live](https://bhushan.github.io/ab/)**

## Features

- **Branching story** — 15+ handcrafted nodes with multiple paths through destiny, memories, humor, and romance. Every choice shapes the journey; every path leads to the big question.
- **Cinematic animations** — Smooth card transitions, pulsing glows, and shimmer effects powered by Framer Motion.
- **Floating heart particles** — A canvas-based particle system with intensity that builds as the moment approaches.
- **Confetti celebration** — A burst of color when they say yes, using canvas-confetti.
- **Ambient music** — A gentle Cmaj7 pad generated entirely with the Web Audio API — no audio files needed.
- **Category-driven theming** — Each question category (romantic, playful, destiny, memory, future) has its own gradient palette and glow colors.
- **Fully responsive** — Works beautifully on phones, tablets, and desktops.
- **Zero dead ends** — Every "no" gently redirects. There's only one answer, and it's the right one.

## Tech Stack

React 19 &middot; Vite 7 &middot; Tailwind CSS v4 &middot; Framer Motion &middot; Canvas Confetti &middot; Web Audio API

## Getting Started

```bash
npm install
npm run dev
```

## Deployment

The site auto-deploys to GitHub Pages on every push to `main` via GitHub Actions.

To deploy manually:

```bash
npm run build
```

The `dist/` folder is a static site ready for any host (Vercel, Netlify, etc).

## License

Made with love.
