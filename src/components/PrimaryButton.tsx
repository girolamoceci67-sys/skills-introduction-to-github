import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radii, spacing, typography } from '../theme/theme';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export function PrimaryButton({ label, onPress, disabled, variant = 'primary' }: PrimaryButtonProps) {
  const isSecondary = variant === 'secondary';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        isSecondary ? styles.secondary : styles.primary,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text style={[styles.label, isSecondary && styles.labelSecondary]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  disabled: {
    opacity: 0.4,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    ...typography.body,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  labelSecondary: {
    color: colors.text,
  },
});
