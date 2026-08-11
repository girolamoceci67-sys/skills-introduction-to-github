import { generateWeeklyPlan, onWeekRollover } from '../../domain/engine/adaptEngine';
import { exerciseLibrary } from '../../domain/exercises/library';
import type { UserProfile, WeeklyPlan } from '../../domain/exercises/types';
import { getLatestPlan, getPlanForWeek, saveGeneratedPlan } from '../../data/repositories/planRepository';
import { updateUser } from '../../data/repositories/userRepository';
import { createLocalId } from '../../utils/id';
import { currentWeekStartDate } from '../../utils/week';

/** Ritorna il piano della settimana corrente, generandolo con il motore adattivo se non esiste ancora. */
export async function ensureWeeklyPlanForCurrentWeek(user: UserProfile): Promise<WeeklyPlan> {
  const weekStartDate = currentWeekStartDate();
  const existing = await getPlanForWeek(user.id, weekStartDate);
  if (existing) return existing;

  // Si sta generando il piano di una settimana nuova: prima di farlo, applica l'eventuale
  // penalità di passaggio settimana (troppi giorni di allenamento saltati) rispetto
  // all'ultimo piano registrato. Se è la primissima settimana dell'utente non c'è un piano
  // precedente su cui valutarla.
  const previousPlan = await getLatestPlan(user.id);
  const rolledOverUser = previousPlan ? onWeekRollover(user, previousPlan) : user;
  if (rolledOverUser.difficultyScore !== user.difficultyScore) {
    await updateUser(rolledOverUser);
  }

  const generated = generateWeeklyPlan({
    user: rolledOverUser,
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
