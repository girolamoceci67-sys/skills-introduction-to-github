import { create } from 'zustand';

import { getGym, getMyGymProfile, signOutGym } from './gymRepository';
import type { Gym, GymProfile } from './types';

type GymSessionStatus = 'unknown' | 'signed_out' | 'ready';

interface GymSessionState {
  status: GymSessionStatus;
  profile: GymProfile | null;
  gym: Gym | null;
  /** Ricarica profilo e palestra dell'utente Supabase attualmente loggato (o segna signed_out se nessuno). */
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useGymSession = create<GymSessionState>((set) => ({
  status: 'unknown',
  profile: null,
  gym: null,
  refresh: async () => {
    const profile = await getMyGymProfile();
    if (!profile) {
      set({ status: 'signed_out', profile: null, gym: null });
      return;
    }
    const gym = await getGym(profile.gymId);
    set({ status: 'ready', profile, gym });
  },
  signOut: async () => {
    await signOutGym();
    set({ status: 'signed_out', profile: null, gym: null });
  },
}));
