import { useStoredState } from '~/utils/useStoredState';

export function useEntitlements() {
  const [isPro, setIsPro] = useStoredState<boolean>('qv-pro', false);
  function mockPurchase() { setIsPro(true); }
  return { isPro, mockPurchase };
}