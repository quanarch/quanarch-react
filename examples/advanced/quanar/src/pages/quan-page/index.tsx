import React from 'react';
import { QuanErrorBoundary, QuanLoadInfo } from '../../components';
import { useAuth, useQuans } from '../../hooks';
import { STRINGS } from '../../langs';

interface QuanPageProps {
  name: string;
  // The quan's page component, as its manifest gives it.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  permission?: string;
}

/** A quan's route: how it was loaded, then the quan itself. */
export const QuanPage: React.FC<QuanPageProps> = ({ name, component: Component, permission }) => {
  const { hasPermission } = useAuth();
  const { get } = useQuans();
  const entry = get(name);
  if (!entry) return null;

  return (
    <div className="qa-page">
      <QuanLoadInfo entry={entry} />
      {permission && !hasPermission(permission) ? (
        <p className="qa-error">{STRINGS.noPermission}</p>
      ) : (
        <QuanErrorBoundary name={entry.source.displayName}>
          <Component />
        </QuanErrorBoundary>
      )}
    </div>
  );
};
