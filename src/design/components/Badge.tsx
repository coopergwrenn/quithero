import { Text, View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

export default function Badge({ label, style }: { label: string; style?: ViewStyle }) {
  const t = useTheme();
  return (
    <View style={[styles.badge(t), style]}>
      <Text style={styles.txt}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: (t: ReturnType<typeof useTheme>) => ({
    alignSelf: 'flex-start',
    backgroundColor: t.colors.accentDark,
    borderRadius: t.radii.full,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: t.colors.border,
  }),
  txt: { color: '#fff', fontSize: 12, fontWeight: '700' as const, letterSpacing: 0.3 },
});