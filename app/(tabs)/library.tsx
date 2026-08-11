import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { Screen } from '../../src/components/Screen';
import { Tag } from '../../src/components/Tag';
import { getCurrentUser } from '../../src/data/repositories/userRepository';
import { useRefreshBus } from '../../src/data/refreshBus';
import { dumbbellLibrary } from '../../src/domain/exercises/dumbbellLibrary';
import { useExerciseContent } from '../../src/domain/exercises/exerciseContent';
import { exerciseLibrary } from '../../src/domain/exercises/library';
import { useLabels } from '../../src/domain/exercises/labels';
import type { Exercise, MuscleGroup } from '../../src/domain/exercises/types';
import { colors, radii, shadows, spacing, typography } from '../../src/theme/theme';

const GROUP_ORDER: MuscleGroup[] = [
  'legs_glutes',
  'push',
  'pull',
  'core',
  'mobility_cardio',
  'full_body',
  'chest',
  'back',
  'shoulders',
  'arms',
];

function groupExercises(exercises: Exercise[]): { group: MuscleGroup; items: Exercise[] }[] {
  return GROUP_ORDER.map((group) => ({
    group,
    items: exercises.filter((exercise) => exercise.muscleGroup === group),
  })).filter((section) => section.items.length > 0);
}

function ExerciseRow({ exercise }: { exercise: Exercise }) {
  const { t } = useTranslation();
  const content = useExerciseContent(exercise.id);
  const meta =
    exercise.equipment === 'dumbbell' && exercise.loadRangeKg
      ? t('library.levelBadgeDumbbell', {
          tier: exercise.baseDifficultyTier,
          min: exercise.loadRangeKg.min,
          max: exercise.loadRangeKg.max,
        })
      : t('library.levelBadge', { tier: exercise.baseDifficultyTier });

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => router.push(`/library/${exercise.id}`)}
      accessibilityRole="button"
    >
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{content.name}</Text>
        <Text style={styles.cardMeta}>{meta}</Text>
      </View>
      {exercise.contraindicationTags.includes('none') ? null : <Tag label={t('library.excludedBadge')} />}
    </Pressable>
  );
}

export default function Library() {
  const { t } = useTranslation();
  const { muscleGroupLabels } = useLabels();
  const version = useRefreshBus((state) => state.version);
  const [dumbbellUnlocked, setDumbbellUnlocked] = useState(false);

  useEffect(() => {
    getCurrentUser().then((user) => setDumbbellUnlocked(Boolean(user?.dumbbellModuleUnlocked)));
  }, [version]);

  const sections = groupExercises(dumbbellUnlocked ? [...exerciseLibrary, ...dumbbellLibrary] : exerciseLibrary);

  return (
    <Screen>
      <Text style={styles.title}>{t('library.title')}</Text>
      <Text style={styles.subtitle}>{t(dumbbellUnlocked ? 'library.subtitleWithDumbbell' : 'library.subtitle')}</Text>
      {sections.map((section) => (
        <View key={section.group} style={styles.section}>
          <Text style={styles.sectionTitle}>{muscleGroupLabels[section.group]}</Text>
          {section.items.map((exercise) => (
            <ExerciseRow key={exercise.id} exercise={exercise} />
          ))}
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.title, color: colors.text, marginBottom: spacing.xs },
  subtitle: { ...typography.body, color: colors.textMuted, marginBottom: spacing.lg },
  section: { marginBottom: spacing.lg },
  sectionTitle: {
    ...typography.heading,
    fontSize: 17,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.sm,
    ...shadows.card,
  },
  cardPressed: { opacity: 0.7 },
  cardText: { flex: 1 },
  cardTitle: { ...typography.body, fontWeight: '600', color: colors.text },
  cardMeta: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
});
