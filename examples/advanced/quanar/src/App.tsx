import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NavigationBridge } from './components';
import { AuthProvider, NotificationsProvider, QuansProvider } from './hooks';
import { AppRoutes } from './router';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavigationBridge />
      <NotificationsProvider>
        <AuthProvider>
          <QuansProvider>
            <AppRoutes />
          </QuansProvider>
        </AuthProvider>
      </NotificationsProvider>
    </BrowserRouter>
  );
};
