import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { PrimaryButton } from '../../src/components/PrimaryButton';
import { Screen } from '../../src/components/Screen';
import { getCurrentUser } from '../../src/data/repositories/userRepository';
import { bumpRefreshBus, useRefreshBus } from '../../src/data/refreshBus';
import { exerciseLibrary } from '../../src/domain/exercises/library';
import type { PlanDay, UserProfile, WeeklyPlan } from '../../src/domain/exercises/types';
import { ensureWeeklyPlanForCurrentWeek } from '../../src/features/home/ensureWeeklyPlan';
import { colors, radii, shadows, spacing, typography } from '../../src/theme/theme';
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

function DayRow({ day, planId, isToday }: { day: PlanDay; planId: string; isToday: boolean }) {
  const isTraining = day.type === 'training';
  const isDone = Boolean(day.sessionId);

  return (
    <View style={[styles.dayCard, isToday && styles.dayCardToday]}>
      <View style={styles.dayHeaderRow}>
        <Text style={styles.dayLabel}>{weekdayLabel(day.dayIndex)}</Text>
        <View style={styles.badgeRow}>
          {isDone ? <Text style={styles.doneBadge}>completato ✓</Text> : null}
          {isToday ? <Text style={styles.todayBadge}>oggi</Text> : null}
        </View>
      </View>
      {!isTraining ? (
        <Text style={styles.restText}>Giorno di riposo</Text>
      ) : (
        <>
          <View style={styles.exerciseList}>
            {day.exercises.map((planExercise, index) => (
              <Text key={`${planExercise.exerciseId}-${index}`} style={styles.exerciseText}>
                {exerciseName(planExercise.exerciseId)} — {planExercise.sets}×
                {planExercise.targetUnit === 'seconds'
                  ? `${planExercise.target}s`
                  : planExercise.target}
                {'  '}(riposo {planExercise.restSeconds}s)
              </Text>
            ))}
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push(`/session/${planId}/${day.dayIndex}`)}
            style={({ pressed }) => [styles.startButton, pressed && styles.startButtonPressed]}
          >
            <Text style={styles.startButtonLabel}>
              {isDone ? 'Rifai allenamento' : 'Avvia allenamento'}
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

export default function Home() {
  const version = useRefreshBus((state) => state.version);
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const hasLoadedOnce = useRef(false);

  useEffect(() => {
    let cancelled = false;
    // Dopo il primo caricamento riusciamo i dati esistenti mentre ricarichiamo in background:
    // generare/salvare il piano qui sotto incrementa `version` (di cui questo effetto è
    // dipendente) e altrimenti rimostrerebbe lo spinner a piena pagina subito dopo essersi
    // già risolto la prima volta.
    if (!hasLoadedOnce.current) {
      setState({ status: 'loading' });
    }
    getCurrentUser()
      .then(async (user) => {
        if (!user) {
          if (!cancelled) setState({ status: 'no_profile' });
          return;
        }
        const plan = await ensureWeeklyPlanForCurrentWeek(user);
        if (!cancelled) {
          hasLoadedOnce.current = true;
          setState({ status: 'ready', user, plan });
        }
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
          <PrimaryButton label="Riprova" onPress={bumpRefreshBus} />
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
        <DayRow key={day.dayIndex} day={day} planId={plan.id} isToday={day.dayIndex === todayIndex} />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md },
  title: { ...typography.title, color: colors.text, marginBottom: spacing.xs },
  subtitle: { ...typography.body, color: colors.textMuted, marginBottom: spacing.lg },
  dayCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.card,
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
  badgeRow: { flexDirection: 'row', gap: spacing.sm },
  dayLabel: { ...typography.body, fontWeight: '700', color: colors.text },
  todayBadge: { ...typography.caption, color: colors.primary, fontWeight: '700' },
  doneBadge: { ...typography.caption, color: colors.success, fontWeight: '700' },
  restText: { ...typography.body, color: colors.textMuted },
  exerciseList: { gap: 2, marginBottom: spacing.sm },
  exerciseText: { ...typography.caption, color: colors.text },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.sm,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  startButtonPressed: { opacity: 0.85 },
  startButtonLabel: { ...typography.body, fontWeight: '700', color: '#FFFFFF' },
});
