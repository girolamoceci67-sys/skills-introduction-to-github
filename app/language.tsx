import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { Screen } from '../src/components/Screen';
import { changeLanguage } from '../src/i18n';
import { SUPPORTED_LANGUAGES } from '../src/i18n/languages';
import { colors, radii, shadows, spacing, typography } from '../src/theme/theme';

export default function LanguageSelect() {
  const { t } = useTranslation();

  async function selectLanguage(code: string) {
    await changeLanguage(code);
    router.replace('/login');
  }

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>{t('language.title')}</Text>
        <Text style={styles.subtitle}>{t('language.subtitle')}</Text>
      </View>
      <View style={styles.list}>
        {SUPPORTED_LANGUAGES.map((lang) => (
          <Pressable
            key={lang.code}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => selectLanguage(lang.code)}
            accessibilityRole="button"
          >
            <Text style={styles.flag}>{lang.flag}</Text>
            <Text style={styles.name}>{lang.nativeName}</Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
  },
  list: {
    gap: spacing.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.md,
    ...shadows.card,
  },
  cardPressed: {
    opacity: 0.7,
  },
  flag: {
    fontSize: 28,
  },
  name: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
  },
});
