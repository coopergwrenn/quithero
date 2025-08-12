import { ActivityIndicator, Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'md' | 'lg';

export default function Button({
  title,
  onPress,
  disabled,
  loading,
  variant = 'primary',
  size = 'lg',
  style,
}: {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: Variant;
  size?: Size;
  style?: ViewStyle;
}) {
  const t = useTheme();
  const bg =
    variant === 'primary' ? t.colors.accent :
    variant === 'outline' ? 'transparent' : 'transparent';
  const borderW = variant === 'outline' ? 1 : 0;
  const color =
    variant === 'primary' ? '#fff' : t.colors.text;
  const padV = size === 'lg' ? 14 : 10;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.btn(t),
        { backgroundColor: bg, paddingVertical: padV, borderWidth: borderW, borderColor: t.colors.border },
        disabled ? { opacity: 0.6 } : null,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={color} />
      ) : (
        <Text style={[styles.txt, { color }]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: (t: ReturnType<typeof useTheme>) => ({
    borderRadius: t.radii.lg,
    alignItems: 'center',
  }),
  txt: { fontSize: 16, fontWeight: '700' as const },
});