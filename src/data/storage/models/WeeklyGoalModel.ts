import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class WeeklyGoalModel extends Model {
  static table = 'weekly_goals';

  @field('user_id') userId!: string;
  @field('week_start_date') weekStartDate!: string;
  @field('target_sessions') targetSessions!: number;
  @field('completed_sessions') completedSessions!: number;
  @field('reminder_enabled') reminderEnabled!: boolean;
  @field('reminder_time_of_day') reminderTimeOfDay!: string | null;
}
