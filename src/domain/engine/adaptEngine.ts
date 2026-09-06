import type {
  DifficultyTier,
  Equipment,
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

/**
 * Per ogni slot della sequenza giornaliera, quali gruppi muscolari (inclusa la tassonomia più
 * fine del modulo manubri) sono candidati equivalenti. 'mobility_cardio' non ha equivalente
 * manubri in v1. Mappatura decisa autonomamente (non derivabile dal codice esistente): braccia
 * ('arms', bicipiti+tricipiti insieme in libreria) assegnate a 'pull' perché la maggioranza degli
 * esercizi braccia in libreria è un movimento di tirata; i composti 'full_body' assegnati a
 * 'legs_glutes' perché entrambi partono da uno squat.
 */
const GROUP_EQUIVALENTS: Record<MuscleGroup, MuscleGroup[]> = {
  mobility_cardio: ['mobility_cardio'],
  legs_glutes: ['legs_glutes', 'full_body'],
  push: ['push', 'chest', 'shoulders'],
  pull: ['pull', 'back', 'arms'],
  core: ['core'],
  full_body: ['full_body'],
  chest: ['chest'],
  back: ['back'],
  shoulders: ['shoulders'],
  arms: ['arms'],
};

function pickExerciseForGroup(
  candidates: Exercise[],
  group: MuscleGroup,
  usedInWeek: Map<string, number>,
  preferEquipment: Equipment
): Exercise | null {
  const equivalentGroups = GROUP_EQUIVALENTS[group];
  const inGroup = candidates.filter((e) => equivalentGroups.includes(e.muscleGroup));
  if (inGroup.length === 0) return null;
  // Preferisce l'esercizio del gruppo usato meno volte finora questa settimana, per varietà;
  // a parità di utilizzo, alterna il tipo di equipaggiamento (vedi preferEquipment in
  // generateWeeklyPlan) così il modulo manubri viene realmente proposto e non resta sempre
  // "perdente" contro il corpo libero solo perché compare prima nell'array dei candidati.
  return inGroup.reduce((best, current) => {
    const bestCount = usedInWeek.get(best.id) ?? 0;
    const currentCount = usedInWeek.get(current.id) ?? 0;
    if (currentCount !== bestCount) return currentCount < bestCount ? current : best;
    if (current.equipment === preferEquipment && best.equipment !== preferEquipment) return current;
    return best;
  });
}

/** Tutti i carichi selezionabili per un esercizio manubri, alla granularità del suo loadStepKg. Usato per l'override manuale in sessione. */
export function loadOptionsKg(exercise: Exercise): number[] {
  if (exercise.equipment !== 'dumbbell' || !exercise.loadRangeKg) return [];
  const step = exercise.loadStepKg ?? 1;
  const options: number[] = [];
  for (let kg = exercise.loadRangeKg.min; kg <= exercise.loadRangeKg.max + 1e-9; kg += step) {
    options.push(Math.round(kg * 10) / 10);
  }
  return options;
}

/**
 * Carico consigliato per un esercizio manubri: interpola dentro l'intersezione tra il range
 * dell'esercizio e il range di manubri posseduto dall'utente, in base alla progressione nel tier
 * corrente, poi arrotonda allo step di carico dell'esercizio.
 */
function recommendedLoadKg(exercise: Exercise, user: UserProfile, progressInTier: number): number | undefined {
  if (exercise.equipment !== 'dumbbell' || !exercise.loadRangeKg) return undefined;
  const step = exercise.loadStepKg ?? 1;
  const ownedMin = user.dumbbellMinKg ?? exercise.loadRangeKg.min;
  const ownedMax = user.dumbbellMaxKg ?? exercise.loadRangeKg.max;
  const rangeMin = Math.max(exercise.loadRangeKg.min, ownedMin);
  const rangeMax = Math.max(rangeMin, Math.min(exercise.loadRangeKg.max, ownedMax));
  const raw = rangeMin + (rangeMax - rangeMin) * progressInTier;
  const steps = Math.round((raw - exercise.loadRangeKg.min) / step);
  const snapped = exercise.loadRangeKg.min + steps * step;
  return Math.min(rangeMax, Math.max(rangeMin, snapped));
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

  const eligibleExercises = exerciseLibrary.filter((exercise) => {
    const passesLimitations =
      user.limitations.length === 0 ||
      user.limitations.includes('none') ||
      !exercise.contraindicationTags.some((tag) => user.limitations.includes(tag));
    if (!passesLimitations || exercise.accessTier !== 'free') return false;
    if (exercise.equipment === 'dumbbell') {
      if (!exercise.loadRangeKg) return false;
      // Serve un manubrio nel range posseduto che copra almeno il carico minimo dell'esercizio.
      return user.dumbbellMaxKg !== null && user.dumbbellMaxKg >= exercise.loadRangeKg.min;
    }
    return true;
  });

  const trainingDayIndexes = new Set(distributeTrainingDays(user.daysPerWeekAvailable));
  const usedInWeek = new Map<string, number>();
  let trainingDayCounter = 0;

  const days: PlanDay[] = [];
  for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
    if (!trainingDayIndexes.has(dayIndex)) {
      days.push({ dayIndex, type: 'rest', exercises: [] });
      continue;
    }

    // Alterna i giorni di allenamento tra corpo libero e manubri (quando disponibili), così il
    // modulo manubri viene realmente proposto e non solo teoricamente idoneo.
    trainingDayCounter += 1;
    const preferEquipment: Equipment = trainingDayCounter % 2 === 0 ? 'dumbbell' : 'bodyweight';

    const exercises: PlanDayExercise[] = [];
    for (const group of TRAINING_DAY_MUSCLE_SEQUENCE) {
      const exercise = pickExerciseForGroup(eligibleExercises, group, usedInWeek, preferEquipment);
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
        loadKg: recommendedLoadKg(exercise, user, progressInTier),
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
