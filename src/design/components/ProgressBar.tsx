import { View } from 'react-native';
import { useTheme } from '../theme';

export default function ProgressBar({ progress = 0 }: { progress: number }) {
  const t = useTheme();
  const pct = Math.max(0, Math.min(1, progress));
  return (
    <View style={{ width: '100%', height: 8, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.06)' }}>
      <View style={{ width: `${pct * 100}%`, height: '100%', borderRadius: 999, backgroundColor: t.colors.accent }} />
    </View>
  );
}