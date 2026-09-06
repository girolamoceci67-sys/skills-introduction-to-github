import { create } from 'zustand';

interface AuthSessionState {
  /** Vive solo in memoria: si azzera ad ogni riavvio dell'app, così il login viene richiesto di nuovo. */
  isAuthenticated: boolean;
  markAuthenticated: () => void;
}

export const useAuthSession = create<AuthSessionState>((set) => ({
  isAuthenticated: false,
  markAuthenticated: () => set({ isAuthenticated: true }),
}));
