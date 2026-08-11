import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { migrations } from './migrations';
import UserProfileModel from './models/UserProfileModel';
import WeeklyGoalModel from './models/WeeklyGoalModel';
import WeeklyPlanModel from './models/WeeklyPlanModel';
import WorkoutSessionModel from './models/WorkoutSessionModel';
import { schema } from './schema';

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  jsi: true,
  dbName: 'corpolibero',
  onSetUpError: (error) => {
    // Errore di apertura/migrazione del DB locale: non c'è un fallback in v1,
    // la app non può funzionare offline-first senza storage locale valido.
    console.error('[db] Errore inizializzazione WatermelonDB', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [UserProfileModel, WeeklyPlanModel, WorkoutSessionModel, WeeklyGoalModel],
});
