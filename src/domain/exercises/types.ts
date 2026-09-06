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
  | 'mobility_cardio'
  // Tassonomia per distretto corporeo, usata solo dal modulo manubri.
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'arms';

/** v1 è pensata per principianti: tier 3 è già il massimo previsto, nessuna progressione atletica oltre. */
export type DifficultyTier = 1 | 2 | 3;

export type ExerciseVariantKind = 'easier' | 'base' | 'harder';

/** 'hold' = mantenimento isometrico a tempo (es. plank); 'reps' = ripetizioni dinamiche. */
export type MovementType = 'reps' | 'hold';

export type Equipment = 'bodyweight' | 'dumbbell';

/** Vincolo v1 del modulo manubri: sempre compreso tra 5 e 25 kg per manubrio/mano. */
export interface LoadRangeKg {
  min: number;
  max: number;
}

/**
 * Contenuto localizzabile (nome, istruzioni, segnali, varianti) di un esercizio.
 * Vive nelle risorse i18n per lingua, non qui: questo tipo descrive solo la forma
 * di quel contenuto, risolto a runtime con useExerciseContent(exerciseId).
 */
export interface ExerciseVariantContent {
  name: string;
  instructions: string[];
  executionCues: string[];
}

export interface ExerciseContent {
  name: string;
  instructions: string[];
  executionCues: string[];
  easierVariant: ExerciseVariantContent;
  harderVariant: ExerciseVariantContent;
}

export interface Exercise {
  id: string;
  muscleGroup: MuscleGroup;
  /** Gruppi coinvolti in modo secondario. Solo informativo in v1 (non guida la selezione del piano). */
  secondaryMuscleGroups?: MuscleGroup[];
  baseDifficultyTier: DifficultyTier;
  movementType: MovementType;
  contraindicationTags: LimitationTag[];
  spaceRequirement: '2x2m';
  equipment: Equipment;
  /** Presente solo per equipment === 'dumbbell'. */
  loadRangeKg?: LoadRangeKg;
  /** Incremento minimo tra un carico consigliato e il successivo. Presente solo per equipment === 'dumbbell'. */
  loadStepKg?: number;
  /**
   * 'free' = disponibile a tutti gli utenti che hanno sbloccato il modulo manubri.
   * 'premium' = riservato a un futuro livello a pagamento (non ancora implementato:
   * nessun esercizio in libreria usa oggi 'premium', il campo esiste solo per
   * predisporre l'estensione senza dover ritoccare lo schema in seguito).
   */
  accessTier: 'free' | 'premium';
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
  /** true solo se confermato esplicitamente in onboarding (o alla ri-richiesta a soglia raggiunta). */
  hasDumbbells: boolean;
  dumbbellMinKg: number | null;
  dumbbellMaxKg: number | null;
  /**
   * Calcolato, non impostato direttamente dall'utente: true quando hasDumbbells è confermato.
   * Tenuto come campo persistito (invece che ricalcolato ad ogni lettura) per semplicità di
   * lettura nei repository, ma la logica che lo determina vive in un unico punto
   * (src/domain/engine/dumbbellUnlock.ts).
   */
  dumbbellModuleUnlocked: boolean;
  /** true se l'utente ha già risposto "no" alla ri-richiesta a soglia raggiunta: evita di richiederlo di nuovo ad ogni visita. */
  dumbbellReaskDismissed: boolean;
}

export interface PlanDayExercise {
  exerciseId: string;
  variant: ExerciseVariantKind;
  sets: number;
  /** Ripetizioni per set se targetUnit è 'reps', secondi di mantenimento per set se 'seconds'. */
  target: number;
  targetUnit: 'reps' | 'seconds';
  restSeconds: number;
  /** Carico consigliato in kg per questo esercizio in questa sessione. Presente solo per esercizi manubri. */
  loadKg?: number;
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
  /** Carico realmente usato in kg. Presente solo per esercizi manubri. */
  loadKgUsed?: number;
  /**
   * Feedback specifico su QUESTO esercizio (solo esercizi manubri, per la progressione di
   * carico per-esercizio). Il feedback di fine sessione (WorkoutSession.postSessionFeedback)
   * resta quello che guida il motore adattivo generale del modulo corpo libero: i due non si
   * mescolano.
   */
  exerciseFeedback?: PerceivedDifficulty;
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
