import React from 'react';
import type { Metric } from '../../types';

const COLUMNS: { key: keyof Metric; label: string }[] = [{ key: 'label', label: 'Metric' }, { key: 'value', label: 'Value' }, { key: 'change', label: 'Change %' }];

interface AnalyticsTableProps {
  items: Metric[];
  formatCell: (value: unknown, money: boolean) => string;
}

export const AnalyticsTable: React.FC<AnalyticsTableProps> = ({ items, formatCell }) => {
  return (
    <table className="qa-table">
      <thead>
        <tr>
          {COLUMNS.map((c) => (
            <th key={String(c.key)}>{c.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, row) => (
          <tr key={row}>
            {COLUMNS.map((c) => (
              <td key={String(c.key)}>{formatCell(item[c.key], false)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
