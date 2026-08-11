import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: 'user_profiles',
      columns: [
        // "created_at" è un nome riservato da WatermelonDB (deve essere number/epoch): usiamo un nome custom.
        { name: 'profile_created_at', type: 'string' },
        { name: 'starting_level', type: 'string' },
        { name: 'goal', type: 'string' },
        { name: 'days_per_week_available', type: 'number' },
        { name: 'limitations_json', type: 'string' },
        { name: 'difficulty_score', type: 'number' },
        { name: 'consecutive_easy_count', type: 'number' },
        { name: 'consecutive_hard_or_missed_count', type: 'number' },
        { name: 'has_dumbbells', type: 'boolean' },
        { name: 'dumbbell_min_kg', type: 'number', isOptional: true },
        { name: 'dumbbell_max_kg', type: 'number', isOptional: true },
        { name: 'dumbbell_module_unlocked', type: 'boolean' },
        { name: 'dumbbell_reask_dismissed', type: 'boolean' },
      ],
    }),
    tableSchema({
      name: 'weekly_plans',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'week_start_date', type: 'string', isIndexed: true },
        { name: 'difficulty_tier_snapshot', type: 'number' },
        { name: 'days_json', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'workout_sessions',
      columns: [
        { name: 'plan_day_id', type: 'string' },
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'started_at', type: 'string', isIndexed: true },
        { name: 'completed_at', type: 'string', isOptional: true },
        { name: 'status', type: 'string', isIndexed: true },
        { name: 'exercise_logs_json', type: 'string' },
        { name: 'pre_session_energy', type: 'number' },
        { name: 'post_session_feedback', type: 'string', isOptional: true },
      ],
    }),
    tableSchema({
      name: 'weekly_goals',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'week_start_date', type: 'string', isIndexed: true },
        { name: 'target_sessions', type: 'number' },
        { name: 'completed_sessions', type: 'number' },
        { name: 'reminder_enabled', type: 'boolean' },
        { name: 'reminder_time_of_day', type: 'string', isOptional: true },
      ],
    }),
  ],
});
