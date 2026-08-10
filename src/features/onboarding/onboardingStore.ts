import { create } from 'zustand';
import type { GoalType, LimitationTag, StartingLevel } from '../../domain/exercises/types';

interface OnboardingDraft {
  startingLevel: StartingLevel | null;
  goal: GoalType | null;
  daysPerWeekAvailable: number | null;
  limitations: LimitationTag[];
  setStartingLevel: (value: StartingLevel) => void;
  setGoal: (value: GoalType) => void;
  setDaysPerWeekAvailable: (value: number) => void;
  toggleLimitation: (value: LimitationTag) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingDraft>((set, get) => ({
  startingLevel: null,
  goal: null,
  daysPerWeekAvailable: null,
  limitations: [],
  setStartingLevel: (value) => set({ startingLevel: value }),
  setGoal: (value) => set({ goal: value }),
  setDaysPerWeekAvailable: (value) => set({ daysPerWeekAvailable: value }),
  toggleLimitation: (value) => {
    const current = get().limitations;
    if (value === 'none') {
      set({ limitations: current.includes('none') ? [] : ['none'] });
      return;
    }
    const withoutNone = current.filter((tag) => tag !== 'none');
    const next = withoutNone.includes(value)
      ? withoutNone.filter((tag) => tag !== value)
      : [...withoutNone, value];
    set({ limitations: next });
  },
  reset: () =>
    set({ startingLevel: null, goal: null, daysPerWeekAvailable: null, limitations: [] }),
}));
