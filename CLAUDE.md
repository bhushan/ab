# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint across all JS/JSX files

## Stack

React 19 + Vite 7, Framer Motion for animations, Tailwind CSS v4 (via `@tailwindcss/vite` plugin), canvas-confetti for celebration effects. No TypeScript — plain JSX. No test framework configured.

## Architecture

This is a cinematic interactive Valentine's proposal website driven by a branching decision tree.

**Data-driven flow:** `src/data/questionTree.js` defines all content as a flat map of node objects keyed by ID. Each node has `type` (question|statement|final|celebration), `category` (drives visual theming), `text`/`subtext`, and `options` array where each option has a `next` ID pointer. All paths through the tree converge to the `final` → `celebration` nodes — there are no dead ends.

**State machine in App.jsx:** The app tracks `currentId`, `depth` (step count), and `history` (path taken). It looks up the current node via `getNode(id)` and renders either `QuestionCard` or `FinalProposal` based on node type. Navigation is a simple `setCurrentId(option.next)`.

**Visual theming:** `QuestionCard` maps each node's `category` to gradient/glow presets via `categoryGradients` and `categoryGlows` lookup objects. To add a new category, add entries to both maps.

**Audio:** `MusicToggle` generates ambient music entirely via Web Audio API oscillators (no audio files). It creates a Cmaj7 pad with vibrato LFOs.

**Particles:** `HeartParticles` uses a raw Canvas 2D animation loop (not Framer Motion) with an `intensity` prop that scales particle count.

## Adding/Editing Questions

Edit `src/data/questionTree.js`. Each node follows this shape:
```js
nodeId: {
  id: 'nodeId',
  type: 'question',        // question | statement | final | celebration
  category: 'romantic',    // maps to visual theme in QuestionCard
  emoji: '❤️',
  text: 'Main question text',
  subtext: 'Smaller subtitle',
  options: [
    { label: 'Button text', next: 'nextNodeId', tone: 'romantic' }
  ]
}
```
Ensure every option's `next` points to a valid node ID. Every branch must eventually reach `final`.

## Deployment

Static site — `npm run build` produces `dist/`. Deploy to Vercel (`vercel`) or Netlify (`netlify deploy --prod --dir=dist`). No server-side code or environment variables required.
