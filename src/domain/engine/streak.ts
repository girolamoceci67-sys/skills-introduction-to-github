import { addDays, isAfter, isSameDay, parseISO, startOfDay } from 'date-fns';
import type { WeeklyPlan } from '../exercises/types';

interface FlatDay {
  date: Date;
  type: 'training' | 'rest';
  sessionId?: string;
}

function flattenPlan(plan: WeeklyPlan): FlatDay[] {
  const weekStart = parseISO(plan.weekStartDate);
  return plan.days.map((day) => ({
    date: addDays(weekStart, day.dayIndex),
    type: day.type,
    sessionId: day.sessionId,
  }));
}

/**
 * Giorni consecutivi di costanza, contando all'indietro da oggi: un giorno di riposo pianificato
 * non interrompe la streak, un giorno di allenamento completato la allunga, un giorno di
 * allenamento passato e non svolto la interrompe. L'allenamento odierno non ancora svolto non
 * interrompe la streak (c'è ancora tempo per farlo).
 */
export function computeCurrentStreak(plans: WeeklyPlan[], today: Date = new Date()): number {
  const todayStart = startOfDay(today);
  const allDays = plans
    .flatMap(flattenPlan)
    .filter((day) => !isAfter(startOfDay(day.date), todayStart))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  let streak = 0;
  for (const day of allDays) {
    if (day.type === 'rest') continue;
    if (day.sessionId) {
      streak += 1;
      continue;
    }
    if (isSameDay(day.date, todayStart)) continue;
    break;
  }
  return streak;
}

export interface WeeklyAdherencePoint {
  weekStartDate: string;
  adherencePercent: number;
  trainingDays: number;
  completedDays: number;
}

/** Aderenza settimanale (% giorni di allenamento pianificati e completati), ordinata dalla più vecchia alla più recente. */
export function computeWeeklyAdherence(plans: WeeklyPlan[]): WeeklyAdherencePoint[] {
  return [...plans]
    .sort((a, b) => a.weekStartDate.localeCompare(b.weekStartDate))
    .map((plan) => {
      const trainingDays = plan.days.filter((d) => d.type === 'training');
      const completedDays = trainingDays.filter((d) => d.sessionId).length;
      return {
        weekStartDate: plan.weekStartDate,
        adherencePercent: trainingDays.length === 0 ? 0 : Math.round((completedDays / trainingDays.length) * 100),
        trainingDays: trainingDays.length,
        completedDays,
      };
    });
}
