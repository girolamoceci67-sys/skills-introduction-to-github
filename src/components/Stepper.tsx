import { StyleSheet, Text, View } from 'react-native';

import { AnimatedPressable } from './AnimatedPressable';
import { colors, radii, spacing, typography } from '../theme/theme';

interface StepperProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

/** Contatore +/- compatto, usato per far scegliere al master serie/ripetizioni/riposo di un esercizio. */
export function Stepper({ label, value, onChange, min = 0, max = 999, step = 1 }: StepperProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <AnimatedPressable
          style={styles.btn}
          scaleTo={0.85}
          onPress={() => onChange(Math.max(min, value - step))}
          accessibilityRole="button"
          accessibilityLabel={`Diminuisci ${label}`}
        >
          <Text style={styles.btnLabel}>−</Text>
        </AnimatedPressable>
        <Text style={styles.value}>{value}</Text>
        <AnimatedPressable
          style={styles.btn}
          scaleTo={0.85}
          onPress={() => onChange(Math.min(max, value + step))}
          accessibilityRole="button"
          accessibilityLabel={`Aumenta ${label}`}
        >
          <Text style={styles.btnLabel}>+</Text>
        </AnimatedPressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: 4 },
  label: { ...typography.caption, color: colors.textMuted },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  btn: {
    width: 32,
    height: 32,
    borderRadius: radii.sm,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLabel: { ...typography.body, fontWeight: '700', color: colors.primaryDark },
  value: { ...typography.body, fontWeight: '700', color: colors.text, minWidth: 32, textAlign: 'center' },
});
