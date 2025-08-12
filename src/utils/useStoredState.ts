import { useEffect, useState } from 'react';
import { getItem, setItem } from '~/utils/storage';

export function useStoredState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = getItem(key);
    if (raw != null) {
      try { setValue(JSON.parse(raw)); } catch { /* ignore */ }
    }
    setReady(true);
  }, [key]);

  function update(next: T | ((prev: T) => T)) {
    setValue(prev => {
      const v = typeof next === 'function' ? (next as any)(prev) : next;
      try { setItem(key, JSON.stringify(v)); } catch {}
      return v;
    });
  }
  return [value, update, ready] as const;
}