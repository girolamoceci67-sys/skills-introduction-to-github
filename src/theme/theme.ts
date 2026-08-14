export const colors = {
  background: '#EAF2EC',
  surface: '#FFFFFF',
  primary: '#1E6B4F',
  primaryDark: '#153A28',
  accent: '#E07A3F',
  text: '#1B1B18',
  textMuted: '#6B6B63',
  border: '#EDEAE2',
  success: '#1E6B4F',
  warning: '#B8863B',
  danger: '#B3462C',
} as const;

/** Palette dedicata alla figura animata negli esercizi: più "illustrazione" che stick-figure puro. */
export const figureColors = {
  skin: '#D9A87B',
  skinShadow: '#C4915F',
  top: '#1E6B4F',
  bottoms: '#153A28',
  shoes: '#1B1B18',
  shadowOnGround: 'rgba(27, 27, 24, 0.14)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radii = {
  sm: 10,
  md: 18,
  lg: 26,
} as const;

export const typography = {
  title: { fontSize: 26, fontWeight: '700' as const },
  heading: { fontSize: 20, fontWeight: '700' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  caption: { fontSize: 13, fontWeight: '500' as const },
};

export const shadows = {
  card: {
    shadowColor: '#1B1B18',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
} as const;
