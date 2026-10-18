import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Header, LoadingScreen, Sidebar, ToastList } from '../../components';
import { ROUTES } from '../../constants';
import { useAuth, useNotifications, useQuans } from '../../hooks';

/** Header and sidebar stay; the quanar's pages and the quans render in the content area. */
export const DashboardLayout: React.FC = () => {
  const { user, status, logout } = useAuth();
  const { entries } = useQuans();
  const { toasts, dismiss } = useNotifications();

  if (status === 'restoring') return <LoadingScreen />;
  if (!user) return <Navigate to={ROUTES.LOGIN} replace />;

  return (
    <div className="layout">
      <Header user={user} onSignOut={() => void logout()} />
      <Sidebar entries={entries} />
      <main className="layout__content">
        <Outlet />
      </main>
      <ToastList toasts={toasts} onDismiss={dismiss} />
    </div>
  );
};
