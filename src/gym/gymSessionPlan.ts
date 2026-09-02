import type { Equipment, Exercise, MovementType } from '../domain/exercises/types';
import type { GymExercise, MemberPlanExercise } from './types';

export interface GymRuntimeExercise {
  /** id della riga member_plan_exercises, univoco nel piano. */
  key: string;
  source: 'builtin' | 'gym_custom';
  /** id della libreria integrata, o id di GymExercise. */
  exerciseId: string;
  movementType: MovementType;
  equipment: Equipment;
  loadRangeKg?: { min: number; max: number };
  sets: number;
  target: number;
  targetUnit: 'reps' | 'seconds';
  restSeconds: number;
  /** Presente solo per source 'gym_custom': la libreria integrata risolve nome/istruzioni via i18n invece. */
  customContent?: { name: string; instructions: string };
}

/**
 * Volume fisso per le sessioni palestra in v1: stessi valori di riferimento del tier 1 usato per i
 * nuovi utenti individuali (2 serie, 8-10 rip. → punto medio 9, 60s di riposo). Il master sceglie
 * quali esercizi assegnare, non ancora quante serie/ripetizioni: personalizzazione per-esercizio
 * lasciata a un round successivo.
 */
const DEFAULT_SETS = 2;
const DEFAULT_REPS = 9;
const HOLD_SECONDS_PER_REP_UNIT = 3;
const DEFAULT_REST_SECONDS = 60;

export function buildGymRuntimePlan(
  plan: MemberPlanExercise[],
  builtinLibrary: Exercise[],
  gymExercises: GymExercise[]
): GymRuntimeExercise[] {
  const builtinById = new Map(builtinLibrary.map((e) => [e.id, e]));
  const gymById = new Map(gymExercises.map((e) => [e.id, e]));
  const items: GymRuntimeExercise[] = [];

  for (const row of plan) {
    if (row.exerciseSource === 'builtin') {
      const exercise = builtinById.get(row.exerciseRef);
      if (!exercise) continue;
      const isHold = exercise.movementType === 'hold';
      items.push({
        key: row.id,
        source: 'builtin',
        exerciseId: exercise.id,
        movementType: exercise.movementType,
        equipment: exercise.equipment,
        loadRangeKg: exercise.loadRangeKg,
        sets: DEFAULT_SETS,
        target: isHold ? DEFAULT_REPS * HOLD_SECONDS_PER_REP_UNIT : DEFAULT_REPS,
        targetUnit: isHold ? 'seconds' : 'reps',
        restSeconds: DEFAULT_REST_SECONDS,
      });
    } else {
      const custom = gymById.get(row.exerciseRef);
      if (!custom) continue;
      const isHold = custom.movementType === 'hold';
      items.push({
        key: row.id,
        source: 'gym_custom',
        exerciseId: custom.id,
        movementType: custom.movementType,
        equipment: custom.equipment,
        sets: DEFAULT_SETS,
        target: isHold ? DEFAULT_REPS * HOLD_SECONDS_PER_REP_UNIT : DEFAULT_REPS,
        targetUnit: isHold ? 'seconds' : 'reps',
        restSeconds: DEFAULT_REST_SECONDS,
        customContent: { name: custom.name, instructions: custom.instructions },
      });
    }
  }

  return items;
}
