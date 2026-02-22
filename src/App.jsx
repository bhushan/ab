import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { getNode, getNextNodeId, START_NODE_ID, TOTAL_STEPS } from './data/questionTree';
import { getVisualConfig } from './data/visualConfig';
import { trackResponse } from './utils/trackResponse';
import CosmicScene from './components/CosmicScene';
import MoonProgress from './components/MoonProgress';
import MusicToggle from './components/MusicToggle';
import QuestionCard from './components/QuestionCard';
import FinalProposal from './components/FinalProposal';

export default function App() {
  const [currentNodeId, setCurrentNodeId] = useState(START_NODE_ID);
  const [visitedNodeIds, setVisitedNodeIds] = useState([START_NODE_ID]);

  const currentNode = getNode(currentNodeId);
  const normalizedText = (currentNode?.text || '').toLowerCase();
  const isValentineQuestion = normalizedText.includes('will you be my valentine');
  const questionsAsked = visitedNodeIds
    .reduce((count, id) => count + (getNode(id)?.type === 'question' ? 1 : 0), 0);
  const waxingMoonStep = Math.min(Math.max(questionsAsked - 1, 0), TOTAL_STEPS - 1);
  const moonStep = isValentineQuestion ? TOTAL_STEPS : waxingMoonStep;

  function handleAnswer(option) {
    const node = getNode(currentNodeId);
    if (node) {
      trackResponse({
        step: visitedNodeIds.length - 1,
        question: node.text,
        answer: option?.label || 'Yes',
        category: node.category,
        emoji: node.emoji,
      });
    }

    const nextNodeId = getNextNodeId(currentNodeId, option);
    if (!nextNodeId) return;

    setCurrentNodeId(nextNodeId);
    setVisitedNodeIds((prev) => [...prev, nextNodeId]);
  }

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
          <QuestionCard key={currentNodeId} node={currentNode} onAnswer={handleAnswer} config={visualConfig} />
        )}
      </AnimatePresence>

      <MusicToggle />
    </div>
  );
}
