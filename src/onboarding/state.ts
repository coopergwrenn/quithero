import { useState } from 'react';
import { quizSpec, getStepById, AnswerValue } from './spec';

export function useOnboardingState() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  
  const visibleSteps = quizSpec.steps.filter(step => 
    !step.visibleIf || step.visibleIf(answers)
  );
  
  const step = visibleSteps[index] || quizSpec.steps[0];
  const total = visibleSteps.length;

  function setAnswer(stepId: string, value: AnswerValue) {
    setAnswers(prev => ({ ...prev, [stepId]: value }));
  }

  function next() {
    if (index < total - 1) {
      setIndex(index + 1);
    }
  }

  function back() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  return {
    step,
    index,
    total,
    answers,
    setAnswer,
    next,
    back,
  };
}