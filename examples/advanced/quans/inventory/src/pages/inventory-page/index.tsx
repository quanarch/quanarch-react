import React from 'react';
import { CounterCard, InventoryTable } from '../../components';
import { InventoryProvider, useInventory } from '../../hooks';

const InventoryView: React.FC = () => {
  const { viewer, items, loading, error, summary, count, formatCell, askToCount, act, openLinked } = useInventory();

  return (
    <div className="qa-page">
      <h1>Inventory</h1>
      <p className="qa-muted">Signed in as {viewer.name}. Stock levels across warehouses.</p>

      <div className="qa-grid">
        <section className="qa-card">
          <h2>Below reorder level</h2>
          <span className="qa-stat">{summary}</span>
        </section>
        <CounterCard count={count} onAsk={askToCount} />
      </div>

      <section className="qa-card">
        {error && <p className="qa-error">{error}</p>}
        {loading ? <p className="qa-muted">Loading…</p> : <InventoryTable items={items} formatCell={formatCell} />}
        <div className="qa-row">
          <button className="qa-btn qa-btn--primary" disabled={!viewer.canAct} onClick={() => void act()}>
            Restock low items
          </button>
          {!viewer.canAct && <span className="qa-muted">Needs inventory:write, which this user does not have.</span>}
          <button className="qa-btn" onClick={openLinked}>
            Open billing
          </button>
        </div>
      </section>
    </div>
  );
};

export const InventoryPage: React.FC = () => (
  <InventoryProvider>
    <InventoryView />
  </InventoryProvider>
);
