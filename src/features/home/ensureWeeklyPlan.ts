import { generateWeeklyPlan } from '../../domain/engine/adaptEngine';
import { exerciseLibrary } from '../../domain/exercises/library';
import type { UserProfile, WeeklyPlan } from '../../domain/exercises/types';
import { getPlanForWeek, saveGeneratedPlan } from '../../data/repositories/planRepository';
import { createLocalId } from '../../utils/id';
import { currentWeekStartDate } from '../../utils/week';

/** Ritorna il piano della settimana corrente, generandolo con il motore adattivo se non esiste ancora. */
export async function ensureWeeklyPlanForCurrentWeek(user: UserProfile): Promise<WeeklyPlan> {
  const weekStartDate = currentWeekStartDate();
  const existing = await getPlanForWeek(user.id, weekStartDate);
  if (existing) return existing;

  const generated = generateWeeklyPlan({
    user,
    exerciseLibrary,
    weekStartDate,
    createId: createLocalId,
  });

  return saveGeneratedPlan({
    userId: generated.userId,
    weekStartDate: generated.weekStartDate,
    difficultyTierSnapshot: generated.difficultyTierSnapshot,
    days: generated.days,
  });
}
