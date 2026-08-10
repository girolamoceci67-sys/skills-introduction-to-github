import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { PrimaryButton } from '../../src/components/PrimaryButton';
import { Screen } from '../../src/components/Screen';
import { SelectableCard } from '../../src/components/SelectableCard';
import { StepProgress } from '../../src/components/StepProgress';
import { limitationOptions } from '../../src/features/onboarding/onboardingContent';
import { useOnboardingStore } from '../../src/features/onboarding/onboardingStore';
import { colors, spacing, typography } from '../../src/theme/theme';

export default function OnboardingLimitations() {
  const limitations = useOnboardingStore((state) => state.limitations);
  const toggleLimitation = useOnboardingStore((state) => state.toggleLimitation);
  const hasSelection = limitations.length > 0;

  return (
    <Screen>
      <StepProgress currentStep={4} totalSteps={4} />
      <View style={styles.header}>
        <Text style={styles.title}>Hai limitazioni fisiche da segnalare?</Text>
        <Text style={styles.subtitle}>
          Eviteremo o adatteremo gli esercizi che le coinvolgono direttamente. Puoi selezionarne
          più di una.
        </Text>
      </View>
      <View style={styles.options}>
        {limitationOptions.map((option) => (
          <SelectableCard
            key={option.value}
            title={option.title}
            description={option.description}
            selected={limitations.includes(option.value)}
            onPress={() => toggleLimitation(option.value)}
          />
        ))}
      </View>
      <Text style={styles.disclaimer}>
        Queste informazioni servono solo a personalizzare la selezione degli esercizi e non
        costituiscono una valutazione medica.
      </Text>
      <PrimaryButton
        label="Crea il mio piano"
        disabled={!hasSelection}
        onPress={() => router.push('/onboarding/summary')}
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
  disclaimer: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
});
