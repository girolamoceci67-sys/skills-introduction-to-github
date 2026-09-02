import type { Equipment, MovementType, MuscleGroup } from '../domain/exercises/types';

export type GymRole = 'master' | 'member';

export interface Gym {
  id: string;
  name: string;
  createdAt: string;
}

export interface GymProfile {
  id: string;
  gymId: string;
  role: GymRole;
  displayName: string;
  createdAt: string;
}

/** Esercizio aggiunto dal master oltre alla libreria integrata nell'app, valido solo per la sua palestra. */
export interface GymExercise {
  id: string;
  gymId: string;
  createdBy: string;
  name: string;
  instructions: string;
  muscleGroup: MuscleGroup;
  movementType: MovementType;
  equipment: Equipment;
  createdAt: string;
}

export type ExerciseSource = 'builtin' | 'gym_custom';

/**
 * Una riga del piano assegnato dal master a un iscritto: riferisce o un esercizio della libreria
 * integrata nell'app (exerciseRef = suo id, es. 'bw-squat') o un GymExercise (exerciseRef = suo id).
 */
export interface MemberPlanExercise {
  id: string;
  gymId: string;
  memberId: string;
  exerciseSource: ExerciseSource;
  exerciseRef: string;
  sortOrder: number;
  createdAt: string;
}
