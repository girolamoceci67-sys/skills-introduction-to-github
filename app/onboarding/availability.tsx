import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { PrimaryButton } from '../../src/components/PrimaryButton';
import { Screen } from '../../src/components/Screen';
import { SelectableCard } from '../../src/components/SelectableCard';
import { StepProgress } from '../../src/components/StepProgress';
import { daysPerWeekOptions } from '../../src/features/onboarding/onboardingContent';
import { useOnboardingStore } from '../../src/features/onboarding/onboardingStore';
import { colors, spacing, typography } from '../../src/theme/theme';

export default function OnboardingAvailability() {
  const daysPerWeekAvailable = useOnboardingStore((state) => state.daysPerWeekAvailable);
  const setDaysPerWeekAvailable = useOnboardingStore((state) => state.setDaysPerWeekAvailable);

  return (
    <Screen>
      <StepProgress currentStep={3} totalSteps={4} />
      <View style={styles.header}>
        <Text style={styles.title}>Quanti giorni a settimana puoi allenarti?</Text>
        <Text style={styles.subtitle}>
          Distribuiremo gli allenamenti nella settimana lasciando spazio al recupero.
        </Text>
      </View>
      <View style={styles.options}>
        {daysPerWeekOptions.map((days) => (
          <SelectableCard
            key={days}
            title={`${days} giorni a settimana`}
            selected={daysPerWeekAvailable === days}
            onPress={() => setDaysPerWeekAvailable(days)}
          />
        ))}
      </View>
      <PrimaryButton
        label="Continua"
        disabled={!daysPerWeekAvailable}
        onPress={() => router.push('/onboarding/limitations')}
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
