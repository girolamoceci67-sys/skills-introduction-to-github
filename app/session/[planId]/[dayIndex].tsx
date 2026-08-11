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
import { useSessionAudio } from '../../../src/domain/audio/useSessionAudio';
import { loadOptionsKg, onSessionFeedback } from '../../../src/domain/engine/adaptEngine';
import { estimatedRepsDurationSeconds } from '../../../src/domain/engine/progressionRules';
import { dumbbellLibrary } from '../../../src/domain/exercises/dumbbellLibrary';
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

type Phase =
  | 'loading'
  | 'not_found'
  | 'energy'
  | 'exercise'
  | 'rest'
  | 'exercise_feedback'
  | 'feedback'
  | 'saving'
  | 'celebration';
type PendingAdvance = 'next_set' | 'next_exercise';

const ENERGY_LEVELS: (1 | 2 | 3 | 4 | 5)[] = [1, 2, 3, 4, 5];
const fullExerciseLibrary = [...exerciseLibrary, ...dumbbellLibrary];

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
  // Sovrascrittura manuale del carico consigliato per l'esercizio manubri in corso, valida solo per questa sessione.
  const [loadOverrideKg, setLoadOverrideKg] = useState<number | null>(null);
  const pendingAdvance = useRef<PendingAdvance>('next_set');
  const { muted, toggleMuted, startBackgroundMusic, stopBackgroundMusic, playCue } = useSessionAudio();
  const previousPhase = useRef<Phase | null>(null);

  // Musica di sottofondo attiva durante la parte "attiva" della sessione (esercizio, riposo,
  // feedback per singolo esercizio); sospesa prima dell'inizio e dopo la fine.
  useEffect(() => {
    const activePhases: Phase[] = ['exercise', 'rest', 'exercise_feedback'];
    if (activePhases.includes(phase)) {
      startBackgroundMusic();
    } else {
      stopBackgroundMusic();
    }
  }, [phase, startBackgroundMusic, stopBackgroundMusic]);

  // Suoni brevi ai cambi di fase: inizio esercizio, inizio riposo, fine sessione.
  useEffect(() => {
    if (previousPhase.current !== phase) {
      if (phase === 'exercise') playCue('go');
      else if (phase === 'rest') playCue('rest');
      else if (phase === 'celebration') playCue('complete');
      previousPhase.current = phase;
    }
  }, [phase, playCue]);

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
    ? fullExerciseLibrary.find((e) => e.id === currentPlanExercise.exerciseId) ?? null
    : null;
  const effectiveLoadKg =
    currentExercise?.equipment === 'dumbbell' ? loadOverrideKg ?? currentPlanExercise?.loadKg ?? null : null;
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
              // durante 'exercise_feedback' le serie sono già tutte fatte ma manca il feedback;
              // nelle altre fasi (es. 'feedback') è già stato finalizzato lì, quindi non va
              // duplicato con un log "in corso".
              const isMidExercise = (phase === 'exercise' || phase === 'rest') && currentPlanExercise;
              const isPendingExerciseFeedback = phase === 'exercise_feedback' && currentPlanExercise;
              const logs = isMidExercise
                ? [
                    ...completedLogs,
                    {
                      exerciseId: currentPlanExercise!.exerciseId,
                      variantUsed: currentPlanExercise!.variant,
                      setsCompleted: setsDoneForCurrentExercise,
                      setsPlanned: currentPlanExercise!.sets,
                      loadKgUsed: effectiveLoadKg ?? undefined,
                    } satisfies SessionExerciseLog,
                  ]
                : isPendingExerciseFeedback
                  ? [
                      ...completedLogs,
                      {
                        exerciseId: currentPlanExercise!.exerciseId,
                        variantUsed: currentPlanExercise!.variant,
                        setsCompleted: currentPlanExercise!.sets,
                        setsPlanned: currentPlanExercise!.sets,
                        loadKgUsed: effectiveLoadKg ?? undefined,
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
  }, [t, sessionId, user, day, currentPlanExercise, phase, setsDoneForCurrentExercise, completedLogs, effectiveLoadKg]);

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

  // Finalizza il log dell'esercizio corrente e avanza: alla sessione di feedback (ultimo
  // esercizio del giorno) o al riposo prima del prossimo esercizio.
  function finishExerciseAndAdvance(log: SessionExerciseLog) {
    if (!day) return;
    const isLastExercise = exerciseIndex + 1 >= day.exercises.length;
    setCompletedLogs((logs) => [...logs, log]);
    if (isLastExercise) {
      setPhase('feedback');
      return;
    }
    pendingAdvance.current = 'next_exercise';
    setPhase('rest');
  }

  function handleSetComplete() {
    if (!day || !currentPlanExercise || !currentExercise) return;
    const isLastSetOfExercise = setIndex + 1 >= currentPlanExercise.sets;
    setSetsDoneForCurrentExercise((n) => n + 1);

    if (!isLastSetOfExercise) {
      pendingAdvance.current = 'next_set';
      setPhase('rest');
      return;
    }

    // Gli esercizi manubri hanno un feedback dedicato (carico usato + percezione dello sforzo)
    // prima di essere finalizzati: il feedback di fine sessione resta separato e generale.
    if (currentExercise.equipment === 'dumbbell') {
      setPhase('exercise_feedback');
      return;
    }

    finishExerciseAndAdvance({
      exerciseId: currentPlanExercise.exerciseId,
      variantUsed: currentPlanExercise.variant,
      setsCompleted: currentPlanExercise.sets,
      setsPlanned: currentPlanExercise.sets,
    });
  }

  function handleExerciseFeedback(feedback: PerceivedDifficulty) {
    if (!currentPlanExercise) return;
    finishExerciseAndAdvance({
      exerciseId: currentPlanExercise.exerciseId,
      variantUsed: currentPlanExercise.variant,
      setsCompleted: currentPlanExercise.sets,
      setsPlanned: currentPlanExercise.sets,
      loadKgUsed: effectiveLoadKg ?? undefined,
      exerciseFeedback: feedback,
    });
  }

  function handleRestComplete() {
    if (pendingAdvance.current === 'next_exercise') {
      setExerciseIndex((i) => i + 1);
      setSetIndex(0);
      setSetsDoneForCurrentExercise(0);
      setLoadOverrideKg(null);
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
          headerRight: () => (
            <Pressable
              onPress={toggleMuted}
              accessibilityRole="button"
              accessibilityLabel={muted ? t('session.unmuteAudio') : t('session.muteAudio')}
              hitSlop={12}
            >
              <Text style={styles.muteIcon}>{muted ? '🔇' : '🔊'}</Text>
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

          {currentExercise.equipment === 'dumbbell' && (
            <View style={styles.loadBlock}>
              <Text style={styles.loadLabel}>{t('session.loadLabel')}</Text>
              <NumberPicker
                options={loadOptionsKg(currentExercise)}
                selected={effectiveLoadKg}
                onSelect={setLoadOverrideKg}
              />
            </View>
          )}

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
              <CountdownTimer
                key={`reps-${exerciseIndex}-${setIndex}`}
                durationSeconds={estimatedRepsDurationSeconds(currentPlanExercise.target)}
                label={t('session.repsTimerLabel')}
                onComplete={handleSetComplete}
              />
              <PrimaryButton label={t('session.setComplete')} variant="secondary" onPress={handleSetComplete} />
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

      {phase === 'exercise_feedback' && currentPlanExercise && (
        <View style={styles.center}>
          <Text style={styles.title}>{t('session.exerciseFeedbackTitle')}</Text>
          <Text style={styles.subtitle}>{currentVariant?.name || currentContent.name}</Text>
          <View style={styles.feedbackRow}>
            <PrimaryButton
              label={t('feedback.easy')}
              variant="secondary"
              onPress={() => handleExerciseFeedback('easy')}
            />
            <PrimaryButton label={t('feedback.right')} onPress={() => handleExerciseFeedback('right')} />
            <PrimaryButton
              label={t('feedback.hard')}
              variant="secondary"
              onPress={() => handleExerciseFeedback('hard')}
            />
          </View>
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
  muteIcon: { fontSize: 20 },
  loadBlock: { alignItems: 'center', gap: spacing.xs, marginBottom: spacing.sm },
  loadLabel: { ...typography.caption, color: colors.textMuted },
});
