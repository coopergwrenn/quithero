export type DependenceLevel = 'low'|'moderate'|'high'|'very_high';
export type DependenceResult = {
  score: number;
  level: DependenceLevel;
  rationale: string[];
  estNicotineMgPerDay: number;
  estSpendPerWeekUSD: number;
};

const num = (v: any, d=0) => {
  const n = typeof v === 'number' ? v : parseFloat(String(v ?? ''));
  return Number.isFinite(n) ? n : d;
};

export function scoreDependence(inputs: Record<string, any>): DependenceResult {
  const wake = String(inputs['wake_latency'] ?? '');
  const nic = String(inputs['nic_strength'] ?? '');
  const cons = String(inputs['consumption_proxy'] ?? '');
  const podsPerWeek = num(inputs['pods_per_week'], 0);
  const puffs = String(inputs['puffs_per_day'] ?? '');
  const night = String(inputs['night_wake'] ?? '');
  const refrain = String(inputs['refrain_restricted'] ?? '');
  const attempts = String(inputs['attempts'] ?? '');
  const spendWeek = num(inputs['spend_week'], -1);

  // Weights (non-medical heuristic)
  const wakePts = ({ min5:10, min30:7, hour1:4, gt60:1 } as any)[wake] ?? 0;
  const nicPts = ({ salt50:6, mid25_35:4, low3_6:2, zero:0, unsure:3 } as any)[nic] ?? 0;
  const consPts = ({ lt_day:6, one_two_days:4, three_five_days:2, weekplus:1, na:0 } as any)[cons] ?? 0;
  const podsPts = podsPerWeek>=10?6: podsPerWeek>=6?4: podsPerWeek>=3?3: podsPerWeek>=1?2: 0;
  const puffsPts = ({ lt100:1, '100_200':3, '200_400':5, gt400:7 } as any)[puffs] ?? 0;
  const nightPts = ({ never:0, rarely:2, sometimes:4, often:6 } as any)[night] ?? 0;
  const refrainPts = ({ easy:0, somewhat:2, hard:4, impossible:6 } as any)[refrain] ?? 0;
  const attemptsPts = ({ zero:0, one:1, two_three:2, four_plus:3 } as any)[attempts] ?? 0;

  const score = wakePts + nicPts + consPts + podsPts + puffsPts + nightPts + refrainPts + attemptsPts;

  // Level thresholds
  const level: DependenceLevel = 
    score >= 35 ? 'very_high' :
    score >= 25 ? 'high' :
    score >= 15 ? 'moderate' : 'low';

  // Rationale bullets
  const rationale: string[] = [];
  if (wakePts >= 7) rationale.push('You vape within 30 minutes of waking');
  if (nicPts >= 4) rationale.push('High nicotine strength increases dependence');
  if (consPts >= 4) rationale.push('You consume pods/cartridges very quickly');
  if (podsPts >= 4) rationale.push('High weekly pod consumption');
  if (puffsPts >= 5) rationale.push('High daily puff count');
  if (nightPts >= 4) rationale.push('You wake up at night to vape');
  if (refrainPts >= 4) rationale.push('Difficulty refraining in restricted areas');
  if (attemptsPts >= 2) rationale.push('Multiple previous quit attempts');

  // Estimates
  const nicStrengthMg = ({ salt50:50, mid25_35:30, low3_6:5, zero:0, unsure:25 } as any)[nic] ?? 25;
  const dailyPuffs = ({ lt100:75, '100_200':150, '200_400':300, gt400:500 } as any)[puffs] ?? 200;
  const estNicotineMgPerDay = (nicStrengthMg * dailyPuffs) / 100; // rough estimate

  const estSpendPerWeekUSD = spendWeek > 0 ? spendWeek : podsPerWeek * 8; // $8/pod fallback

  return { score, level, rationale, estNicotineMgPerDay, estSpendPerWeekUSD };
}