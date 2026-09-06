import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { Stack, router } from 'expo-router';

import { AnimatedPressable } from '../../../src/components/AnimatedPressable';
import { ExerciseAvatar } from '../../../src/components/avatar/ExerciseAvatar';
import { SessionCompleteCelebration } from '../../../src/components/celebration/SessionCompleteCelebration';
import { CountdownTimer } from '../../../src/components/CountdownTimer';
import { PrimaryButton } from '../../../src/components/PrimaryButton';
import { Screen } from '../../../src/components/Screen';
import { dumbbellLibrary } from '../../../src/domain/exercises/dumbbellLibrary';
import { useExerciseContent } from '../../../src/domain/exercises/exerciseContent';
import { exerciseLibrary } from '../../../src/domain/exercises/library';
import { estimatedRepsDurationSeconds } from '../../../src/domain/engine/progressionRules';
import { listGymExercises, listMemberPlan, logWorkoutSession } from '../../../src/gym/gymRepository';
import { buildGymRuntimePlan, type GymRuntimeExercise } from '../../../src/gym/gymSessionPlan';
import { useGymSession } from '../../../src/gym/gymSession';
import { colors, spacing, typography } from '../../../src/theme/theme';

const builtinLibrary = [...exerciseLibrary, ...dumbbellLibrary];

type Phase = 'loading' | 'empty' | 'intro' | 'exercise' | 'rest' | 'done';
type PendingAdvance = 'next_set' | 'next_exercise';

/** Nome + istruzioni dell'esercizio in corso: dalla libreria integrata (i18n) o dal contenuto personalizzato del master. */
function ExerciseContentBlock({ item }: { item: GymRuntimeExercise }) {
  const content = useExerciseContent(item.source === 'builtin' ? item.exerciseId : '');
  const name = item.source === 'builtin' ? content.name : (item.customContent?.name ?? '');
  const instructionLines = item.source === 'builtin' ? content.instructions : [item.customContent?.instructions ?? ''];

  return (
    <>
      <Text style={styles.exerciseName}>{name}</Text>
      <ExerciseAvatar exerciseId={item.exerciseId} />
      {instructionLines.map((step, i) => (
        <Text key={i} style={styles.stepText}>
          {step}
        </Text>
      ))}
    </>
  );
}

export default function GymGuidedSession() {
  const profile = useGymSession((state) => state.profile);
  const [phase, setPhase] = useState<Phase>('loading');
  const [items, setItems] = useState<GymRuntimeExercise[]>([]);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [setIndex, setSetIndex] = useState(0);
  const pendingAdvance = useRef<PendingAdvance>('next_set');
  const startedAt = useRef(new Date());

  useEffect(() => {
    if (!profile) return;
    let cancelled = false;
    Promise.all([listMemberPlan(profile.id), listGymExercises(profile.gymId)]).then(([plan, gymExercises]) => {
      if (cancelled) return;
      const runtime = buildGymRuntimePlan(plan, builtinLibrary, gymExercises);
      setItems(runtime);
      setPhase(runtime.length === 0 ? 'empty' : 'intro');
    });
    return () => {
      cancelled = true;
    };
  }, [profile]);

  const current = items[exerciseIndex] ?? null;

  function handleSetComplete() {
    if (!current) return;
    const isLastSet = setIndex + 1 >= current.sets;
    if (!isLastSet) {
      pendingAdvance.current = 'next_set';
      setPhase('rest');
      return;
    }
    if (exerciseIndex + 1 >= items.length) {
      if (profile) {
        logWorkoutSession({
          gymId: profile.gymId,
          memberId: profile.id,
          startedAt: startedAt.current,
          status: 'completed',
          exercisesCompleted: items.length,
          exercisesTotal: items.length,
        }).catch(() => {});
      }
      setPhase('done');
      return;
    }
    pendingAdvance.current = 'next_exercise';
    setPhase('rest');
  }

  function handleRestComplete() {
    if (pendingAdvance.current === 'next_exercise') {
      setExerciseIndex((i) => i + 1);
      setSetIndex(0);
    } else {
      setSetIndex((i) => i + 1);
    }
    setPhase('exercise');
  }

  function handleExitPress() {
    if (phase !== 'exercise' && phase !== 'rest') {
      router.back();
      return;
    }
    Alert.alert('Uscire dall\'allenamento?', 'I progressi di questa sessione verranno salvati come interrotta.', [
      { text: 'Annulla', style: 'cancel' },
      {
        text: 'Esci',
        style: 'destructive',
        onPress: () => {
          if (profile) {
            logWorkoutSession({
              gymId: profile.gymId,
              memberId: profile.id,
              startedAt: startedAt.current,
              status: 'abandoned',
              exercisesCompleted: exerciseIndex,
              exercisesTotal: items.length,
            }).catch(() => {});
          }
          router.back();
        },
      },
    ]);
  }

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerShown: phase !== 'done',
          gestureEnabled: false,
          headerLeft: () => (
            <AnimatedPressable onPress={handleExitPress} accessibilityRole="button" hitSlop={12}>
              <Text style={styles.exitLabel}>Esci</Text>
            </AnimatedPressable>
          ),
        }}
      />

      {phase === 'loading' && (
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} />
        </View>
      )}

      {phase === 'empty' && (
        <View style={styles.center}>
          <Text style={styles.title}>Nessun esercizio assegnato</Text>
          <Text style={styles.subtitle}>Il tuo istruttore non ha ancora impostato un piano per te.</Text>
          <PrimaryButton label="Torna indietro" onPress={() => router.back()} />
        </View>
      )}

      {phase === 'intro' && (
        <View style={styles.center}>
          <Text style={styles.title}>Pronto per iniziare?</Text>
          <Text style={styles.subtitle}>{items.length} esercizi nel tuo piano di oggi.</Text>
          <PrimaryButton label="Inizia l'allenamento" onPress={() => setPhase('exercise')} />
        </View>
      )}

      {phase === 'exercise' && current && (
        <View style={styles.center}>
          <Text style={styles.progressText}>
            Esercizio {exerciseIndex + 1} di {items.length} — Serie {setIndex + 1} di {current.sets}
          </Text>
          <ExerciseContentBlock item={current} />

          {current.targetUnit === 'seconds' ? (
            <CountdownTimer
              key={`hold-${exerciseIndex}-${setIndex}`}
              durationSeconds={current.target}
              label="Mantieni la posizione"
              onComplete={handleSetComplete}
            />
          ) : (
            <View style={styles.repsBlock}>
              <Text style={styles.repsTarget}>{current.target} ripetizioni</Text>
              <CountdownTimer
                key={`reps-${exerciseIndex}-${setIndex}`}
                durationSeconds={estimatedRepsDurationSeconds(current.target)}
                label="Esegui le ripetizioni"
                onComplete={handleSetComplete}
              />
              <PrimaryButton label="Serie completata" variant="secondary" onPress={handleSetComplete} />
            </View>
          )}
        </View>
      )}

      {phase === 'rest' && current && (
        <View style={styles.center}>
          <CountdownTimer
            key={`rest-${exerciseIndex}-${setIndex}`}
            durationSeconds={current.restSeconds}
            label="Riposo"
            onComplete={handleRestComplete}
          />
          <PrimaryButton label="Salta il riposo" variant="secondary" onPress={handleRestComplete} />
        </View>
      )}

      {phase === 'done' && (
        <SessionCompleteCelebration
          title="Allenamento completato! 🎉"
          subtitle={`Hai svolto ${items.length} esercizi. Complimenti!`}
          onContinue={() => router.replace('/gym/member')}
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
  exerciseName: { ...typography.title, color: colors.text, textAlign: 'center' },
  stepText: { ...typography.body, color: colors.text, textAlign: 'left', alignSelf: 'stretch' },
  repsBlock: { alignItems: 'center', gap: spacing.md, width: '100%' },
  repsTarget: { ...typography.title, fontSize: 40, color: colors.text },
  exitLabel: { ...typography.body, color: colors.primary, fontWeight: '600' },
});
