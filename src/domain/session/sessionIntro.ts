import type { Exercise, GoalType, PlanDay, WeeklyPlan } from '../exercises/types';

export type DayFocus = 'bodyweight' | 'dumbbell' | 'mixed';

/** Attrezzatura prevalente negli esercizi del giorno: 'mixed' se non c'è una maggioranza netta. */
export function dayFocus(day: PlanDay, exerciseLibrary: Exercise[]): DayFocus | null {
  if (day.type !== 'training' || day.exercises.length === 0) return null;
  const byId = new Map(exerciseLibrary.map((e) => [e.id, e]));
  let dumbbellCount = 0;
  let bodyweightCount = 0;
  for (const planExercise of day.exercises) {
    const exercise = byId.get(planExercise.exerciseId);
    if (exercise?.equipment === 'dumbbell') dumbbellCount += 1;
    else bodyweightCount += 1;
  }
  if (dumbbellCount === 0) return 'bodyweight';
  if (bodyweightCount === 0) return 'dumbbell';
  return 'mixed';
}

/**
 * Converte lo score interno (1-3) in una scala 1-10 in stile RPE, solo per presentazione:
 * più leggibile per l'utente di un decimale su un range 1-3 non familiare.
 */
export function rpeFromDifficultyScore(score: number): number {
  const clamped = Math.min(3, Math.max(1, score));
  return Math.round(((clamped - 1) / 2) * 9) + 1;
}

export interface NextDayPreview {
  type: 'training' | 'rest';
  focus: DayFocus | null;
}

/** Il giorno immediatamente successivo nella settimana (per l'anteprima "domani"), null se non c'è (fine settimana). */
export function nextDayPreview(plan: WeeklyPlan, currentDayIndex: number, exerciseLibrary: Exercise[]): NextDayPreview | null {
  const next = plan.days.find((d) => d.dayIndex === currentDayIndex + 1);
  if (!next) return null;
  return { type: next.type, focus: next.type === 'training' ? dayFocus(next, exerciseLibrary) : null };
}

export const OBJECTIVE_BY_GOAL: Record<GoalType, string> = {
  stay_consistent: 'sessionIntro.objectiveStayConsistent',
  build_strength_foundation: 'sessionIntro.objectiveBuildStrength',
  improve_mobility: 'sessionIntro.objectiveImproveMobility',
  general_energy: 'sessionIntro.objectiveGeneralEnergy',
};
