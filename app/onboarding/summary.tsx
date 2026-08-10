import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { PrimaryButton } from '../../src/components/PrimaryButton';
import { Screen } from '../../src/components/Screen';
import { createUserFromOnboarding } from '../../src/data/repositories/userRepository';
import { useOnboardingStore } from '../../src/features/onboarding/onboardingStore';
import { colors, spacing, typography } from '../../src/theme/theme';

export default function OnboardingSummary() {
  const { startingLevel, goal, daysPerWeekAvailable, limitations, reset } = useOnboardingStore();
  const [status, setStatus] = useState<'saving' | 'error'>('saving');

  useEffect(() => {
    if (!startingLevel || !goal || !daysPerWeekAvailable) {
      setStatus('error');
      return;
    }
    let cancelled = false;
    setStatus('saving');
    createUserFromOnboarding({ startingLevel, goal, daysPerWeekAvailable, limitations })
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
          <Text style={styles.title}>Non siamo riusciti a salvare il profilo</Text>
          <Text style={styles.subtitle}>Controlla le risposte date nei passaggi precedenti e riprova.</Text>
        </View>
        <PrimaryButton label="Torna all'inizio" onPress={() => router.replace('/onboarding')} />
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.center}>
        <ActivityIndicator color={colors.primary} size="large" />
        <Text style={styles.title}>Stiamo preparando il tuo piano</Text>
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
