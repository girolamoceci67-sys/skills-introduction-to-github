export const colors = {
  background: '#FBFAF7',
  surface: '#FFFFFF',
  primary: '#2F6F4E',
  primaryDark: '#1F4D36',
  text: '#1B1B18',
  textMuted: '#6B6B63',
  border: '#E4E1D8',
  success: '#2F6F4E',
  warning: '#B8863B',
  danger: '#B3462C',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radii = {
  sm: 8,
  md: 14,
  lg: 22,
} as const;

export const typography = {
  title: { fontSize: 26, fontWeight: '700' as const },
  heading: { fontSize: 20, fontWeight: '700' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  caption: { fontSize: 13, fontWeight: '500' as const },
};
