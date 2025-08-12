import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '../theme';

export default function Card(props: ViewProps) {
  const t = useTheme();
  return <View {...props} style={[styles.card(t), props.style]} />;
}

const styles = StyleSheet.create({
  card: (t: ReturnType<typeof useTheme>) => ({
    backgroundColor: t.colors.card,
    borderRadius: t.radii.xl,
    borderWidth: 1,
    borderColor: t.colors.border,
    padding: t.spacing(2),
    ...t.shadow.card,
  }),
});