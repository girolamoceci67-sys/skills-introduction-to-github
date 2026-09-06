import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { NumberPicker } from '../src/components/NumberPicker';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { Screen } from '../src/components/Screen';
import { SelectableCard } from '../src/components/SelectableCard';
import { getCurrentUser, updateUser } from '../src/data/repositories/userRepository';
import { DUMBBELL_RANGE_OPTIONS_KG } from '../src/features/onboarding/onboardingContent';
import type { UserProfile } from '../src/domain/exercises/types';
import { colors, spacing, typography } from '../src/theme/theme';

export default function DumbbellReask() {
  const { t } = useTranslation();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [hasDumbbells, setHasDumbbells] = useState<boolean | null>(null);
  const [minKg, setMinKg] = useState<number | null>(null);
  const [maxKg, setMaxKg] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  if (!user) {
    return (
      <Screen>
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} />
        </View>
      </Screen>
    );
  }

  const canConfirm = hasDumbbells === false || (hasDumbbells === true && minKg !== null && maxKg !== null);

  const save = async (dismissOnly: boolean) => {
    setSaving(true);
    try {
      if (dismissOnly) {
        await updateUser({ ...user, dumbbellReaskDismissed: true });
      } else if (hasDumbbells) {
        await updateUser({
          ...user,
          hasDumbbells: true,
          dumbbellMinKg: minKg,
          dumbbellMaxKg: maxKg,
          dumbbellModuleUnlocked: true,
          dumbbellReaskDismissed: true,
        });
      } else {
        await updateUser({ ...user, hasDumbbells: false, dumbbellReaskDismissed: true });
      }
      router.back();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>{t('dumbbellReask.title')}</Text>
        <Text style={styles.subtitle}>{t('dumbbellReask.subtitle')}</Text>
      </View>
      <View style={styles.options}>
        <SelectableCard
          title={t('dumbbellReask.yes')}
          selected={hasDumbbells === true}
          onPress={() => setHasDumbbells(true)}
        />
        <SelectableCard
          title={t('dumbbellReask.no')}
          selected={hasDumbbells === false}
          onPress={() => {
            setHasDumbbells(false);
            setMinKg(null);
            setMaxKg(null);
          }}
        />
        {hasDumbbells === true ? (
          <View style={styles.rangeBlock}>
            <Text style={styles.rangeLabel}>{t('dumbbellReask.minLabel')}</Text>
            <NumberPicker options={DUMBBELL_RANGE_OPTIONS_KG} selected={minKg} onSelect={setMinKg} />
            <Text style={styles.rangeLabel}>{t('dumbbellReask.maxLabel')}</Text>
            <NumberPicker options={DUMBBELL_RANGE_OPTIONS_KG} selected={maxKg} onSelect={setMaxKg} />
          </View>
        ) : null}
      </View>
      <PrimaryButton
        label={t('dumbbellReask.confirm')}
        disabled={!canConfirm || saving}
        onPress={() => save(false)}
      />
      <PrimaryButton label={t('dumbbellReask.skip')} disabled={saving} onPress={() => save(true)} variant="secondary" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: { marginBottom: spacing.lg },
  title: { ...typography.heading, color: colors.text, marginBottom: spacing.xs },
  subtitle: { ...typography.body, color: colors.textMuted },
  options: { flex: 1 },
  rangeBlock: { marginTop: spacing.md, gap: spacing.xs },
  rangeLabel: { ...typography.caption, color: colors.textMuted, marginTop: spacing.sm },
});
