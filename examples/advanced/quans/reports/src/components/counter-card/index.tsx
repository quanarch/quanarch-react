import React from 'react';

interface CounterCardProps {
  count: number;
  onAsk: () => void;
}

/** The count lives in the quan; the arithmetic happens in the quanar. */
export const CounterCard: React.FC<CounterCardProps> = ({ count, onAsk }) => {
  return (
    <section className="qa-card">
      <h2>Counter</h2>
      <div className="qa-row">
        <span className="qa-stat" data-count>
          {count}
        </span>
        <button className="qa-btn" onClick={onAsk}>
          Ask the quanar to count
        </button>
      </div>
      <p className="qa-muted">This quan never adds: it calls increment() on the qua and the quanar answers.</p>
    </section>
  );
};
