import { useTranslation } from 'react-i18next';

import type { GoalType, LimitationTag, StartingLevel } from '../../domain/exercises/types';

export interface OnboardingOption<TValue extends string> {
  value: TValue;
  title: string;
  description: string;
}

const LEVEL_VALUES: StartingLevel[] = ['sedentary', 'occasional', 'returning'];
const GOAL_VALUES: GoalType[] = [
  'stay_consistent',
  'build_strength_foundation',
  'improve_mobility',
  'general_energy',
];
const LIMITATION_VALUES: LimitationTag[] = ['knees', 'back', 'shoulders', 'wrists', 'none'];

export function useOnboardingOptions() {
  const { t } = useTranslation();

  const startingLevelOptions: OnboardingOption<StartingLevel>[] = LEVEL_VALUES.map((value) => ({
    value,
    title: t(`onboarding.levelOptions.${value}.title`),
    description: t(`onboarding.levelOptions.${value}.description`),
  }));

  const goalOptions: OnboardingOption<GoalType>[] = GOAL_VALUES.map((value) => ({
    value,
    title: t(`onboarding.goalOptions.${value}.title`),
    description: t(`onboarding.goalOptions.${value}.description`),
  }));

  const limitationOptions: OnboardingOption<LimitationTag>[] = LIMITATION_VALUES.map((value) => ({
    value,
    title: t(`onboarding.limitationOptions.${value}.title`),
    description: t(`onboarding.limitationOptions.${value}.description`),
  }));

  return { startingLevelOptions, goalOptions, limitationOptions };
}

export const daysPerWeekOptions = [2, 3, 4, 5, 6];

/** Coincide col vincolo v1 del modulo manubri: carico sempre compreso tra 5 e 25 kg. */
export const DUMBBELL_RANGE_OPTIONS_KG = [5, 10, 15, 20, 25];
