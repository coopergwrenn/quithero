import { Pressable, Text, View, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

export type PillOption = { value: string; label: string };
export default function PillChoice({
  options, value, onChange, multi = false, max = Infinity,
}: {
  options: PillOption[];
  value: string | string[] | undefined;
  onChange: (next: string | string[]) => void;
  multi?: boolean;
  max?: number;
}) {
  const t = useTheme();
  const selected = Array.isArray(value) ? value : value ? [value] : [];
  function toggle(v: string) {
    if (!multi) return onChange(v);
    const has = selected.includes(v);
    const next = has ? selected.filter(x => x !== v) : selected.length < max ? [...selected, v] : selected;
    onChange(next);
  }
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      {options.map(opt => {
        const is = selected.includes(opt.value);
        return (
          <Pressable
            key={opt.value}
            onPress={() => toggle(opt.value)}
            style={[styles.pill(t), is && { backgroundColor: t.colors.accent }]}
          >
            <Text style={[styles.txt, is && { color: '#fff' }]}>{opt.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  pill: (t: ReturnType<typeof useTheme>) => ({
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: 'rgba(255,255,255,0.03)',
  }),
  txt: { color: '#E5E7EB', fontSize: 14, fontWeight: '600' as const },
});