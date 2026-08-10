import { Q } from '@nozbe/watermelondb';
import { database } from '../storage/db';
import WorkoutSessionModel from '../storage/models/WorkoutSessionModel';
import type {
  PerceivedDifficulty,
  SessionExerciseLog,
  WorkoutSession,
  WorkoutSessionStatus,
} from '../../domain/exercises/types';
import { bumpRefreshBus } from '../refreshBus';

const collection = () => database.get<WorkoutSessionModel>('workout_sessions');

function toDomain(model: WorkoutSessionModel): WorkoutSession {
  return {
    id: model.id,
    planDayId: model.planDayId,
    userId: model.userId,
    startedAt: model.startedAt,
    completedAt: model.completedAt,
    status: model.status as WorkoutSessionStatus,
    exerciseLogs: model.exerciseLogs,
    preSessionEnergy: model.preSessionEnergy as WorkoutSession['preSessionEnergy'],
    postSessionFeedback: model.postSessionFeedback as PerceivedDifficulty | null,
  };
}

export async function startSession(input: {
  planDayId: string;
  userId: string;
  preSessionEnergy: WorkoutSession['preSessionEnergy'];
}): Promise<WorkoutSession> {
  const created = await database.write(async () =>
    collection().create((model) => {
      model.planDayId = input.planDayId;
      model.userId = input.userId;
      model.startedAt = new Date().toISOString();
      model.completedAt = null;
      model.status = 'abandoned'; // stato provvisorio finché la sessione non viene chiusa esplicitamente
      model.exerciseLogs = [];
      model.preSessionEnergy = input.preSessionEnergy;
      model.postSessionFeedback = null;
    })
  );
  bumpRefreshBus();
  return toDomain(created);
}

export async function completeSession(
  sessionId: string,
  input: { exerciseLogs: SessionExerciseLog[]; postSessionFeedback: PerceivedDifficulty }
): Promise<WorkoutSession> {
  const model = await collection().find(sessionId);
  const updated = await database.write(async () =>
    model.update((record) => {
      record.status = 'completed';
      record.completedAt = new Date().toISOString();
      record.exerciseLogs = input.exerciseLogs;
      record.postSessionFeedback = input.postSessionFeedback;
    })
  );
  bumpRefreshBus();
  return toDomain(updated);
}

export async function abandonSession(
  sessionId: string,
  exerciseLogs: SessionExerciseLog[]
): Promise<WorkoutSession> {
  const model = await collection().find(sessionId);
  const updated = await database.write(async () =>
    model.update((record) => {
      record.status = 'abandoned';
      record.completedAt = new Date().toISOString();
      record.exerciseLogs = exerciseLogs;
    })
  );
  bumpRefreshBus();
  return toDomain(updated);
}

export async function getSessionHistory(userId: string, limit = 100): Promise<WorkoutSession[]> {
  const rows = await collection()
    .query(Q.where('user_id', userId), Q.sortBy('started_at', Q.desc), Q.take(limit))
    .fetch();
  return rows.map(toDomain);
}
