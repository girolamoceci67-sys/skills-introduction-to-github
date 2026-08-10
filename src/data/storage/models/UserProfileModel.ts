import { Model } from '@nozbe/watermelondb';
import { field, json } from '@nozbe/watermelondb/decorators';

const sanitizeStringArray = (raw: unknown): string[] => (Array.isArray(raw) ? raw : []);

export default class UserProfileModel extends Model {
  static table = 'user_profiles';

  @field('profile_created_at') createdAt!: string;
  @field('starting_level') startingLevel!: string;
  @field('goal') goal!: string;
  @field('days_per_week_available') daysPerWeekAvailable!: number;
  @json('limitations_json', sanitizeStringArray) limitations!: string[];
  @field('difficulty_score') difficultyScore!: number;
  @field('consecutive_easy_count') consecutiveEasyCount!: number;
  @field('consecutive_hard_or_missed_count') consecutiveHardOrMissedCount!: number;
}
