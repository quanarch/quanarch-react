import React from 'react';
import { CounterCard, AnalyticsTable } from '../../components';
import { AnalyticsProvider, useAnalytics } from '../../hooks';

const AnalyticsView: React.FC = () => {
  const { viewer, items, loading, error, summary, count, formatCell, askToCount, act, openLinked } = useAnalytics();

  return (
    <div className="qa-page">
      <h1>Analytics</h1>
      <p className="qa-muted">Signed in as {viewer.name}. Traffic and conversion.</p>

      <div className="qa-grid">
        <section className="qa-card">
          <h2>Metrics up this week</h2>
          <span className="qa-stat">{summary}</span>
        </section>
        <CounterCard count={count} onAsk={askToCount} />
      </div>

      <section className="qa-card">
        {error && <p className="qa-error">{error}</p>}
        {loading ? <p className="qa-muted">Loading…</p> : <AnalyticsTable items={items} formatCell={formatCell} />}
        <div className="qa-row">
          <button className="qa-btn qa-btn--primary" disabled={!viewer.canAct} onClick={() => void act()}>
            Refresh metrics
          </button>
          {!viewer.canAct && <span className="qa-muted">Needs analytics:read, which this user does not have.</span>}
          <button className="qa-btn" onClick={openLinked}>
            Open inventory
          </button>
        </div>
      </section>
    </div>
  );
};

export const AnalyticsPage: React.FC = () => (
  <AnalyticsProvider>
    <AnalyticsView />
  </AnalyticsProvider>
);
