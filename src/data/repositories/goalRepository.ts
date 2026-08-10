import { Q } from '@nozbe/watermelondb';
import { database } from '../storage/db';
import WeeklyGoalModel from '../storage/models/WeeklyGoalModel';
import type { WeeklyGoal } from '../../domain/exercises/types';
import { bumpRefreshBus } from '../refreshBus';

const collection = () => database.get<WeeklyGoalModel>('weekly_goals');

function toDomain(model: WeeklyGoalModel): WeeklyGoal {
  return {
    id: model.id,
    userId: model.userId,
    weekStartDate: model.weekStartDate,
    targetSessions: model.targetSessions,
    completedSessions: model.completedSessions,
    reminderEnabled: model.reminderEnabled,
    reminderTimeOfDay: model.reminderTimeOfDay,
  };
}

export async function getGoalForWeek(userId: string, weekStartDate: string): Promise<WeeklyGoal | null> {
  const rows = await collection()
    .query(Q.where('user_id', userId), Q.where('week_start_date', weekStartDate), Q.take(1))
    .fetch();
  return rows[0] ? toDomain(rows[0]) : null;
}

export async function setWeeklyGoal(input: {
  userId: string;
  weekStartDate: string;
  targetSessions: number;
  reminderEnabled: boolean;
  reminderTimeOfDay: string | null;
}): Promise<WeeklyGoal> {
  const existing = await getGoalForWeek(input.userId, input.weekStartDate);
  if (existing) {
    const model = await collection().find(existing.id);
    const updated = await database.write(async () =>
      model.update((record) => {
        record.targetSessions = input.targetSessions;
        record.reminderEnabled = input.reminderEnabled;
        record.reminderTimeOfDay = input.reminderTimeOfDay;
      })
    );
    bumpRefreshBus();
    return toDomain(updated);
  }

  const created = await database.write(async () =>
    collection().create((model) => {
      model.userId = input.userId;
      model.weekStartDate = input.weekStartDate;
      model.targetSessions = input.targetSessions;
      model.completedSessions = 0;
      model.reminderEnabled = input.reminderEnabled;
      model.reminderTimeOfDay = input.reminderTimeOfDay;
    })
  );
  bumpRefreshBus();
  return toDomain(created);
}

export async function incrementGoalCompletedSessions(userId: string, weekStartDate: string): Promise<WeeklyGoal | null> {
  const existing = await getGoalForWeek(userId, weekStartDate);
  if (!existing) return null;
  const model = await collection().find(existing.id);
  const updated = await database.write(async () =>
    model.update((record) => {
      record.completedSessions = record.completedSessions + 1;
    })
  );
  bumpRefreshBus();
  return toDomain(updated);
}
