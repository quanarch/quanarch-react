import { STORAGE_KEYS } from '../../constants';

type Listener = (token: string | null) => void;
const listeners = new Set<Listener>();

/** Keeps the session token and tells listeners when it changes. */
export const authManager = {
  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  setToken(token: string): void {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    listeners.forEach((l) => l(token));
  },

  clear(): void {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    listeners.forEach((l) => l(null));
  },

  onChange(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
