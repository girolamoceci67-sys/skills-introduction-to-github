import { StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import { ExerciseAvatar } from '../../src/components/avatar/ExerciseAvatar';
import { Screen } from '../../src/components/Screen';
import { Tag } from '../../src/components/Tag';
import { exerciseLibrary } from '../../src/domain/exercises/library';
import { limitationLabels, muscleGroupLabels, variantLabels } from '../../src/domain/exercises/labels';
import type { ExerciseVariant, LimitationTag } from '../../src/domain/exercises/types';
import { colors, radii, shadows, spacing, typography } from '../../src/theme/theme';

function VariantBlock({ label, variant }: { label: string; variant: ExerciseVariant }) {
  return (
    <View style={styles.variantCard}>
      <Text style={styles.variantLabel}>{label}</Text>
      <Text style={styles.variantName}>{variant.name}</Text>
      {variant.instructions.map((step, index) => (
        <Text key={index} style={styles.stepText}>
          {index + 1}. {step}
        </Text>
      ))}
      {variant.executionCues.map((cue, index) => (
        <Text key={index} style={styles.cueText}>
          • {cue}
        </Text>
      ))}
    </View>
  );
}

export default function ExerciseDetail() {
  const { exerciseId } = useLocalSearchParams<{ exerciseId: string }>();
  const exercise = exerciseLibrary.find((e) => e.id === exerciseId);

  if (!exercise) {
    return (
      <Screen>
        <Text style={styles.title}>Esercizio non trovato</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Stack.Screen options={{ headerShown: true, title: exercise.name }} />
      <View style={styles.tagsRow}>
        <Tag label={muscleGroupLabels[exercise.muscleGroup]} />
        <Tag label={`Livello base ${exercise.baseDifficultyTier} di 3`} />
      </View>

      <ExerciseAvatar exerciseId={exercise.id} />

      <Text style={styles.sectionTitle}>{variantLabels.base}</Text>
      {exercise.instructions.map((step, index) => (
        <Text key={index} style={styles.stepText}>
          {index + 1}. {step}
        </Text>
      ))}
      <Text style={styles.cuesHeading}>Segnali di corretta esecuzione</Text>
      {exercise.executionCues.map((cue, index) => (
        <Text key={index} style={styles.cueText}>
          • {cue}
        </Text>
      ))}

      <VariantBlock label={variantLabels.easier} variant={exercise.easierVariant} />
      <VariantBlock label={variantLabels.harder} variant={exercise.harderVariant} />

      {!exercise.contraindicationTags.includes('none') && (
        <Text style={styles.disclaimer}>
          Questo esercizio viene evitato automaticamente se hai segnalato limitazioni a:{' '}
          {exercise.contraindicationTags
            .filter((tag): tag is Exclude<LimitationTag, 'none'> => tag !== 'none')
            .map((tag) => limitationLabels[tag])
            .join(', ')}
          . Non è una valutazione medica: in caso di dubbi, consulta un professionista.
        </Text>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.title, color: colors.text },
  tagsRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  sectionTitle: { ...typography.heading, color: colors.text, marginBottom: spacing.sm },
  cuesHeading: {
    ...typography.body,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  stepText: { ...typography.body, color: colors.text, marginBottom: spacing.xs },
  cueText: { ...typography.body, color: colors.textMuted, marginBottom: spacing.xs },
  variantCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.md,
    marginTop: spacing.lg,
    ...shadows.card,
  },
  variantLabel: { ...typography.caption, color: colors.primaryDark, marginBottom: spacing.xs },
  variantName: { ...typography.body, fontWeight: '700', color: colors.text, marginBottom: spacing.sm },
  disclaimer: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
});
