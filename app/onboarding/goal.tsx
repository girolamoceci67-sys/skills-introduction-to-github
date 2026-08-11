import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { PrimaryButton } from '../../src/components/PrimaryButton';
import { Screen } from '../../src/components/Screen';
import { SelectableCard } from '../../src/components/SelectableCard';
import { StepProgress } from '../../src/components/StepProgress';
import { useOnboardingOptions } from '../../src/features/onboarding/onboardingContent';
import { useOnboardingStore } from '../../src/features/onboarding/onboardingStore';
import { colors, spacing, typography } from '../../src/theme/theme';

export default function OnboardingGoal() {
  const { t } = useTranslation();
  const { goalOptions } = useOnboardingOptions();
  const goal = useOnboardingStore((state) => state.goal);
  const setGoal = useOnboardingStore((state) => state.setGoal);

  return (
    <Screen>
      <StepProgress currentStep={2} totalSteps={4} />
      <View style={styles.header}>
        <Text style={styles.title}>{t('onboarding.goalTitle')}</Text>
        <Text style={styles.subtitle}>{t('onboarding.goalSubtitle')}</Text>
      </View>
      <View style={styles.options}>
        {goalOptions.map((option) => (
          <SelectableCard
            key={option.value}
            title={option.title}
            description={option.description}
            selected={goal === option.value}
            onPress={() => setGoal(option.value)}
          />
        ))}
      </View>
      <PrimaryButton
        label={t('common.continue')}
        disabled={!goal}
        onPress={() => router.push('/onboarding/availability')}
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
