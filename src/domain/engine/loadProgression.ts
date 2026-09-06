import type { WorkoutSession } from '../exercises/types';

export interface ExerciseLoadPoint {
  date: string;
  loadKg: number;
}

export interface ExerciseLoadSeries {
  exerciseId: string;
  points: ExerciseLoadPoint[];
}

/**
 * Carico usato nel tempo per ogni esercizio manubri, dal più vecchio al più recente. Solo gli
 * esercizi manubri valorizzano loadKgUsed nei log: gli esercizi a corpo libero non compaiono qui.
 */
export function computeLoadProgressionByExercise(history: WorkoutSession[]): ExerciseLoadSeries[] {
  const byExercise = new Map<string, ExerciseLoadPoint[]>();
  const sessionsOldestFirst = [...history].sort((a, b) => a.startedAt.localeCompare(b.startedAt));

  for (const session of sessionsOldestFirst) {
    for (const log of session.exerciseLogs) {
      if (log.loadKgUsed === undefined) continue;
      const points = byExercise.get(log.exerciseId) ?? [];
      points.push({ date: session.startedAt, loadKg: log.loadKgUsed });
      byExercise.set(log.exerciseId, points);
    }
  }

  return Array.from(byExercise.entries()).map(([exerciseId, points]) => ({ exerciseId, points }));
}
