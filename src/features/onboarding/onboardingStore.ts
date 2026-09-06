import { create } from 'zustand';
import type { GoalType, LimitationTag, StartingLevel } from '../../domain/exercises/types';

interface OnboardingDraft {
  startingLevel: StartingLevel | null;
  goal: GoalType | null;
  daysPerWeekAvailable: number | null;
  limitations: LimitationTag[];
  hasDumbbells: boolean | null;
  dumbbellMinKg: number | null;
  dumbbellMaxKg: number | null;
  setStartingLevel: (value: StartingLevel) => void;
  setGoal: (value: GoalType) => void;
  setDaysPerWeekAvailable: (value: number) => void;
  toggleLimitation: (value: LimitationTag) => void;
  setHasDumbbells: (value: boolean) => void;
  setDumbbellMinKg: (value: number) => void;
  setDumbbellMaxKg: (value: number) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingDraft>((set, get) => ({
  startingLevel: null,
  goal: null,
  daysPerWeekAvailable: null,
  limitations: [],
  hasDumbbells: null,
  dumbbellMinKg: null,
  dumbbellMaxKg: null,
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
  setHasDumbbells: (value) =>
    set(
      value
        ? { hasDumbbells: true }
        : { hasDumbbells: false, dumbbellMinKg: null, dumbbellMaxKg: null }
    ),
  setDumbbellMinKg: (value) => {
    const currentMax = get().dumbbellMaxKg;
    set({ dumbbellMinKg: value, dumbbellMaxKg: currentMax !== null && currentMax < value ? value : currentMax });
  },
  setDumbbellMaxKg: (value) => {
    const currentMin = get().dumbbellMinKg;
    set({ dumbbellMaxKg: value, dumbbellMinKg: currentMin !== null && currentMin > value ? value : currentMin });
  },
  reset: () =>
    set({
      startingLevel: null,
      goal: null,
      daysPerWeekAvailable: null,
      limitations: [],
      hasDumbbells: null,
      dumbbellMinKg: null,
      dumbbellMaxKg: null,
    }),
}));
