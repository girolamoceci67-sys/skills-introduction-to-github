import type { DifficultyTier, StartingLevel } from '../exercises/types';

export const MIN_DIFFICULTY_SCORE = 1;
export const MAX_DIFFICULTY_SCORE = 3;

/** Salto di score dopo 2 feedback "easy" consecutivi: passa di tier. */
export const PROGRESS_STEP = 0.5;
/** Micro-incremento su feedback "right": alza le reps dentro il tier corrente (doppia progressione). */
export const MICRO_PROGRESS_STEP = 0.1;
/** Regressione immediata su feedback "hard" o sessione abbandonata. */
export const REGRESS_STEP = 0.5;
/** Regressione a fine settimana se recupero non rispettato o troppe sessioni saltate. */
export const WEEK_ROLLOVER_REGRESS_STEP = 0.3;

export const CONSECUTIVE_EASY_TO_PROGRESS = 2;
export const MAX_MISSED_TRAINING_DAYS_BEFORE_REGRESS = 2;

/**
 * Tempo stimato per ripetizione (in secondi) per gli esercizi a ripetizioni, usato in sessione per
 * mostrare un conto alla rovescia e avanzare automaticamente come già avviene per gli esercizi a
 * tempo. Valore scelto in base a un ritmo controllato tipico per movimenti a corpo libero/manubri
 * per principianti (circa 3-4 secondi a ripetizione tra fase di discesa e salita); non derivabile
 * dal codice esistente, quindi assunzione da validare.
 */
export const SECONDS_PER_REP = 3.5;

/** Durata stimata in secondi per completare un set di `reps` ripetizioni, arrotondata al secondo. */
export function estimatedRepsDurationSeconds(reps: number): number {
  return Math.max(1, Math.round(reps * SECONDS_PER_REP));
}

const STARTING_SCORE_BY_LEVEL: Record<StartingLevel, number> = {
  sedentary: MIN_DIFFICULTY_SCORE,
  occasional: MIN_DIFFICULTY_SCORE + 0.5,
  returning: MIN_DIFFICULTY_SCORE + 1,
};

export function initialDifficultyScoreFor(startingLevel: StartingLevel): number {
  return STARTING_SCORE_BY_LEVEL[startingLevel];
}

export function clampScore(score: number): number {
  return Math.min(MAX_DIFFICULTY_SCORE, Math.max(MIN_DIFFICULTY_SCORE, score));
}

export function tierFromScore(score: number): DifficultyTier {
  return Math.round(clampScore(score)) as DifficultyTier;
}

/** Posizione (0-1) dentro il tier corrente, usata per interpolare le reps target. */
export function withinTierProgress(score: number): number {
  const tier = tierFromScore(score);
  const tierFloor = tier - 0.5;
  const tierCeil = tier + 0.5;
  return Math.min(1, Math.max(0, (clampScore(score) - tierFloor) / (tierCeil - tierFloor)));
}
