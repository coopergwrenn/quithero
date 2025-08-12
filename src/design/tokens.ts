export const palette = {
  bgLight: '#0b1220',
  bg: '#0f172a',          // slate-900
  bgElevated: '#111827',  // gray-900
  card: '#111827',
  card2: '#0b1324',
  text: '#E5E7EB',
  subtext: '#9CA3AF',
  border: 'rgba(255,255,255,0.08)',
  accent: '#2563EB',      // blue-600
  accentDark: '#1E40AF',  // blue-800
  success: '#10B981',     // emerald-500
  warning: '#F59E0B',     // amber-500
  danger: '#EF4444',      // red-500
};

export const radii = { md: 14, lg: 20, xl: 24, full: 999 };
export const spacing = (n: number) => n * 8;
export const shadow = {
  card: {
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
};

export const type = {
  h1: { fontSize: 28, fontWeight: '800' as const, letterSpacing: 0.2 },
  h2: { fontSize: 22, fontWeight: '700' as const },
  body: { fontSize: 16, fontWeight: '500' as const },
  small: { fontSize: 13, color: palette.subtext as const },
};