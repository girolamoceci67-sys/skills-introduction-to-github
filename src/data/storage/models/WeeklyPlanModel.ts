import { Model } from '@nozbe/watermelondb';
import { field, json } from '@nozbe/watermelondb/decorators';
import type { PlanDay } from '../../../domain/exercises/types';

const sanitizeDays = (raw: unknown): PlanDay[] => (Array.isArray(raw) ? (raw as PlanDay[]) : []);

export default class WeeklyPlanModel extends Model {
  static table = 'weekly_plans';

  @field('user_id') userId!: string;
  @field('week_start_date') weekStartDate!: string;
  @field('difficulty_tier_snapshot') difficultyTierSnapshot!: number;
  @json('days_json', sanitizeDays) days!: PlanDay[];
}
