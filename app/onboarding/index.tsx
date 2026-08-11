import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { PrimaryButton } from '../../src/components/PrimaryButton';
import { Screen } from '../../src/components/Screen';
import { colors, spacing, typography } from '../../src/theme/theme';

export default function OnboardingWelcome() {
  const { t } = useTranslation();

  return (
    <Screen>
      <View style={styles.content}>
        <Text style={styles.title}>{t('onboarding.welcomeTitle')}</Text>
        <Text style={styles.body}>{t('onboarding.welcomeBody')}</Text>
        <Text style={styles.disclaimer}>{t('onboarding.welcomeDisclaimer')}</Text>
      </View>
      <PrimaryButton label={t('onboarding.start')} onPress={() => router.push('/onboarding/level')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.md,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  body: {
    ...typography.body,
    color: colors.text,
  },
  disclaimer: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
