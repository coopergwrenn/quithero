import { useColorScheme } from 'react-native';
import { palette, radii, shadow, type, spacing } from './tokens';

export function useTheme() {
  // We keep a dark-first aesthetic; support light later if needed.
  const scheme = useColorScheme();
  const dark = {
    colors: {
      bg: palette.bg,
      bgElevated: palette.bgElevated,
      card: palette.card,
      text: palette.text,
      subtext: palette.subtext,
      border: palette.border,
      accent: palette.accent,
      accentDark: palette.accentDark,
      success: palette.success,
      warning: palette.warning,
      danger: palette.danger,
    },
    radii, shadow, type, spacing
  };
  return dark;
}