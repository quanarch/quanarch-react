import React from 'react';
import { CounterCard, ReportsTable } from '../../components';
import { ReportsProvider, useReports } from '../../hooks';

const ReportsView: React.FC = () => {
  const { viewer, items, loading, error, summary, count, formatCell, askToCount, act, openLinked } = useReports();

  return (
    <div className="qa-page">
      <h1>Reports</h1>
      <p className="qa-muted">Signed in as {viewer.name}. Monthly reports.</p>

      <div className="qa-grid">
        <section className="qa-card">
          <h2>Reports this month</h2>
          <span className="qa-stat">{summary}</span>
        </section>
        <CounterCard count={count} onAsk={askToCount} />
      </div>

      <section className="qa-card">
        {error && <p className="qa-error">{error}</p>}
        {loading ? <p className="qa-muted">Loading…</p> : <ReportsTable items={items} formatCell={formatCell} />}
        <div className="qa-row">
          <button className="qa-btn qa-btn--primary" disabled={!viewer.canAct} onClick={() => void act()}>
            Generate summary
          </button>
          {!viewer.canAct && <span className="qa-muted">Needs reports:read, which this user does not have.</span>}
          <button className="qa-btn" onClick={openLinked}>
            Open analytics
          </button>
        </div>
      </section>
    </div>
  );
};

export const ReportsPage: React.FC = () => (
  <ReportsProvider>
    <ReportsView />
  </ReportsProvider>
);
