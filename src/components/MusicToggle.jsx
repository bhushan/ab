import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Romantic chord progression with evolving pads and gentle reverb
function createAmbientMusic(audioCtx) {
  const master = audioCtx.createGain();
  master.gain.value = 0;

  // Warm low-pass filter to soften everything
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 800;
  filter.Q.value = 0.5;

  // Gentle filter sweep LFO
  const filterLfo = audioCtx.createOscillator();
  const filterLfoGain = audioCtx.createGain();
  filterLfo.frequency.value = 0.04;
  filterLfoGain.gain.value = 300;
  filterLfo.connect(filterLfoGain);
  filterLfoGain.connect(filter.frequency);
  filterLfo.start();

  // Create a simple reverb using delay lines
  const reverbGain = audioCtx.createGain();
  reverbGain.gain.value = 0.3;
  const delays = [0.1, 0.23, 0.37, 0.51].map((time) => {
    const delay = audioCtx.createDelay(1);
    delay.delayTime.value = time;
    const feedback = audioCtx.createGain();
    feedback.gain.value = 0.2;
    const lpf = audioCtx.createBiquadFilter();
    lpf.type = 'lowpass';
    lpf.frequency.value = 1200;
    delay.connect(lpf);
    lpf.connect(feedback);
    feedback.connect(delay);
    lpf.connect(reverbGain);
    return delay;
  });

  filter.connect(master);
  reverbGain.connect(master);
  master.connect(audioCtx.destination);

  // Romantic chord progression: Cmaj7 → Am9 → Fmaj7 → Gsus4
  const chords = [
    [130.81, 164.81, 196.0, 246.94],   // Cmaj7 (C3 E3 G3 B3)
    [110.0, 164.81, 196.0, 246.94],     // Am9 (A2 E3 G3 B3)
    [87.31, 130.81, 164.81, 207.65],    // Fmaj7 (F2 C3 E3 Ab3)
    [98.0, 146.83, 196.0, 261.63],      // Gsus4 (G2 D3 G3 C4)
  ];

  const CHORD_DURATION = 8; // seconds per chord
  const oscillators = [];

  // Create 4 oscillator voices that will crossfade between chords
  chords[0].forEach((freq, i) => {
    // Main warm tone
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.value = 0.045;

    // Detuned layer for warmth
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.value = freq * 1.002; // slight detune
    gain2.gain.value = 0.02;

    // Very slow vibrato for organic feel
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.frequency.value = 0.15 + i * 0.05;
    lfoGain.gain.value = 0.8;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfoGain.connect(osc2.frequency);
    lfo.start();

    osc.connect(gain);
    osc2.connect(gain2);
    gain.connect(filter);
    gain2.connect(filter);
    // Send to reverb too
    delays.forEach((d) => { gain.connect(d); gain2.connect(d); });
    osc.start();
    osc2.start();
    oscillators.push({ osc, osc2, gain, gain2, lfo, voiceIndex: i });
  });

  // Chord progression scheduler
  let chordIndex = 0;
  function scheduleNextChord() {
    chordIndex = (chordIndex + 1) % chords.length;
    const chord = chords[chordIndex];
    const now = audioCtx.currentTime;
    oscillators.forEach((v, i) => {
      const target = chord[i];
      // Smooth glide to next chord
      v.osc.frequency.linearRampToValueAtTime(target, now + 2);
      v.osc2.frequency.linearRampToValueAtTime(target * 1.002, now + 2);
    });
  }

  const intervalId = setInterval(scheduleNextChord, CHORD_DURATION * 1000);

  return { master, oscillators, intervalId };
}

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioCtxRef = useRef(null);
  const musicRef = useRef(null);

  const toggleMusic = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      musicRef.current = createAmbientMusic(audioCtxRef.current);
    }

    const ctx = audioCtxRef.current;
    const music = musicRef.current;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    if (isPlaying) {
      music.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
      setIsPlaying(false);
    } else {
      music.master.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 3);
      setIsPlaying(true);
    }
    setHasInteracted(true);
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (musicRef.current?.intervalId) {
        clearInterval(musicRef.current.intervalId);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <motion.button
      onClick={toggleMusic}
      className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-[calc(1.5rem+env(safe-area-inset-right))] z-50 flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md border cursor-pointer"
      style={{
        background: 'rgba(244, 63, 94, 0.15)',
        borderColor: 'rgba(244, 63, 94, 0.3)',
      }}
      whileHover={{ scale: 1.05, borderColor: 'rgba(244, 63, 94, 0.6)' }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
    >
      {/* Animated bars */}
      <div className="flex items-end gap-[3px] h-4">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-[3px] rounded-full bg-rose-400"
            animate={
              isPlaying
                ? {
                    height: ['4px', '16px', '8px', '14px', '4px'],
                  }
                : { height: '4px' }
            }
            transition={
              isPlaying
                ? {
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: 'easeInOut',
                  }
                : { duration: 0.3 }
            }
          />
        ))}
      </div>

      <span className="text-xs font-light text-rose-200 tracking-wide">
        {isPlaying ? 'Music On' : 'Music Off'}
      </span>

      {/* Pulse ring when not yet interacted */}
      <AnimatePresence>
        {!hasInteracted && (
          <motion.div
            className="absolute inset-0 rounded-full border border-rose-400/40"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}
