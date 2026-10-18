import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { DemoUserList, LoginForm, ToastList } from '../../components';
import { ROUTES } from '../../constants';
import { useAuth, useNotifications } from '../../hooks';
import { STRINGS } from '../../langs';

export const LoginPage: React.FC = () => {
  const { user, status, error, demoUsers, login } = useAuth();
  const { toasts, dismiss } = useNotifications();
  const [picked, setPicked] = useState<{ username: string; password: string }>();

  if (user) return <Navigate to={ROUTES.HOME} replace />;

  return (
    <div className="login">
      <div className="login__panel qa-card">
        <h1>{STRINGS.appName}</h1>
        <p className="qa-muted">Sign in to load the quans you are allowed to see.</p>
        <LoginForm busy={status === 'signing-in'} error={error} initial={picked} onSubmit={(u, p) => void login(u, p)} />
      </div>
      <DemoUserList users={demoUsers} onPick={setPicked} />
      <ToastList toasts={toasts} onDismiss={dismiss} />
    </div>
  );
};
