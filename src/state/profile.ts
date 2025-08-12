import { useStoredState } from '~/utils/useStoredState';

type Profile = { quitDateISO: string | null; spendPerWeekUSD: number | null; };
const initial: Profile = { quitDateISO: null, spendPerWeekUSD: null };

export function useProfile() {
  const [p, setP] = useStoredState<Profile>('qv-profile', initial);
  function setQuitDate(iso: string) { setP(prev => ({ ...prev, quitDateISO: iso })); }
  function setSpendPerWeek(n: number) { setP(prev => ({ ...prev, spendPerWeekUSD: n })); }
  return { profile: p, setQuitDate, setSpendPerWeek };
}