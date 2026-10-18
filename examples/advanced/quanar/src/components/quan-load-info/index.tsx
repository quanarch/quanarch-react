import React from 'react';
import { DELIVERIES } from '../../constants';
import type { QuanEntry } from '../../types';
import { formatTime, shortHash } from '../../utils';

/** Explains how this quan reached the quanar, step by step. */
export const QuanLoadInfo: React.FC<{ entry: QuanEntry }> = ({ entry }) => {
  const delivery = DELIVERIES[entry.source.delivery];
  const verification = entry.verified === true ? 'verified ✓' : entry.verified === false ? 'failed' : 'not checked';

  return (
    <section className="qa-card load-info">
      <div className="load-info__head">
        <strong>{delivery.title}</strong>
        <span className={`qa-badge qa-badge--${entry.status}`}>{entry.status}</span>
      </div>
      <p className="qa-muted">{delivery.summary}</p>
      <ol>
        {delivery.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <dl className="load-info__facts">
        <dt>Source</dt>
        <dd>
          <code>{entry.source.url}</code>
        </dd>
        <dt>Version</dt>
        <dd>{entry.source.version || '—'}</dd>
        <dt>SHA-256</dt>
        <dd>
          <code>{shortHash(entry.source.hash)}</code> · {verification}
        </dd>
        <dt>Needs</dt>
        <dd>{entry.source.permissions.join(', ')}</dd>
        <dt>Loaded at</dt>
        <dd>{formatTime(entry.loadedAt)}</dd>
      </dl>
      {entry.error && <p className="qa-error">{entry.error}</p>}
    </section>
  );
};
