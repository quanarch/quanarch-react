import type { ReactNode } from 'react';
import { QUANAR_TITLE } from '../../constants';
import './index.css';

export interface MainLayoutProps {
  nav?: ReactNode;
  children: ReactNode;
}

export function MainLayout({ nav, children }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <header className="main-layout__bar">
        <strong>{QUANAR_TITLE}</strong>
        {nav}
      </header>
      <main className="main-layout__main">{children}</main>
    </div>
  );
}
