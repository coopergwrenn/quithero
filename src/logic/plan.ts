import { DependenceResult, scoreDependence } from './scoring';

export type QuitPlan = {
  quitDateISO: string;
  method: 'cold_turkey' | 'gradual' | 'nic_replacement';
  methodReason: string;
  yearlySpendUSD: number;
  keyDrivers: string[];
  firstSteps: string[];
};

export function buildQuitPlan(
  dependence: DependenceResult,
  inputs: Record<string, any>
): QuitPlan {
  const { level, estSpendPerWeekUSD } = dependence;
  
  // Quit date (7-21 days from now based on level)
  const daysOut = level === 'very_high' ? 21 : level === 'high' ? 14 : level === 'moderate' ? 10 : 7;
  const quitDate = new Date();
  quitDate.setDate(quitDate.getDate() + daysOut);
  const quitDateISO = quitDate.toISOString().split('T')[0];

  // Method selection
  const method = level === 'very_high' || level === 'high' ? 'gradual' : 'cold_turkey';
  const methodReason = 
    method === 'gradual' 
      ? 'Your high dependence suggests a gradual reduction approach'
      : 'Your moderate dependence allows for a direct quit approach';

  // Financial calculation
  const yearlySpendUSD = Math.round(estSpendPerWeekUSD * 52);

  // Key drivers from inputs
  const keyDrivers: string[] = [];
  const reasons = inputs['reasons'] || [];
  if (reasons.includes('health')) keyDrivers.push('Health concerns');
  if (reasons.includes('money')) keyDrivers.push('Financial savings');
  if (reasons.includes('control')) keyDrivers.push('Regain control');
  if (reasons.includes('social')) keyDrivers.push('Social/family pressure');
  if (keyDrivers.length === 0) keyDrivers.push('Personal wellness');

  // First steps based on level
  const firstSteps: string[] = [];
  if (level === 'very_high' || level === 'high') {
    firstSteps.push('Track your current usage for 3 days');
    firstSteps.push('Identify your strongest triggers');
    firstSteps.push('Plan gradual reduction schedule');
  } else {
    firstSteps.push('Set your quit date');
    firstSteps.push('Remove vaping supplies from easy reach');
    firstSteps.push('Plan alternative activities for triggers');
  }

  return {
    quitDateISO,
    method,
    methodReason,
    yearlySpendUSD,
    keyDrivers,
    firstSteps,
  };
}

export function computeOutcome(inputs: Record<string, any>) {
  const dependence = scoreDependence(inputs);
  const plan = buildQuitPlan(dependence, inputs);
  return { dependence, plan };
}