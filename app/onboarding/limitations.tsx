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

export default function OnboardingLimitations() {
  const { t } = useTranslation();
  const { limitationOptions } = useOnboardingOptions();
  const limitations = useOnboardingStore((state) => state.limitations);
  const toggleLimitation = useOnboardingStore((state) => state.toggleLimitation);
  const hasSelection = limitations.length > 0;

  return (
    <Screen>
      <StepProgress currentStep={4} totalSteps={5} />
      <View style={styles.header}>
        <Text style={styles.title}>{t('onboarding.limitationsTitle')}</Text>
        <Text style={styles.subtitle}>{t('onboarding.limitationsSubtitle')}</Text>
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
      <Text style={styles.disclaimer}>{t('onboarding.limitationsDisclaimer')}</Text>
      <PrimaryButton
        label={t('common.continue')}
        disabled={!hasSelection}
        onPress={() => router.push('/onboarding/equipment')}
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
