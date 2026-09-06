import { Database } from '@nozbe/watermelondb';
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';

import { migrations } from './migrations';
import UserProfileModel from './models/UserProfileModel';
import WeeklyGoalModel from './models/WeeklyGoalModel';
import WeeklyPlanModel from './models/WeeklyPlanModel';
import WorkoutSessionModel from './models/WorkoutSessionModel';
import { schema } from './schema';

// SQLiteAdapter è nativo e non gira in browser: su web usiamo LokiJSAdapter,
// persistito in IndexedDB, dietro lo stesso adapter interface di WatermelonDB.
const adapter = new LokiJSAdapter({
  schema,
  migrations,
  useWebWorker: false,
  useIncrementalIndexedDB: true,
  dbName: 'corpolibero',
  onSetUpError: (error) => {
    console.error('[db] Errore inizializzazione WatermelonDB (web)', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [UserProfileModel, WeeklyPlanModel, WorkoutSessionModel, WeeklyGoalModel],
});
