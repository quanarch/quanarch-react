import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { STRINGS } from '../../langs';
import type { QuanEntry } from '../../types';
import { QuanStatusBadge } from '../quan-status-badge';

interface SidebarProps {
  entries: QuanEntry[];
}

const linkClass = ({ isActive }: { isActive: boolean }) => (isActive ? 'layout__link is-active' : 'layout__link');

export const Sidebar: React.FC<SidebarProps> = ({ entries }) => {
  return (
    <aside className="layout__sidebar">
      <nav>
        <NavLink to={ROUTES.HOME} end className={linkClass}>
          {STRINGS.home}
        </NavLink>
        <div className="layout__group">{STRINGS.quans}</div>
        {entries.map((entry) => (
          <NavLink key={entry.source.name} to={entry.manifest?.routes[0]?.path ?? `/${entry.source.name}`} className={linkClass}>
            <span>{entry.source.displayName}</span>
            <QuanStatusBadge entry={entry} />
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
