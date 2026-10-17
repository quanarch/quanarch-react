import type { ReactNode } from 'react';
import './index.css';

export interface UserCardProps {
  title: string;
  children: ReactNode;
}

export function UserCard({ title, children }: UserCardProps) {
  return (
    <section className="user-card">
      <h1>{title}</h1>
      {children}
    </section>
  );
}
