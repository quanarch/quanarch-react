import React from 'react';
import type { DemoUser } from '../../constants';
import { STRINGS } from '../../langs';

interface DemoUserListProps {
  users: DemoUser[];
  onPick: (user: DemoUser) => void;
}

export const DemoUserList: React.FC<DemoUserListProps> = ({ users, onPick }) => {
  return (
    <section className="login__demo">
      <h2>{STRINGS.demoUsers}</h2>
      {users.map((user) => (
        <button key={user.username} className="qa-card login__demo-user" onClick={() => onPick(user)}>
          <strong>
            {user.username} / {user.password}
          </strong>
          <span className="qa-muted">{user.description}</span>
        </button>
      ))}
    </section>
  );
};
