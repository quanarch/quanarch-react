import React, { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from 'react';
import { authService } from '../../services';

type AuthContextValue = Pick<ReturnType<typeof authService.getState>, 'user' | 'status' | 'error'> & {
  demoUsers: ReturnType<typeof authService.demoUsers>;
  login: typeof authService.login;
  logout: typeof authService.logout;
  hasPermission: typeof authService.hasPermission;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const state = useSyncExternalStore(authService.subscribe, authService.getState);

  useEffect(() => {
    void authService.restore();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: state.user,
      status: state.status,
      error: state.error,
      demoUsers: authService.demoUsers(),
      login: authService.login,
      logout: authService.logout,
      hasPermission: authService.hasPermission,
    }),
    [state.user, state.status, state.error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
