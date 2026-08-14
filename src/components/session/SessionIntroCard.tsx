import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, radii, shadows, spacing, typography } from '../../theme/theme';
import {
  OBJECTIVE_BY_GOAL,
  type DayFocus,
  type NextDayPreview,
} from '../../domain/session/sessionIntro';
import type { GoalType } from '../../domain/exercises/types';

const FOCUS_KEY: Record<DayFocus, string> = {
  bodyweight: 'sessionIntro.focusBodyweight',
  dumbbell: 'sessionIntro.focusDumbbell',
  mixed: 'sessionIntro.focusMixed',
};

interface SessionIntroCardProps {
  focus: DayFocus;
  rpe: number;
  goal: GoalType;
  nextDay: NextDayPreview | null;
}

export function SessionIntroCard({ focus, rpe, goal, nextDay }: SessionIntroCardProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.card}>
      <View style={styles.badgeRow}>
        <View style={styles.focusBadge}>
          <Text style={styles.focusBadgeLabel}>{t(FOCUS_KEY[focus])}</Text>
        </View>
        <View style={styles.difficultyBadge}>
          <Text style={styles.difficultyBadgeLabel}>{t('sessionIntro.difficultyLabel', { score: rpe })}</Text>
        </View>
      </View>

      <Text style={styles.objective}>{t(OBJECTIVE_BY_GOAL[goal])}</Text>

      {nextDay && (
        <View style={styles.nextDayRow}>
          <Text style={styles.nextDayText}>
            {nextDay.type === 'training' && nextDay.focus
              ? t('sessionIntro.nextDayTraining', { focus: t(FOCUS_KEY[nextDay.focus]) })
              : t('sessionIntro.nextDayRest')}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    gap: spacing.sm,
    width: '100%',
    ...shadows.card,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  focusBadge: {
    backgroundColor: '#EEF5F0',
    borderRadius: radii.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  focusBadgeLabel: {
    ...typography.caption,
    color: colors.primaryDark,
    fontWeight: '700',
  },
  difficultyBadge: {
    backgroundColor: '#FBEEE4',
    borderRadius: radii.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  difficultyBadgeLabel: {
    ...typography.caption,
    color: colors.accent,
    fontWeight: '700',
  },
  objective: {
    ...typography.body,
    color: colors.text,
  },
  nextDayRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  nextDayText: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
