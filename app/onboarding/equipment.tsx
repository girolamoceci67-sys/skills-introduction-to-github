import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { NumberPicker } from '../../src/components/NumberPicker';
import { PrimaryButton } from '../../src/components/PrimaryButton';
import { Screen } from '../../src/components/Screen';
import { SelectableCard } from '../../src/components/SelectableCard';
import { StepProgress } from '../../src/components/StepProgress';
import { DUMBBELL_RANGE_OPTIONS_KG } from '../../src/features/onboarding/onboardingContent';
import { useOnboardingStore } from '../../src/features/onboarding/onboardingStore';
import { colors, spacing, typography } from '../../src/theme/theme';

export default function OnboardingEquipment() {
  const { t } = useTranslation();
  const hasDumbbells = useOnboardingStore((state) => state.hasDumbbells);
  const dumbbellMinKg = useOnboardingStore((state) => state.dumbbellMinKg);
  const dumbbellMaxKg = useOnboardingStore((state) => state.dumbbellMaxKg);
  const setHasDumbbells = useOnboardingStore((state) => state.setHasDumbbells);
  const setDumbbellMinKg = useOnboardingStore((state) => state.setDumbbellMinKg);
  const setDumbbellMaxKg = useOnboardingStore((state) => state.setDumbbellMaxKg);

  const canContinue = hasDumbbells === false || (hasDumbbells === true && dumbbellMinKg !== null && dumbbellMaxKg !== null);

  return (
    <Screen>
      <StepProgress currentStep={5} totalSteps={5} />
      <View style={styles.header}>
        <Text style={styles.title}>{t('onboarding.equipmentTitle')}</Text>
        <Text style={styles.subtitle}>{t('onboarding.equipmentSubtitle')}</Text>
      </View>
      <View style={styles.options}>
        <SelectableCard
          title={t('onboarding.equipmentYes')}
          selected={hasDumbbells === true}
          onPress={() => setHasDumbbells(true)}
        />
        <SelectableCard
          title={t('onboarding.equipmentNo')}
          selected={hasDumbbells === false}
          onPress={() => setHasDumbbells(false)}
        />
        {hasDumbbells === true ? (
          <View style={styles.rangeBlock}>
            <Text style={styles.rangeLabel}>{t('onboarding.equipmentMinLabel')}</Text>
            <NumberPicker options={DUMBBELL_RANGE_OPTIONS_KG} selected={dumbbellMinKg} onSelect={setDumbbellMinKg} />
            <Text style={styles.rangeLabel}>{t('onboarding.equipmentMaxLabel')}</Text>
            <NumberPicker options={DUMBBELL_RANGE_OPTIONS_KG} selected={dumbbellMaxKg} onSelect={setDumbbellMaxKg} />
          </View>
        ) : null}
      </View>
      <PrimaryButton label={t('onboarding.createPlan')} disabled={!canContinue} onPress={() => router.push('/onboarding/summary')} />
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
  rangeBlock: {
    marginTop: spacing.md,
    gap: spacing.xs,
  },
  rangeLabel: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
});
