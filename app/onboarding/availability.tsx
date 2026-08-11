import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { PrimaryButton } from '../../src/components/PrimaryButton';
import { Screen } from '../../src/components/Screen';
import { SelectableCard } from '../../src/components/SelectableCard';
import { StepProgress } from '../../src/components/StepProgress';
import { daysPerWeekOptions } from '../../src/features/onboarding/onboardingContent';
import { useOnboardingStore } from '../../src/features/onboarding/onboardingStore';
import { colors, spacing, typography } from '../../src/theme/theme';

export default function OnboardingAvailability() {
  const { t } = useTranslation();
  const daysPerWeekAvailable = useOnboardingStore((state) => state.daysPerWeekAvailable);
  const setDaysPerWeekAvailable = useOnboardingStore((state) => state.setDaysPerWeekAvailable);

  return (
    <Screen>
      <StepProgress currentStep={3} totalSteps={5} />
      <View style={styles.header}>
        <Text style={styles.title}>{t('onboarding.availabilityTitle')}</Text>
        <Text style={styles.subtitle}>{t('onboarding.availabilitySubtitle')}</Text>
      </View>
      <View style={styles.options}>
        {daysPerWeekOptions.map((days) => (
          <SelectableCard
            key={days}
            title={t('onboarding.daysPerWeek', { count: days })}
            selected={daysPerWeekAvailable === days}
            onPress={() => setDaysPerWeekAvailable(days)}
          />
        ))}
      </View>
      <PrimaryButton
        label={t('common.continue')}
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
