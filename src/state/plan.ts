import { useStoredState } from '~/utils/useStoredState';

export type DependenceLevel = 'low'|'moderate'|'high'|'very_high';
export type DependenceResult = {
  score: number;
  level: DependenceLevel;
  rationale: string[];
  estNicotineMgPerDay: number;
  estSpendPerWeekUSD: number;
};
export type PlanSummary = {
  quitDateISO: string;
  pillars: string[];
  day0Script: string;
  first72hChecklist: string[];
};
export type OutcomeSnapshot = {
  dependence: DependenceResult;
  plan: PlanSummary;
  inputs: Record<string, any>;
};

export function usePlan() {
  const [outcome, setOutcome] = useStoredState<OutcomeSnapshot | null>('qv-outcome', null);
  return { outcome, setOutcome };
}