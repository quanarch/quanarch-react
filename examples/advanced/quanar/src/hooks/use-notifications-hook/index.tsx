import React, { createContext, useContext, useMemo, useSyncExternalStore } from 'react';
import { notificationService } from '../../services';
import type { Toast } from '../../types';

interface NotificationsContextValue {
  toasts: Toast[];
  notify: typeof notificationService.notify;
  dismiss: typeof notificationService.dismiss;
}

const NotificationsContext = createContext<NotificationsContextValue | null>(null);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const state = useSyncExternalStore(notificationService.subscribe, notificationService.getState);
  const value = useMemo<NotificationsContextValue>(
    () => ({ toasts: state.toasts, notify: notificationService.notify, dismiss: notificationService.dismiss }),
    [state.toasts]
  );
  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};

export function useNotifications(): NotificationsContextValue {
  const context = useContext(NotificationsContext);
  if (!context) throw new Error('useNotifications must be used inside NotificationsProvider');
  return context;
}
