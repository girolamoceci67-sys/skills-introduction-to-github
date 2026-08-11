import { StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { ExerciseAvatar } from '../../src/components/avatar/ExerciseAvatar';
import { Screen } from '../../src/components/Screen';
import { Tag } from '../../src/components/Tag';
import { dumbbellLibrary } from '../../src/domain/exercises/dumbbellLibrary';
import { useExerciseContent } from '../../src/domain/exercises/exerciseContent';
import { exerciseLibrary } from '../../src/domain/exercises/library';
import { useLabels } from '../../src/domain/exercises/labels';
import type { ExerciseVariantContent, LimitationTag } from '../../src/domain/exercises/types';
import { colors, radii, shadows, spacing, typography } from '../../src/theme/theme';

function VariantBlock({ label, variant }: { label: string; variant: ExerciseVariantContent }) {
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
  const { t } = useTranslation();
  const { muscleGroupLabels, variantLabels, limitationLabels } = useLabels();
  const { exerciseId } = useLocalSearchParams<{ exerciseId: string }>();
  const exercise = [...exerciseLibrary, ...dumbbellLibrary].find((e) => e.id === exerciseId);
  // Gli hook non possono essere condizionali: chiamato sempre, con stringa vuota se l'esercizio non esiste.
  const content = useExerciseContent(exercise?.id ?? '');

  if (!exercise) {
    return (
      <Screen>
        <Text style={styles.title}>{t('library.notFound')}</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Stack.Screen options={{ headerShown: true, title: content.name }} />
      <View style={styles.tagsRow}>
        <Tag label={muscleGroupLabels[exercise.muscleGroup]} />
        <Tag
          label={
            exercise.equipment === 'dumbbell' && exercise.loadRangeKg
              ? t('library.levelBadgeDumbbell', {
                  tier: exercise.baseDifficultyTier,
                  min: exercise.loadRangeKg.min,
                  max: exercise.loadRangeKg.max,
                })
              : t('library.levelBadge', { tier: exercise.baseDifficultyTier })
          }
        />
      </View>

      <ExerciseAvatar exerciseId={exercise.id} />

      <Text style={styles.sectionTitle}>{variantLabels.base}</Text>
      {content.instructions.map((step, index) => (
        <Text key={index} style={styles.stepText}>
          {index + 1}. {step}
        </Text>
      ))}
      <Text style={styles.cuesHeading}>{t('library.executionCuesHeading')}</Text>
      {content.executionCues.map((cue, index) => (
        <Text key={index} style={styles.cueText}>
          • {cue}
        </Text>
      ))}

      <VariantBlock label={variantLabels.easier} variant={content.easierVariant} />
      <VariantBlock label={variantLabels.harder} variant={content.harderVariant} />

      {!exercise.contraindicationTags.includes('none') && (
        <Text style={styles.disclaimer}>
          {t('library.contraindicationDisclaimer', {
            tags: exercise.contraindicationTags
              .filter((tag): tag is Exclude<LimitationTag, 'none'> => tag !== 'none')
              .map((tag) => limitationLabels[tag])
              .join(', '),
          })}
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
