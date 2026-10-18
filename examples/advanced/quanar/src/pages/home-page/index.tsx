import React from 'react';
import { QuanStatusBadge } from '../../components';
import { useAuth, useQuans } from '../../hooks';

/** The quanar's own page: no quan is involved. */
export const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { entries } = useQuans();

  return (
    <div className="qa-page">
      <h1>Local page</h1>
      <p>
        This page belongs to the quanar itself. Everything under <em>Quans</em> in the sidebar was loaded at runtime,
        each in a different way; open one to see how it got here.
      </p>

      <section className="qa-card">
        <h2>Signed in as {user?.name}</h2>
        <p className="qa-muted">Permissions: {user?.permissions.join(', ')}</p>
      </section>

      <section className="qa-card">
        <h2>Quans for this user</h2>
        <table className="qa-table">
          <thead>
            <tr>
              <th>Quan</th>
              <th>Delivery</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.source.name}>
                <td>{entry.source.displayName}</td>
                <td>{entry.source.delivery}</td>
                <td>
                  <QuanStatusBadge entry={entry} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="qa-muted">
          A user without a quan's permission never receives it: the server leaves it out of the list, so its code does not
          reach the browser.
        </p>
      </section>
    </div>
  );
};
