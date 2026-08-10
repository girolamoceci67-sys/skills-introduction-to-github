import { Q } from '@nozbe/watermelondb';
import { database } from '../storage/db';
import WeeklyPlanModel from '../storage/models/WeeklyPlanModel';
import type { DifficultyTier, PlanDay, WeeklyPlan } from '../../domain/exercises/types';
import { createLocalId } from '../../utils/id';
import { bumpRefreshBus } from '../refreshBus';

const collection = () => database.get<WeeklyPlanModel>('weekly_plans');

function toDomain(model: WeeklyPlanModel): WeeklyPlan {
  return {
    id: model.id,
    userId: model.userId,
    weekStartDate: model.weekStartDate,
    difficultyTierSnapshot: model.difficultyTierSnapshot as DifficultyTier,
    days: model.days,
  };
}

export async function getPlanForWeek(userId: string, weekStartDate: string): Promise<WeeklyPlan | null> {
  const rows = await collection()
    .query(Q.where('user_id', userId), Q.where('week_start_date', weekStartDate), Q.take(1))
    .fetch();
  return rows[0] ? toDomain(rows[0]) : null;
}

export async function getPlanById(planId: string): Promise<WeeklyPlan | null> {
  try {
    const model = await collection().find(planId);
    return toDomain(model);
  } catch {
    return null;
  }
}

export async function getLatestPlan(userId: string): Promise<WeeklyPlan | null> {
  const rows = await collection()
    .query(Q.where('user_id', userId), Q.sortBy('week_start_date', Q.desc), Q.take(1))
    .fetch();
  return rows[0] ? toDomain(rows[0]) : null;
}

export async function getRecentPlans(userId: string, limit = 12): Promise<WeeklyPlan[]> {
  const rows = await collection()
    .query(Q.where('user_id', userId), Q.sortBy('week_start_date', Q.desc), Q.take(limit))
    .fetch();
  return rows.map(toDomain);
}

export async function saveGeneratedPlan(plan: Omit<WeeklyPlan, 'id'>): Promise<WeeklyPlan> {
  const created = await database.write(async () =>
    collection().create((model) => {
      model.userId = plan.userId;
      model.weekStartDate = plan.weekStartDate;
      model.difficultyTierSnapshot = plan.difficultyTierSnapshot;
      model.days = plan.days;
    })
  );
  bumpRefreshBus();
  return toDomain(created);
}

/** Segna nel piano quale sessione è stata svolta per un dato giorno, per il calcolo di aderenza/rollover. */
export async function attachSessionToPlanDay(
  planId: string,
  dayIndex: number,
  sessionId: string
): Promise<WeeklyPlan> {
  const model = await collection().find(planId);
  const updated = await database.write(async () =>
    model.update((record) => {
      record.days = record.days.map((day: PlanDay) =>
        day.dayIndex === dayIndex ? { ...day, sessionId } : day
      );
    })
  );
  bumpRefreshBus();
  return toDomain(updated);
}

export function newLocalId(): string {
  return createLocalId();
}
