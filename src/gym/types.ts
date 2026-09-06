import type { Equipment, MovementType, MuscleGroup } from '../domain/exercises/types';

export type GymRole = 'master' | 'member';

export interface Gym {
  id: string;
  name: string;
  logoUrl: string | null;
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
export type TargetUnit = 'reps' | 'seconds';

/**
 * Una riga del piano assegnato dal master a un iscritto: riferisce o un esercizio della libreria
 * integrata nell'app (exerciseRef = suo id, es. 'bw-squat') o un GymExercise (exerciseRef = suo id).
 * Il volume (serie/ripetizioni o secondi/riposo) è scelto dal master per questo esercizio, per questo iscritto.
 */
export interface MemberPlanExercise {
  id: string;
  gymId: string;
  memberId: string;
  exerciseSource: ExerciseSource;
  exerciseRef: string;
  sortOrder: number;
  sets: number;
  target: number;
  targetUnit: TargetUnit;
  restSeconds: number;
  createdAt: string;
}

export type WorkoutSessionStatus = 'completed' | 'abandoned';

/** Una sessione guidata avviata da un iscritto: registrata a fine allenamento (completo o interrotto). */
export interface WorkoutSession {
  id: string;
  gymId: string;
  memberId: string;
  startedAt: string;
  completedAt: string | null;
  status: WorkoutSessionStatus;
  exercisesCompleted: number;
  exercisesTotal: number;
  createdAt: string;
}
