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
 * Costruisce il piano eseguibile in sessione a partire dalla selezione del master: sets/target/
 * targetUnit/restSeconds vengono presi direttamente dalla riga member_plan_exercises (scelti dal
 * master nell'editor del piano), non più da un volume fisso.
 */
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
      items.push({
        key: row.id,
        source: 'builtin',
        exerciseId: exercise.id,
        movementType: exercise.movementType,
        equipment: exercise.equipment,
        loadRangeKg: exercise.loadRangeKg,
        sets: row.sets,
        target: row.target,
        targetUnit: row.targetUnit,
        restSeconds: row.restSeconds,
      });
    } else {
      const custom = gymById.get(row.exerciseRef);
      if (!custom) continue;
      items.push({
        key: row.id,
        source: 'gym_custom',
        exerciseId: custom.id,
        movementType: custom.movementType,
        equipment: custom.equipment,
        sets: row.sets,
        target: row.target,
        targetUnit: row.targetUnit,
        restSeconds: row.restSeconds,
        customContent: { name: custom.name, instructions: custom.instructions },
      });
    }
  }

  return items;
}
