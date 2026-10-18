import { authApi } from '../../api';
import { DEMO_USERS } from '../../constants';
import { authManager } from '../../core';
import { useAuthStore } from '../../store';
import { errorMessage } from '../../utils';
import { notificationService } from '../notification-service';

// When the token goes away (sign-out, or the server rejected it), so does the user.
authManager.onChange((token) => {
  if (!token) useAuthStore.getState().reset();
});

export const authService = {
  getState: () => useAuthStore.getState(),
  subscribe: (listener: () => void) => useAuthStore.subscribe(listener),

  demoUsers: () => DEMO_USERS,

  /** Picks up the session left from a previous visit, if it is still valid. */
  async restore(): Promise<void> {
    if (!authManager.getToken()) {
      useAuthStore.getState().reset();
      return;
    }
    try {
      useAuthStore.getState().setUser(await authApi.me());
    } catch {
      authManager.clear();
    }
  },

  async login(username: string, password: string): Promise<boolean> {
    const store = useAuthStore.getState();
    store.setStatus('signing-in');
    store.setError(null);
    try {
      const { token, user } = await authApi.login({ username, password });
      authManager.setToken(token);
      useAuthStore.getState().setUser(user);
      notificationService.notify(`Signed in as ${user.name}`, 'success');
      return true;
    } catch (error) {
      useAuthStore.getState().setStatus('anonymous');
      useAuthStore.getState().setError(errorMessage(error));
      return false;
    }
  },

  async logout(): Promise<void> {
    try {
      await authApi.logout();
    } finally {
      authManager.clear();
    }
  },

  hasPermission(permission: string): boolean {
    return useAuthStore.getState().user?.permissions.includes(permission) ?? false;
  },
};
