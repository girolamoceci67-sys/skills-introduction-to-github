import type {
  DifficultyTier,
  Exercise,
  ExerciseVariantKind,
  MuscleGroup,
  PerceivedDifficulty,
  PlanDay,
  PlanDayExercise,
  UserProfile,
  WeeklyPlan,
  WorkoutSessionStatus,
} from '../exercises/types';
import {
  CONSECUTIVE_EASY_TO_PROGRESS,
  MAX_MISSED_TRAINING_DAYS_BEFORE_REGRESS,
  MICRO_PROGRESS_STEP,
  PROGRESS_STEP,
  REGRESS_STEP,
  WEEK_ROLLOVER_REGRESS_STEP,
  clampScore,
  tierFromScore,
  withinTierProgress,
} from './progressionRules';

function progress(user: UserProfile, step: number): UserProfile {
  return { ...user, difficultyScore: clampScore(user.difficultyScore + step) };
}

function regress(user: UserProfile, step: number): UserProfile {
  return { ...user, difficultyScore: clampScore(user.difficultyScore - step) };
}

/**
 * Applica il feedback di una sessione appena conclusa allo stato del motore adattivo.
 * Ritorna un nuovo UserProfile (nessuna mutazione).
 */
export function onSessionFeedback(
  user: UserProfile,
  status: WorkoutSessionStatus,
  feedback: PerceivedDifficulty | null
): UserProfile {
  if (status === 'abandoned') {
    return regress(
      { ...user, consecutiveEasyCount: 0, consecutiveHardOrMissedCount: user.consecutiveHardOrMissedCount + 1 },
      REGRESS_STEP
    );
  }

  if (status !== 'completed' || feedback === null) {
    return user;
  }

  if (feedback === 'easy') {
    const consecutiveEasyCount = user.consecutiveEasyCount + 1;
    const next = { ...user, consecutiveEasyCount, consecutiveHardOrMissedCount: 0 };
    if (consecutiveEasyCount >= CONSECUTIVE_EASY_TO_PROGRESS) {
      return progress({ ...next, consecutiveEasyCount: 0 }, PROGRESS_STEP);
    }
    return next;
  }

  if (feedback === 'right') {
    const next = { ...user, consecutiveEasyCount: 0, consecutiveHardOrMissedCount: 0 };
    return progress(next, MICRO_PROGRESS_STEP);
  }

  // feedback === 'hard'
  return regress(
    { ...user, consecutiveEasyCount: 0, consecutiveHardOrMissedCount: user.consecutiveHardOrMissedCount + 1 },
    REGRESS_STEP
  );
}

/**
 * Da chiamare al passaggio di settimana: penalizza costanza saltata o recupero non rispettato,
 * indipendentemente dal trend di difficoltà segnalato nelle singole sessioni.
 */
export function onWeekRollover(
  user: UserProfile,
  weekPlan: WeeklyPlan,
  options: { trainedOnRestDay?: boolean } = {}
): UserProfile {
  const missedTrainingDays = weekPlan.days.filter(
    (day) => day.type === 'training' && !day.sessionId
  ).length;
  const restDaysRespected = !options.trainedOnRestDay;

  if (missedTrainingDays >= MAX_MISSED_TRAINING_DAYS_BEFORE_REGRESS || !restDaysRespected) {
    return regress(user, WEEK_ROLLOVER_REGRESS_STEP);
  }
  return user;
}

const VOLUME_TABLE: Record<DifficultyTier, { sets: number; repsMin: number; repsMax: number; restSeconds: number }> = {
  1: { sets: 2, repsMin: 8, repsMax: 10, restSeconds: 60 },
  2: { sets: 3, repsMin: 10, repsMax: 12, restSeconds: 50 },
  3: { sets: 3, repsMin: 12, repsMax: 15, restSeconds: 45 },
};

/** Per gli esercizi isometrici il valore "ripetizioni" della tabella volumi viene convertito in secondi di mantenimento. */
const HOLD_SECONDS_PER_REP_UNIT = 3;

function variantForTier(exercise: Exercise, tier: DifficultyTier): ExerciseVariantKind {
  if (tier > exercise.baseDifficultyTier) return 'harder';
  if (tier < exercise.baseDifficultyTier) return 'easier';
  return 'base';
}

/** Distribuisce i giorni di allenamento nella settimana, con almeno un giorno di riposo tra due allenamenti quando possibile. */
function distributeTrainingDays(sessionsPerWeek: number): number[] {
  const clamped = Math.min(6, Math.max(2, sessionsPerWeek));
  const interval = 7 / clamped;
  const days = new Set<number>();
  for (let i = 0; i < clamped; i += 1) {
    days.add(Math.round(i * interval) % 7);
  }
  return Array.from(days).sort((a, b) => a - b);
}

const TRAINING_DAY_MUSCLE_SEQUENCE: MuscleGroup[] = [
  'mobility_cardio',
  'legs_glutes',
  'push',
  'pull',
  'core',
];

function pickExerciseForGroup(
  candidates: Exercise[],
  group: MuscleGroup,
  usedInWeek: Map<string, number>
): Exercise | null {
  const inGroup = candidates.filter((e) => e.muscleGroup === group);
  if (inGroup.length === 0) return null;
  // Preferisce l'esercizio del gruppo usato meno volte finora questa settimana, per varietà.
  return inGroup.reduce((best, current) => {
    const bestCount = usedInWeek.get(best.id) ?? 0;
    const currentCount = usedInWeek.get(current.id) ?? 0;
    return currentCount < bestCount ? current : best;
  });
}

export function generateWeeklyPlan(params: {
  user: UserProfile;
  exerciseLibrary: Exercise[];
  weekStartDate: string;
  createId: () => string;
}): WeeklyPlan {
  const { user, exerciseLibrary, weekStartDate, createId } = params;
  const tier = tierFromScore(user.difficultyScore);
  const progressInTier = withinTierProgress(user.difficultyScore);
  const volume = VOLUME_TABLE[tier];
  const repsTarget = Math.round(volume.repsMin + (volume.repsMax - volume.repsMin) * progressInTier);

  const eligibleExercises = exerciseLibrary.filter(
    (exercise) =>
      user.limitations.length === 0 ||
      user.limitations.includes('none') ||
      !exercise.contraindicationTags.some((tag) => user.limitations.includes(tag))
  );

  const trainingDayIndexes = new Set(distributeTrainingDays(user.daysPerWeekAvailable));
  const usedInWeek = new Map<string, number>();

  const days: PlanDay[] = [];
  for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
    if (!trainingDayIndexes.has(dayIndex)) {
      days.push({ dayIndex, type: 'rest', exercises: [] });
      continue;
    }

    const exercises: PlanDayExercise[] = [];
    for (const group of TRAINING_DAY_MUSCLE_SEQUENCE) {
      const exercise = pickExerciseForGroup(eligibleExercises, group, usedInWeek);
      if (!exercise) continue;
      usedInWeek.set(exercise.id, (usedInWeek.get(exercise.id) ?? 0) + 1);
      const isHold = exercise.movementType === 'hold';
      exercises.push({
        exerciseId: exercise.id,
        variant: variantForTier(exercise, tier),
        sets: volume.sets,
        target: isHold ? Math.round(repsTarget * HOLD_SECONDS_PER_REP_UNIT) : repsTarget,
        targetUnit: isHold ? 'seconds' : 'reps',
        restSeconds: volume.restSeconds,
      });
    }

    days.push({ dayIndex, type: 'training', exercises });
  }

  return {
    id: createId(),
    userId: user.id,
    weekStartDate,
    difficultyTierSnapshot: tier,
    days,
  };
}
