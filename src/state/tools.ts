import { useStoredState } from '~/utils/useStoredState';

type ToolsState = { panicPreviewUsed: boolean; lastPanicAt?: string; };
const initial: ToolsState = { panicPreviewUsed: false };

export function useToolsState() {
  const [s, setS] = useStoredState<ToolsState>('qv-tools', initial);
  function markPanicUsed() { setS(prev => ({ ...prev, panicPreviewUsed: true, lastPanicAt: new Date().toISOString() })); }
  return { tools: s, markPanicUsed };
}