import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { PrimaryButton } from '../../src/components/PrimaryButton';
import { Screen } from '../../src/components/Screen';
import { createUserFromOnboarding } from '../../src/data/repositories/userRepository';
import { useOnboardingStore } from '../../src/features/onboarding/onboardingStore';
import { colors, spacing, typography } from '../../src/theme/theme';

export default function OnboardingSummary() {
  const { t } = useTranslation();
  const { startingLevel, goal, daysPerWeekAvailable, limitations, hasDumbbells, dumbbellMinKg, dumbbellMaxKg, reset } =
    useOnboardingStore();
  const [status, setStatus] = useState<'saving' | 'error'>('saving');

  useEffect(() => {
    if (!startingLevel || !goal || !daysPerWeekAvailable || hasDumbbells === null) {
      setStatus('error');
      return;
    }
    let cancelled = false;
    setStatus('saving');
    createUserFromOnboarding({
      startingLevel,
      goal,
      daysPerWeekAvailable,
      limitations,
      hasDumbbells,
      dumbbellMinKg,
      dumbbellMaxKg,
    })
      .then(() => {
        if (cancelled) return;
        reset();
        router.replace('/(tabs)/home');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === 'error') {
    return (
      <Screen>
        <View style={styles.center}>
          <Text style={styles.title}>{t('onboarding.saveErrorTitle')}</Text>
          <Text style={styles.subtitle}>{t('onboarding.saveErrorSubtitle')}</Text>
        </View>
        <PrimaryButton label={t('onboarding.backToStart')} onPress={() => router.replace('/onboarding')} />
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.center}>
        <ActivityIndicator color={colors.primary} size="large" />
        <Text style={styles.title}>{t('onboarding.preparingPlan')}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  title: {
    ...typography.heading,
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
