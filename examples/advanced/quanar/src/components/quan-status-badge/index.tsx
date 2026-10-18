import React from 'react';
import type { QuanEntry } from '../../types';

export const QuanStatusBadge: React.FC<{ entry: QuanEntry }> = ({ entry }) => {
  const label = entry.status === 'loaded' ? entry.source.delivery : entry.status;
  return <span className={`qa-badge qa-badge--${entry.status}`}>{label}</span>;
};
