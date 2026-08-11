import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { ExerciseAvatar } from '../../../src/components/avatar/ExerciseAvatar';
import { SessionCompleteCelebration } from '../../../src/components/celebration/SessionCompleteCelebration';
import { CountdownTimer } from '../../../src/components/CountdownTimer';
import { NumberPicker } from '../../../src/components/NumberPicker';
import { PrimaryButton } from '../../../src/components/PrimaryButton';
import { Screen } from '../../../src/components/Screen';
import { onSessionFeedback } from '../../../src/domain/engine/adaptEngine';
import { useExerciseContent } from '../../../src/domain/exercises/exerciseContent';
import { exerciseLibrary } from '../../../src/domain/exercises/library';
import { useLabels } from '../../../src/domain/exercises/labels';
import type {
  PerceivedDifficulty,
  PlanDay,
  SessionExerciseLog,
  UserProfile,
  WeeklyPlan,
} from '../../../src/domain/exercises/types';
import { attachSessionToPlanDay, getPlanById } from '../../../src/data/repositories/planRepository';
import {
  abandonSession,
  completeSession,
  startSession,
} from '../../../src/data/repositories/sessionRepository';
import { getCurrentUser, updateUser } from '../../../src/data/repositories/userRepository';
import { incrementGoalCompletedSessions } from '../../../src/data/repositories/goalRepository';
import { colors, spacing, typography } from '../../../src/theme/theme';

type Phase = 'loading' | 'not_found' | 'energy' | 'exercise' | 'rest' | 'feedback' | 'saving' | 'celebration';
type PendingAdvance = 'next_set' | 'next_exercise';

const ENERGY_LEVELS: (1 | 2 | 3 | 4 | 5)[] = [1, 2, 3, 4, 5];

export default function GuidedSession() {
  const { t } = useTranslation();
  const { variantLabels } = useLabels();
  const { planId, dayIndex: dayIndexParam } = useLocalSearchParams<{
    planId: string;
    dayIndex: string;
  }>();
  const dayIndex = Number(dayIndexParam);

  const [phase, setPhase] = useState<Phase>('loading');
  const [plan, setPlan] = useState<WeeklyPlan | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [day, setDay] = useState<PlanDay | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [setIndex, setSetIndex] = useState(0);
  const [completedLogs, setCompletedLogs] = useState<SessionExerciseLog[]>([]);
  // Serie effettivamente confermate per l'esercizio in corso: a differenza di `setIndex`
  // (che avanza solo alla transizione post-riposo) questo si aggiorna subito al tap/countdown,
  // così l'abbandono a metà riposo non sottostima le serie svolte.
  const [setsDoneForCurrentExercise, setSetsDoneForCurrentExercise] = useState(0);
  const pendingAdvance = useRef<PendingAdvance>('next_set');

  useEffect(() => {
    let cancelled = false;
    Promise.all([getPlanById(planId), getCurrentUser()]).then(([loadedPlan, loadedUser]) => {
      if (cancelled) return;
      const loadedDay = loadedPlan?.days.find((d) => d.dayIndex === dayIndex) ?? null;
      if (!loadedPlan || !loadedUser || !loadedDay || loadedDay.type !== 'training' || loadedDay.exercises.length === 0) {
        setPhase('not_found');
        return;
      }
      setPlan(loadedPlan);
      setUser(loadedUser);
      setDay(loadedDay);
      setPhase('energy');
    });
    return () => {
      cancelled = true;
    };
  }, [planId, dayIndex]);

  const currentPlanExercise = day?.exercises[exerciseIndex] ?? null;
  const currentExercise = currentPlanExercise
    ? exerciseLibrary.find((e) => e.id === currentPlanExercise.exerciseId) ?? null
    : null;
  // Gli hook non possono essere condizionali: chiamato sempre, con stringa vuota finché l'esercizio non è pronto.
  const currentContent = useExerciseContent(currentExercise?.id ?? '');
  const currentVariant = currentPlanExercise
    ? currentPlanExercise.variant === 'easier'
      ? currentContent.easierVariant
      : currentPlanExercise.variant === 'harder'
        ? currentContent.harderVariant
        : null
    : null;

  const confirmAbandon = useCallback(() => {
    Alert.alert(
      t('session.exitConfirmTitle'),
      t('session.exitConfirmBody'),
      [
        { text: t('session.exitConfirmCancel'), style: 'cancel' },
        {
          text: t('session.exitConfirmConfirm'),
          style: 'destructive',
          onPress: async () => {
            if (sessionId && user && day) {
              // Durante 'exercise'/'rest' l'esercizio corrente non è ancora nei completedLogs;
              // nelle altre fasi (es. 'feedback') è già stato finalizzato lì, quindi non va
              // duplicato con un log "in corso".
              const isMidExercise = (phase === 'exercise' || phase === 'rest') && currentPlanExercise;
              const logs = isMidExercise
                ? [
                    ...completedLogs,
                    {
                      exerciseId: currentPlanExercise!.exerciseId,
                      variantUsed: currentPlanExercise!.variant,
                      setsCompleted: setsDoneForCurrentExercise,
                      setsPlanned: currentPlanExercise!.sets,
                    } satisfies SessionExerciseLog,
                  ]
                : completedLogs;
              await abandonSession(sessionId, logs);
              const updatedUser = onSessionFeedback(user, 'abandoned', null);
              await updateUser(updatedUser);
            }
            router.back();
          },
        },
      ]
    );
  }, [t, sessionId, user, day, currentPlanExercise, phase, setsDoneForCurrentExercise, completedLogs]);

  function handleStartSession(energy: 1 | 2 | 3 | 4 | 5) {
    if (!user || !plan || !day) return;
    startSession({
      planDayId: `${plan.id}:${day.dayIndex}`,
      userId: user.id,
      preSessionEnergy: energy,
    }).then((session) => {
      setSessionId(session.id);
      setPhase('exercise');
    });
  }

  function finalizeCurrentExerciseLog(): SessionExerciseLog {
    return {
      exerciseId: currentPlanExercise!.exerciseId,
      variantUsed: currentPlanExercise!.variant,
      setsCompleted: currentPlanExercise!.sets,
      setsPlanned: currentPlanExercise!.sets,
    };
  }

  function handleSetComplete() {
    if (!day || !currentPlanExercise) return;
    const isLastSetOfExercise = setIndex + 1 >= currentPlanExercise.sets;
    const isLastExercise = exerciseIndex + 1 >= day.exercises.length;
    setSetsDoneForCurrentExercise((n) => n + 1);

    if (isLastSetOfExercise && isLastExercise) {
      setCompletedLogs((logs) => [...logs, finalizeCurrentExerciseLog()]);
      setPhase('feedback');
      return;
    }

    pendingAdvance.current = isLastSetOfExercise ? 'next_exercise' : 'next_set';
    setPhase('rest');
  }

  function handleRestComplete() {
    if (pendingAdvance.current === 'next_exercise') {
      setCompletedLogs((logs) => [...logs, finalizeCurrentExerciseLog()]);
      setExerciseIndex((i) => i + 1);
      setSetIndex(0);
      setSetsDoneForCurrentExercise(0);
    } else {
      setSetIndex((i) => i + 1);
    }
    setPhase('exercise');
  }

  function handleFeedback(feedback: PerceivedDifficulty) {
    if (!sessionId || !user || !plan || !day) return;
    setPhase('saving');
    completeSession(sessionId, { exerciseLogs: completedLogs, postSessionFeedback: feedback })
      .then(async () => {
        const updatedUser = onSessionFeedback(user, 'completed', feedback);
        await updateUser(updatedUser);
        await attachSessionToPlanDay(plan.id, day.dayIndex, sessionId);
        await incrementGoalCompletedSessions(user.id, plan.weekStartDate);
        setPhase('celebration');
      })
      .catch(() => setPhase('feedback'));
  }

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerShown: phase !== 'celebration',
          title: currentContent.name || t('home.title'),
          gestureEnabled: false,
          headerLeft: () => (
            <Pressable onPress={confirmAbandon} accessibilityRole="button" hitSlop={12}>
              <Text style={styles.exitLabel}>{t('common.exit')}</Text>
            </Pressable>
          ),
        }}
      />

      {phase === 'loading' && (
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} />
        </View>
      )}

      {phase === 'not_found' && (
        <View style={styles.center}>
          <Text style={styles.title}>{t('session.notAvailableTitle')}</Text>
          <Text style={styles.subtitle}>{t('session.notAvailableSubtitle')}</Text>
          <PrimaryButton label={t('session.backToHome')} onPress={() => router.replace('/(tabs)/home')} />
        </View>
      )}

      {phase === 'energy' && (
        <View style={styles.center}>
          <Text style={styles.title}>{t('session.energyTitle')}</Text>
          <Text style={styles.subtitle}>{t('session.energySubtitle')}</Text>
          <NumberPicker
            options={ENERGY_LEVELS}
            selected={null}
            onSelect={(level) => handleStartSession(level as 1 | 2 | 3 | 4 | 5)}
          />
        </View>
      )}

      {phase === 'exercise' && currentExercise && currentPlanExercise && (
        <View style={styles.center}>
          <Text style={styles.progressText}>
            {t('session.progress', {
              current: exerciseIndex + 1,
              total: day?.exercises.length,
              setCurrent: setIndex + 1,
              setTotal: currentPlanExercise.sets,
            })}
          </Text>
          <Text style={styles.title}>{currentVariant?.name || currentContent.name}</Text>
          <Text style={styles.variantTag}>{variantLabels[currentPlanExercise.variant]}</Text>

          <ExerciseAvatar exerciseId={currentPlanExercise.exerciseId} />

          {(currentVariant?.instructions ?? currentContent.instructions).map((step, i) => (
            <Text key={i} style={styles.stepText}>
              {i + 1}. {step}
            </Text>
          ))}

          {currentPlanExercise.targetUnit === 'seconds' ? (
            <CountdownTimer
              key={`hold-${exerciseIndex}-${setIndex}`}
              durationSeconds={currentPlanExercise.target}
              label={t('session.holdLabel')}
              onComplete={handleSetComplete}
            />
          ) : (
            <View style={styles.repsBlock}>
              <Text style={styles.repsTarget}>{t('session.reps', { count: currentPlanExercise.target })}</Text>
              <PrimaryButton label={t('session.setComplete')} onPress={handleSetComplete} />
            </View>
          )}
        </View>
      )}

      {phase === 'rest' && currentPlanExercise && (
        <View style={styles.center}>
          <CountdownTimer
            key={`rest-${exerciseIndex}-${setIndex}`}
            durationSeconds={currentPlanExercise.restSeconds}
            label={t('session.rest')}
            onComplete={handleRestComplete}
          />
          <PrimaryButton label={t('session.skipRest')} variant="secondary" onPress={handleRestComplete} />
        </View>
      )}

      {phase === 'feedback' && (
        <View style={styles.center}>
          <Text style={styles.title}>{t('session.feedbackTitle')}</Text>
          <View style={styles.feedbackRow}>
            <PrimaryButton label={t('feedback.easy')} variant="secondary" onPress={() => handleFeedback('easy')} />
            <PrimaryButton label={t('feedback.right')} onPress={() => handleFeedback('right')} />
            <PrimaryButton label={t('feedback.hard')} variant="secondary" onPress={() => handleFeedback('hard')} />
          </View>
        </View>
      )}

      {phase === 'saving' && (
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} />
        </View>
      )}

      {phase === 'celebration' && day && (
        <SessionCompleteCelebration
          title={t('celebration.title')}
          subtitle={t('celebration.subtitle', { count: completedLogs.length, total: day.exercises.length })}
          onContinue={() => router.replace('/(tabs)/home')}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md, paddingVertical: spacing.xl },
  title: { ...typography.title, color: colors.text, textAlign: 'center' },
  subtitle: { ...typography.body, color: colors.textMuted, textAlign: 'center' },
  progressText: { ...typography.caption, color: colors.textMuted },
  variantTag: { ...typography.caption, color: colors.primaryDark, marginBottom: spacing.sm },
  stepText: { ...typography.body, color: colors.text, textAlign: 'left', alignSelf: 'stretch' },
  repsBlock: { alignItems: 'center', gap: spacing.md, width: '100%' },
  repsTarget: { ...typography.title, fontSize: 40, color: colors.text },
  feedbackRow: { flexDirection: 'row', gap: spacing.sm, width: '100%' },
  exitLabel: { ...typography.body, color: colors.primary, fontWeight: '600' },
});
