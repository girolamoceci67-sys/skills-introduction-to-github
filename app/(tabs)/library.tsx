import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { Screen } from '../../src/components/Screen';
import { Tag } from '../../src/components/Tag';
import { exerciseLibrary } from '../../src/domain/exercises/library';
import { muscleGroupLabels } from '../../src/domain/exercises/labels';
import type { Exercise, MuscleGroup } from '../../src/domain/exercises/types';
import { colors, radii, shadows, spacing, typography } from '../../src/theme/theme';

const GROUP_ORDER: MuscleGroup[] = [
  'legs_glutes',
  'push',
  'pull',
  'core',
  'mobility_cardio',
  'full_body',
];

function groupExercises(exercises: Exercise[]): { group: MuscleGroup; items: Exercise[] }[] {
  return GROUP_ORDER.map((group) => ({
    group,
    items: exercises.filter((exercise) => exercise.muscleGroup === group),
  })).filter((section) => section.items.length > 0);
}

export default function Library() {
  const sections = groupExercises(exerciseLibrary);

  return (
    <Screen>
      <Text style={styles.title}>Libreria esercizi</Text>
      <Text style={styles.subtitle}>
        Tutti gli esercizi sono a corpo libero, pensati per uno spazio domestico di almeno 2x2 m.
      </Text>
      {sections.map((section) => (
        <View key={section.group} style={styles.section}>
          <Text style={styles.sectionTitle}>{muscleGroupLabels[section.group]}</Text>
          {section.items.map((exercise) => (
            <Pressable
              key={exercise.id}
              style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
              onPress={() => router.push(`/library/${exercise.id}`)}
              accessibilityRole="button"
            >
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{exercise.name}</Text>
                <Text style={styles.cardMeta}>Livello base {exercise.baseDifficultyTier} di 3</Text>
              </View>
              {exercise.contraindicationTags.includes('none') ? null : (
                <Tag label="Escluso per alcune limitazioni" />
              )}
            </Pressable>
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
