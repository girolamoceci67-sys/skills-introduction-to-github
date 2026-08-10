import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '../theme/theme';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[styles.dot, index < currentStep ? styles.dotFilled : styles.dotEmpty]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  dot: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  dotFilled: {
    backgroundColor: colors.primary,
  },
  dotEmpty: {
    backgroundColor: colors.border,
  },
});
