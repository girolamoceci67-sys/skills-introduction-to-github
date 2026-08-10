export type LimitationTag = 'knees' | 'back' | 'shoulders' | 'wrists' | 'none';

export type StartingLevel = 'sedentary' | 'occasional' | 'returning';

export type GoalType =
  | 'stay_consistent'
  | 'build_strength_foundation'
  | 'improve_mobility'
  | 'general_energy';

export type MuscleGroup =
  | 'full_body'
  | 'legs_glutes'
  | 'core'
  | 'push'
  | 'pull'
  | 'mobility_cardio';

/** v1 è pensata per principianti: tier 3 è già il massimo previsto, nessuna progressione atletica oltre. */
export type DifficultyTier = 1 | 2 | 3;

export type ExerciseVariantKind = 'easier' | 'base' | 'harder';

export interface ExerciseVariant {
  name: string;
  instructions: string[];
  executionCues: string[];
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  baseDifficultyTier: DifficultyTier;
  instructions: string[];
  executionCues: string[];
  easierVariant: ExerciseVariant;
  harderVariant: ExerciseVariant;
  contraindicationTags: LimitationTag[];
  spaceRequirement: '2x2m';
}

export interface UserProfile {
  id: string;
  createdAt: string;
  startingLevel: StartingLevel;
  goal: GoalType;
  daysPerWeekAvailable: number;
  limitations: LimitationTag[];
  difficultyScore: number;
  consecutiveEasyCount: number;
  consecutiveHardOrMissedCount: number;
}

export interface PlanDayExercise {
  exerciseId: string;
  variant: ExerciseVariantKind;
  sets: number;
  repsTarget: number | 'to_form_breakdown';
  restSeconds: number;
}

export interface PlanDay {
  dayIndex: number;
  type: 'training' | 'rest';
  exercises: PlanDayExercise[];
  sessionId?: string;
}

export interface WeeklyPlan {
  id: string;
  userId: string;
  weekStartDate: string;
  difficultyTierSnapshot: DifficultyTier;
  days: PlanDay[];
}

export type PerceivedDifficulty = 'easy' | 'right' | 'hard';

export interface SessionExerciseLog {
  exerciseId: string;
  variantUsed: ExerciseVariantKind;
  setsCompleted: number;
  setsPlanned: number;
}

export type WorkoutSessionStatus = 'completed' | 'abandoned' | 'skipped';

export interface WorkoutSession {
  id: string;
  planDayId: string;
  userId: string;
  startedAt: string;
  completedAt: string | null;
  status: WorkoutSessionStatus;
  exerciseLogs: SessionExerciseLog[];
  preSessionEnergy: 1 | 2 | 3 | 4 | 5;
  postSessionFeedback: PerceivedDifficulty | null;
}

export interface WeeklyGoal {
  id: string;
  userId: string;
  weekStartDate: string;
  targetSessions: number;
  completedSessions: number;
  reminderEnabled: boolean;
  reminderTimeOfDay: string | null;
}
