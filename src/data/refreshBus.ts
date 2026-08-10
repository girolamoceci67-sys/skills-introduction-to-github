import { create } from 'zustand';

/**
 * Contatore incrementato dopo ogni scrittura sui repository. Le schermate lo osservano
 * per ri-eseguire le query, senza dipendere da API di navigazione specifiche per il refetch.
 */
interface RefreshBus {
  version: number;
  bump: () => void;
}

export const useRefreshBus = create<RefreshBus>((set) => ({
  version: 0,
  bump: () => set((state) => ({ version: state.version + 1 })),
}));

export function bumpRefreshBus(): void {
  useRefreshBus.getState().bump();
}
