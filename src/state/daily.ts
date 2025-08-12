import { useStoredState } from '~/utils/useStoredState';

export function useDailyChecklist(dateISO: string, itemCount: number) {
  const key = 'qv-checklist-' + (dateISO ?? '').slice(0,10);
  const [state, setState] = useStoredState<Record<number, boolean>>(key, {});
  function toggle(i: number) { setState(prev => ({ ...prev, [i]: !prev[i] })); }
  function isDone(i: number) { return !!state[i]; }
  function reset() { setState({}); }
  const doneCount = Object.values(state).filter(Boolean).length;
  const allDone = doneCount >= itemCount && itemCount > 0;
  return { isDone, toggle, reset, doneCount, allDone };
}