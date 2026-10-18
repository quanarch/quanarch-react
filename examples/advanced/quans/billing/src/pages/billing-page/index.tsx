import React from 'react';
import { CounterCard, BillingTable } from '../../components';
import { BillingProvider, useBilling } from '../../hooks';

const BillingView: React.FC = () => {
  const { viewer, items, loading, error, summary, count, formatCell, askToCount, act, openLinked } = useBilling();

  return (
    <div className="qa-page">
      <h1>Billing</h1>
      <p className="qa-muted">Signed in as {viewer.name}. Invoices and payments.</p>

      <div className="qa-grid">
        <section className="qa-card">
          <h2>Outstanding</h2>
          <span className="qa-stat">{summary}</span>
        </section>
        <CounterCard count={count} onAsk={askToCount} />
      </div>

      <section className="qa-card">
        {error && <p className="qa-error">{error}</p>}
        {loading ? <p className="qa-muted">Loading…</p> : <BillingTable items={items} formatCell={formatCell} />}
        <div className="qa-row">
          <button className="qa-btn qa-btn--primary" disabled={!viewer.canAct} onClick={() => void act()}>
            Export invoices
          </button>
          {!viewer.canAct && <span className="qa-muted">Needs billing:export, which this user does not have.</span>}
          <button className="qa-btn" onClick={openLinked}>
            Open reports
          </button>
        </div>
      </section>
    </div>
  );
};

export const BillingPage: React.FC = () => (
  <BillingProvider>
    <BillingView />
  </BillingProvider>
);
