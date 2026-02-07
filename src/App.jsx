import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { getNode, buildPath } from './data/questionTree';
import { trackResponse } from './utils/trackResponse';
import HeartParticles from './components/HeartParticles';
import BackgroundGlow from './components/BackgroundGlow';
import ProgressIndicator from './components/ProgressIndicator';
import MusicToggle from './components/MusicToggle';
import QuestionCard from './components/QuestionCard';
import FinalProposal from './components/FinalProposal';

export default function App() {
  const [path] = useState(() => buildPath());
  const [step, setStep] = useState(0);

  const currentNode = getNode(path[step]);

  const handleAnswer = useCallback((option) => {
    const node = getNode(path[step]);
    if (node) {
      trackResponse({
        step,
        question: node.text,
        answer: option?.label || 'Yes',
        category: node.category,
        emoji: node.emoji,
      });
    }
    setStep((s) => Math.min(s + 1, path.length - 1));
  }, [path, step]);

  const isFinal = currentNode?.type === 'final';
  const isCelebration = currentNode?.type === 'celebration';
  const particleIntensity = isCelebration ? 2.5 : isFinal ? 1.5 : 1;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <BackgroundGlow />
      <HeartParticles intensity={particleIntensity} />

      {!isCelebration && <ProgressIndicator depth={step} />}

      <AnimatePresence mode="wait">
        {isFinal || isCelebration ? (
          <FinalProposal key="final" node={currentNode} onAnswer={handleAnswer} />
        ) : (
          <QuestionCard key={path[step]} node={currentNode} onAnswer={handleAnswer} />
        )}
      </AnimatePresence>

      <MusicToggle />
    </div>
  );
}
