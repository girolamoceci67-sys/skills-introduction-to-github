import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { FadeInDown } from 'react-native-reanimated';

import { AnimatedPressable } from '../../src/components/AnimatedPressable';
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

/** Oltre le prime righe lo scaglionamento si ferma (arrivano già tutte "vicine" nel tempo): evita un'attesa lunga per scorrere liste ampie. */
const MAX_STAGGERED_ROWS = 8;
const STAGGER_STEP_MS = 35;

function ExerciseRow({ exercise, index }: { exercise: Exercise; index: number }) {
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
    <AnimatedPressable
      entering={FadeInDown.delay(Math.min(index, MAX_STAGGERED_ROWS) * STAGGER_STEP_MS).damping(18)}
      style={styles.card}
      scaleTo={0.98}
      onPress={() => router.push(`/library/${exercise.id}`)}
      accessibilityRole="button"
    >
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{content.name}</Text>
        <Text style={styles.cardMeta}>{meta}</Text>
      </View>
      {exercise.contraindicationTags.includes('none') ? null : <Tag label={t('library.excludedBadge')} />}
    </AnimatedPressable>
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
  let rowIndex = 0;

  return (
    <Screen>
      <Text style={styles.title}>{t('library.title')}</Text>
      <Text style={styles.subtitle}>{t(dumbbellUnlocked ? 'library.subtitleWithDumbbell' : 'library.subtitle')}</Text>
      {sections.map((section) => (
        <View key={section.group} style={styles.section}>
          <Text style={styles.sectionTitle}>{muscleGroupLabels[section.group]}</Text>
          {section.items.map((exercise) => (
            <ExerciseRow key={exercise.id} exercise={exercise} index={rowIndex++} />
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
  cardText: { flex: 1 },
  cardTitle: { ...typography.body, fontWeight: '600', color: colors.text },
  cardMeta: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
});
