import React from 'react';
import type { Report } from '../../types';

const COLUMNS: { key: keyof Report; label: string }[] = [{ key: 'id', label: 'Report' }, { key: 'title', label: 'Title' }, { key: 'period', label: 'Period' }, { key: 'owner', label: 'Owner' }];

interface ReportsTableProps {
  items: Report[];
  formatCell: (value: unknown, money: boolean) => string;
}

export const ReportsTable: React.FC<ReportsTableProps> = ({ items, formatCell }) => {
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
