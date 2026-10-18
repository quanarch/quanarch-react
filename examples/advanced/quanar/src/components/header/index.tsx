import React from 'react';
import { STRINGS } from '../../langs';
import type { User } from '../../types';

interface HeaderProps {
  user: User;
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onSignOut }) => {
  return (
    <header className="layout__header">
      <strong>{STRINGS.appName}</strong>
      <span className="qa-badge">quanar</span>
      <span className="layout__spacer" />
      <span className="layout__user">
        {user.name} <span className="qa-muted">@{user.username}</span>
      </span>
      <button className="qa-btn" onClick={onSignOut}>
        {STRINGS.signOut}
      </button>
    </header>
  );
};
