import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Screen } from '../../src/components/Screen';
import { getCurrentUser } from '../../src/data/repositories/userRepository';
import { useRefreshBus } from '../../src/data/refreshBus';
import { exerciseLibrary } from '../../src/domain/exercises/library';
import type { PlanDay, UserProfile, WeeklyPlan } from '../../src/domain/exercises/types';
import { ensureWeeklyPlanForCurrentWeek } from '../../src/features/home/ensureWeeklyPlan';
import { colors, radii, spacing, typography } from '../../src/theme/theme';
import { weekdayLabel } from '../../src/utils/week';

type LoadState =
  | { status: 'loading' }
  | { status: 'no_profile' }
  | { status: 'error' }
  | { status: 'ready'; user: UserProfile; plan: WeeklyPlan };

function todayIndexMondayFirst(): number {
  const jsDay = new Date().getDay(); // 0 = domenica
  return (jsDay + 6) % 7;
}

function exerciseName(exerciseId: string): string {
  return exerciseLibrary.find((e) => e.id === exerciseId)?.name ?? 'Esercizio';
}

function DayRow({ day, isToday }: { day: PlanDay; isToday: boolean }) {
  return (
    <View style={[styles.dayCard, isToday && styles.dayCardToday]}>
      <View style={styles.dayHeaderRow}>
        <Text style={styles.dayLabel}>{weekdayLabel(day.dayIndex)}</Text>
        {isToday ? <Text style={styles.todayBadge}>oggi</Text> : null}
      </View>
      {day.type === 'rest' ? (
        <Text style={styles.restText}>Giorno di riposo</Text>
      ) : (
        <View style={styles.exerciseList}>
          {day.exercises.map((planExercise, index) => (
            <Text key={`${planExercise.exerciseId}-${index}`} style={styles.exerciseText}>
              {exerciseName(planExercise.exerciseId)} — {planExercise.sets}×{planExercise.repsTarget}
              {'  '}(riposo {planExercise.restSeconds}s)
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

export default function Home() {
  const version = useRefreshBus((state) => state.version);
  const [state, setState] = useState<LoadState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });
    getCurrentUser()
      .then(async (user) => {
        if (!user) {
          if (!cancelled) setState({ status: 'no_profile' });
          return;
        }
        const plan = await ensureWeeklyPlanForCurrentWeek(user);
        if (!cancelled) setState({ status: 'ready', user, plan });
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
          <Text style={styles.title}>Profilo non trovato</Text>
          <Text style={styles.subtitle}>Riavvia l’app per rifare l’onboarding.</Text>
        </View>
      </Screen>
    );
  }

  if (state.status === 'error') {
    return (
      <Screen>
        <View style={styles.center}>
          <Text style={styles.title}>Non siamo riusciti a generare il piano</Text>
          <Text style={styles.subtitle}>Riprova più tardi.</Text>
        </View>
      </Screen>
    );
  }

  const { plan } = state;
  const todayIndex = todayIndexMondayFirst();

  return (
    <Screen>
      <Text style={styles.title}>Il tuo piano di questa settimana</Text>
      <Text style={styles.subtitle}>
        Livello di difficoltà attuale: {plan.difficultyTierSnapshot} di 3
      </Text>
      {plan.days.map((day) => (
        <DayRow key={day.dayIndex} day={day} isToday={day.dayIndex === todayIndex} />
      ))}
      <Text style={styles.note}>
        La sessione guidata con timer e conteggio serie sarà collegata nel prossimo modulo: da qui
        potrai poi avviare l’allenamento del giorno.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  title: { ...typography.title, color: colors.text, marginBottom: spacing.xs },
  subtitle: { ...typography.body, color: colors.textMuted, marginBottom: spacing.lg },
  dayCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  dayCardToday: {
    borderColor: colors.primary,
  },
  dayHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  dayLabel: { ...typography.body, fontWeight: '700', color: colors.text },
  todayBadge: { ...typography.caption, color: colors.primary, fontWeight: '700' },
  restText: { ...typography.body, color: colors.textMuted },
  exerciseList: { gap: 2 },
  exerciseText: { ...typography.caption, color: colors.text },
  note: { ...typography.caption, color: colors.textMuted, marginTop: spacing.md },
});
