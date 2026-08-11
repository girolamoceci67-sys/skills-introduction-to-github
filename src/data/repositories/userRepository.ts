import { Q } from '@nozbe/watermelondb';
import { database } from '../storage/db';
import UserProfileModel from '../storage/models/UserProfileModel';
import type {
  GoalType,
  LimitationTag,
  StartingLevel,
  UserProfile,
} from '../../domain/exercises/types';
import { initialDifficultyScoreFor } from '../../domain/engine/progressionRules';
import { bumpRefreshBus } from '../refreshBus';

const collection = () => database.get<UserProfileModel>('user_profiles');

function toDomain(model: UserProfileModel): UserProfile {
  return {
    id: model.id,
    createdAt: model.createdAt,
    startingLevel: model.startingLevel as StartingLevel,
    goal: model.goal as GoalType,
    daysPerWeekAvailable: model.daysPerWeekAvailable,
    limitations: model.limitations as LimitationTag[],
    difficultyScore: model.difficultyScore,
    consecutiveEasyCount: model.consecutiveEasyCount,
    consecutiveHardOrMissedCount: model.consecutiveHardOrMissedCount,
    hasDumbbells: model.hasDumbbells,
    dumbbellMinKg: model.dumbbellMinKg,
    dumbbellMaxKg: model.dumbbellMaxKg,
    dumbbellModuleUnlocked: model.dumbbellModuleUnlocked,
    dumbbellReaskDismissed: model.dumbbellReaskDismissed,
  };
}

/** In v1 l'app è single-profile: esiste al più un UserProfile locale. */
export async function getCurrentUser(): Promise<UserProfile | null> {
  const rows = await collection().query(Q.take(1)).fetch();
  return rows[0] ? toDomain(rows[0]) : null;
}

export async function createUserFromOnboarding(input: {
  startingLevel: StartingLevel;
  goal: GoalType;
  daysPerWeekAvailable: number;
  limitations: LimitationTag[];
  hasDumbbells: boolean;
  dumbbellMinKg: number | null;
  dumbbellMaxKg: number | null;
}): Promise<UserProfile> {
  const created = await database.write(async () => {
    return collection().create((model) => {
      model.createdAt = new Date().toISOString();
      model.startingLevel = input.startingLevel;
      model.goal = input.goal;
      model.daysPerWeekAvailable = input.daysPerWeekAvailable;
      model.limitations = input.limitations;
      model.difficultyScore = initialDifficultyScoreFor(input.startingLevel);
      model.consecutiveEasyCount = 0;
      model.consecutiveHardOrMissedCount = 0;
      model.hasDumbbells = input.hasDumbbells;
      model.dumbbellMinKg = input.dumbbellMinKg;
      model.dumbbellMaxKg = input.dumbbellMaxKg;
      // Sblocco immediato solo se confermato in onboarding (logica B): altrimenti si ri-chiede
      // al raggiungimento della soglia di progresso nel modulo a corpo libero.
      model.dumbbellModuleUnlocked = input.hasDumbbells;
      model.dumbbellReaskDismissed = false;
    });
  });
  bumpRefreshBus();
  return toDomain(created);
}

export async function updateUser(user: UserProfile): Promise<UserProfile> {
  const model = await collection().find(user.id);
  const updated = await database.write(async () =>
    model.update((record) => {
      record.difficultyScore = user.difficultyScore;
      record.consecutiveEasyCount = user.consecutiveEasyCount;
      record.consecutiveHardOrMissedCount = user.consecutiveHardOrMissedCount;
      record.daysPerWeekAvailable = user.daysPerWeekAvailable;
      record.limitations = user.limitations;
      record.goal = user.goal;
      record.hasDumbbells = user.hasDumbbells;
      record.dumbbellMinKg = user.dumbbellMinKg;
      record.dumbbellMaxKg = user.dumbbellMaxKg;
      record.dumbbellModuleUnlocked = user.dumbbellModuleUnlocked;
      record.dumbbellReaskDismissed = user.dumbbellReaskDismissed;
    })
  );
  bumpRefreshBus();
  return toDomain(updated);
}
