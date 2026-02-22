import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { getNode, buildPath, TOTAL_STEPS } from './data/questionTree';
import { getVisualConfig } from './data/visualConfig';
import { trackResponse } from './utils/trackResponse';
import CosmicScene from './components/CosmicScene';
import MoonProgress from './components/MoonProgress';
import MusicToggle from './components/MusicToggle';
import QuestionCard from './components/QuestionCard';
import FinalProposal from './components/FinalProposal';

export default function App() {
  const [path] = useState(() => buildPath());
  const [step, setStep] = useState(0);

  const currentNode = getNode(path[step]);
  const normalizedText = (currentNode?.text || '').toLowerCase();
  const isValentineQuestion = normalizedText.includes('will you be my valentine');
  const questionsAsked = path
    .slice(0, step + 1)
    .reduce((count, id) => count + (getNode(id)?.type === 'question' ? 1 : 0), 0);
  const waxingMoonStep = Math.min(Math.max(questionsAsked - 1, 0), TOTAL_STEPS - 1);
  const moonStep = isValentineQuestion ? TOTAL_STEPS : waxingMoonStep;

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

  const visualConfig = getVisualConfig(moonStep, TOTAL_STEPS, currentNode?.category);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <CosmicScene config={visualConfig} />

      {!isCelebration && (
        <MoonProgress step={moonStep} moonPhase={visualConfig.moonPhase} />
      )}

      <AnimatePresence mode="wait">
        {isFinal || isCelebration ? (
          <FinalProposal key="final" node={currentNode} onAnswer={handleAnswer} />
        ) : (
          <QuestionCard key={path[step]} node={currentNode} onAnswer={handleAnswer} config={visualConfig} />
        )}
      </AnimatePresence>

      <MusicToggle />
    </div>
  );
}
