import { Model } from '@nozbe/watermelondb';
import { field, json } from '@nozbe/watermelondb/decorators';
import type { SessionExerciseLog } from '../../../domain/exercises/types';

const sanitizeLogs = (raw: unknown): SessionExerciseLog[] =>
  Array.isArray(raw) ? (raw as SessionExerciseLog[]) : [];

export default class WorkoutSessionModel extends Model {
  static table = 'workout_sessions';

  @field('plan_day_id') planDayId!: string;
  @field('user_id') userId!: string;
  @field('started_at') startedAt!: string;
  @field('completed_at') completedAt!: string | null;
  @field('status') status!: string;
  @json('exercise_logs_json', sanitizeLogs) exerciseLogs!: SessionExerciseLog[];
  @field('pre_session_energy') preSessionEnergy!: number;
  @field('post_session_feedback') postSessionFeedback!: string | null;
}
