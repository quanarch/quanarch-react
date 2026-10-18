import React from 'react';
import { QuanLoadInfo } from '../../components';
import { useQuans } from '../../hooks';
import { STRINGS } from '../../langs';

export const NotFoundPage: React.FC = () => {
  const { loading, entries } = useQuans();
  const failed = entries.filter((e) => e.status === 'error');

  if (loading) return <p className="qa-page">{STRINGS.loading}</p>;
  return (
    <div className="qa-page">
      <p>{STRINGS.notFound}</p>
      {failed.map((entry) => (
        <QuanLoadInfo key={entry.source.name} entry={entry} />
      ))}
    </div>
  );
};
