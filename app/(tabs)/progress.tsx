import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { format, parseISO } from 'date-fns';
import { BarChart } from 'react-native-gifted-charts';
import { useTranslation } from 'react-i18next';

import { NumberPicker } from '../../src/components/NumberPicker';
import { PrimaryButton } from '../../src/components/PrimaryButton';
import { Screen } from '../../src/components/Screen';
import { SelectableCard } from '../../src/components/SelectableCard';
import { getGoalForWeek, setWeeklyGoal } from '../../src/data/repositories/goalRepository';
import { getRecentPlans } from '../../src/data/repositories/planRepository';
import { getSessionHistory } from '../../src/data/repositories/sessionRepository';
import { getCurrentUser } from '../../src/data/repositories/userRepository';
import { bumpRefreshBus, useRefreshBus } from '../../src/data/refreshBus';
import { computeCurrentStreak, computeWeeklyAdherence } from '../../src/domain/engine/streak';
import type { UserProfile, WeeklyGoal, WorkoutSession } from '../../src/domain/exercises/types';
import { syncDailyReminder } from '../../src/features/goals/reminderScheduler';
import { dateFnsLocaleFor } from '../../src/i18n/dateLocale';
import { colors, radii, spacing, typography } from '../../src/theme/theme';
import { currentWeekStartDate } from '../../src/utils/week';

const REMINDER_TIME_OPTIONS = ['07:00', '08:00', '12:30', '18:00', '19:30', '21:00'];
const GOAL_TARGET_OPTIONS = [1, 2, 3, 4, 5, 6, 7];

type LoadState =
  | { status: 'loading' }
  | { status: 'no_profile' }
  | { status: 'error' }
  | {
      status: 'ready';
      user: UserProfile;
      streak: number;
      adherence: ReturnType<typeof computeWeeklyAdherence>;
      history: WorkoutSession[];
      goal: WeeklyGoal | null;
    };

export default function Progress() {
  const { t, i18n } = useTranslation();
  const version = useRefreshBus((state) => state.version);
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const [editingGoal, setEditingGoal] = useState(false);
  const [draftTarget, setDraftTarget] = useState<number | null>(null);
  const [draftReminderEnabled, setDraftReminderEnabled] = useState(false);
  const [draftReminderTime, setDraftReminderTime] = useState<string | null>(null);
  const [savingGoal, setSavingGoal] = useState(false);
  const hasLoadedOnce = useRef(false);

  useEffect(() => {
    let cancelled = false;
    if (!hasLoadedOnce.current) setState({ status: 'loading' });

    getCurrentUser()
      .then(async (user) => {
        if (cancelled) return;
        if (!user) {
          setState({ status: 'no_profile' });
          return;
        }
        const weekStartDate = currentWeekStartDate();
        const [plans, history, goal] = await Promise.all([
          getRecentPlans(user.id, 8),
          getSessionHistory(user.id, 10),
          getGoalForWeek(user.id, weekStartDate),
        ]);
        if (cancelled) return;
        hasLoadedOnce.current = true;
        setState({
          status: 'ready',
          user,
          streak: computeCurrentStreak(plans),
          adherence: computeWeeklyAdherence(plans),
          history,
          goal,
        });
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' });
      });

    return () => {
      cancelled = true;
    };
  }, [version]);

  if (state.status === 'loading') {
    return (
      <Screen>
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} />
        </View>
      </Screen>
    );
  }

  if (state.status === 'no_profile') {
    return (
      <Screen>
        <View style={styles.center}>
          <Text style={styles.title}>{t('progress.noProfile')}</Text>
        </View>
      </Screen>
    );
  }

  if (state.status === 'error') {
    return (
      <Screen>
        <View style={styles.center}>
          <Text style={styles.title}>{t('progress.loadErrorTitle')}</Text>
          <PrimaryButton label={t('common.retry')} onPress={bumpRefreshBus} />
        </View>
      </Screen>
    );
  }

  const { user, streak, adherence, history, goal } = state;
  const dateLocale = dateFnsLocaleFor(i18n.language);
  const chartData = adherence.map((point) => ({
    value: point.adherencePercent,
    label: format(parseISO(point.weekStartDate), 'dd/MM'),
    frontColor: colors.primary,
  }));

  function startEditingGoal() {
    setDraftTarget(goal?.targetSessions ?? user.daysPerWeekAvailable);
    setDraftReminderEnabled(goal?.reminderEnabled ?? false);
    setDraftReminderTime(goal?.reminderTimeOfDay ?? REMINDER_TIME_OPTIONS[0]);
    setEditingGoal(true);
  }

  async function saveGoal() {
    if (draftTarget === null) return;
    setSavingGoal(true);
    await setWeeklyGoal({
      userId: user.id,
      weekStartDate: currentWeekStartDate(),
      targetSessions: draftTarget,
      reminderEnabled: draftReminderEnabled,
      reminderTimeOfDay: draftReminderEnabled ? draftReminderTime : null,
    });
    const reminderResult = await syncDailyReminder(draftReminderEnabled, draftReminderTime);
    setSavingGoal(false);
    setEditingGoal(false);
    if (!reminderResult.ok) {
      Alert.alert(t('progress.reminderNotEnabledTitle'), t('progress.reminderNotEnabledBody'));
    }
  }

  return (
    <Screen>
      <Text style={styles.title}>{t('progress.title')}</Text>

      <View style={styles.card}>
        <Text style={styles.streakValue}>{streak}</Text>
        <Text style={styles.streakLabel}>{t('progress.streak', { count: streak })}</Text>
      </View>

      {chartData.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t('progress.weeklyAdherence')}</Text>
          <BarChart
            data={chartData}
            barWidth={22}
            spacing={18}
            maxValue={100}
            noOfSections={4}
            yAxisLabelSuffix="%"
            frontColor={colors.primary}
            yAxisTextStyle={{ color: colors.textMuted }}
            xAxisLabelTextStyle={{ color: colors.textMuted, fontSize: 11 }}
          />
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{t('progress.weeklyGoal')}</Text>
        {!editingGoal ? (
          <>
            {goal ? (
              <Text style={styles.body}>
                {t('progress.goalProgress', { completed: goal.completedSessions, target: goal.targetSessions })}
                {goal.reminderEnabled && goal.reminderTimeOfDay
                  ? t('progress.goalReminderSuffix', { time: goal.reminderTimeOfDay })
                  : ''}
              </Text>
            ) : (
              <Text style={styles.body}>{t('progress.noGoalSet')}</Text>
            )}
            <PrimaryButton
              label={goal ? t('progress.editGoal') : t('progress.setGoal')}
              variant="secondary"
              onPress={startEditingGoal}
            />
          </>
        ) : (
          <View style={styles.editForm}>
            <Text style={styles.body}>{t('progress.howManyThisWeek')}</Text>
            <NumberPicker options={GOAL_TARGET_OPTIONS} selected={draftTarget} onSelect={setDraftTarget} />

            <SelectableCard
              title={t('progress.dailyReminderTitle')}
              description={t('progress.dailyReminderDesc')}
              selected={draftReminderEnabled}
              onPress={() => setDraftReminderEnabled((v) => !v)}
            />

            {draftReminderEnabled && (
              <View style={styles.timeOptions}>
                {REMINDER_TIME_OPTIONS.map((time) => (
                  <PrimaryButton
                    key={time}
                    label={time}
                    variant={draftReminderTime === time ? 'primary' : 'secondary'}
                    onPress={() => setDraftReminderTime(time)}
                  />
                ))}
              </View>
            )}

            <View style={styles.editActions}>
              <PrimaryButton label={t('common.cancel')} variant="secondary" onPress={() => setEditingGoal(false)} />
              <PrimaryButton
                label={savingGoal ? t('common.saving') : t('common.save')}
                disabled={draftTarget === null || savingGoal}
                onPress={saveGoal}
              />
            </View>
          </View>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{t('progress.sessionHistory')}</Text>
        {history.length === 0 ? (
          <Text style={styles.body}>{t('progress.noSessions')}</Text>
        ) : (
          history.map((session) => (
            <View key={session.id} style={styles.historyRow}>
              <Text style={styles.historyDate}>
                {format(parseISO(session.startedAt), 'd MMM yyyy', { locale: dateLocale })}
              </Text>
              <Text style={styles.historyMeta}>
                {t(`sessionStatus.${session.status}`)}
                {session.postSessionFeedback ? ` · ${t(`feedback.${session.postSessionFeedback}`)}` : ''}
              </Text>
            </View>
          ))
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { ...typography.title, color: colors.text, marginBottom: spacing.lg },
  body: { ...typography.body, color: colors.textMuted },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  sectionTitle: { ...typography.heading, fontSize: 17, color: colors.text },
  streakValue: { ...typography.title, fontSize: 40, color: colors.primary, textAlign: 'center' },
  streakLabel: { ...typography.body, color: colors.textMuted, textAlign: 'center' },
  editForm: { gap: spacing.md },
  timeOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  editActions: { flexDirection: 'row', gap: spacing.sm },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  historyDate: { ...typography.body, color: colors.text },
  historyMeta: { ...typography.caption, color: colors.textMuted },
});
