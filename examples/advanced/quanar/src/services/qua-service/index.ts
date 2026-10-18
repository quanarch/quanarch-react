import { httpClient, plugQuaCore } from '../../core';
import { useAuthStore } from '../../store';
import { authService } from '../auth-service';
import { navigationService } from '../navigation-service';
import { notificationService } from '../notification-service';

export const quaService = {
  /** Implements every call of the qua with the quanar's own services and plugs it in. */
  plug(): void {
    plugQuaCore({
      http: httpClient,
      increment: (value) => value + 1,
      getUser: () => useAuthStore.getState().user,
      hasPermission: (permission) => authService.hasPermission(permission),
      navigate: (path) => navigationService.navigate(path),
      notify: (message, kind) => notificationService.notify(message, kind),
    });
  },
};
