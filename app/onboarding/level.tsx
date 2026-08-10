import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { PrimaryButton } from '../../src/components/PrimaryButton';
import { Screen } from '../../src/components/Screen';
import { SelectableCard } from '../../src/components/SelectableCard';
import { StepProgress } from '../../src/components/StepProgress';
import { startingLevelOptions } from '../../src/features/onboarding/onboardingContent';
import { useOnboardingStore } from '../../src/features/onboarding/onboardingStore';
import { colors, spacing, typography } from '../../src/theme/theme';

export default function OnboardingLevel() {
  const startingLevel = useOnboardingStore((state) => state.startingLevel);
  const setStartingLevel = useOnboardingStore((state) => state.setStartingLevel);

  return (
    <Screen>
      <StepProgress currentStep={1} totalSteps={4} />
      <View style={styles.header}>
        <Text style={styles.title}>Da dove parti?</Text>
        <Text style={styles.subtitle}>Serve per calibrare l’intensità del primo piano.</Text>
      </View>
      <View style={styles.options}>
        {startingLevelOptions.map((option) => (
          <SelectableCard
            key={option.value}
            title={option.title}
            description={option.description}
            selected={startingLevel === option.value}
            onPress={() => setStartingLevel(option.value)}
          />
        ))}
      </View>
      <PrimaryButton
        label="Continua"
        disabled={!startingLevel}
        onPress={() => router.push('/onboarding/goal')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
  },
  options: {
    flex: 1,
  },
});
