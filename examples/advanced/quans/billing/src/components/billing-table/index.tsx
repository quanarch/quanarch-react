import React from 'react';
import type { Invoice } from '../../types';

const COLUMNS: { key: keyof Invoice; label: string }[] = [{ key: 'id', label: 'Invoice' }, { key: 'customer', label: 'Customer' }, { key: 'amount', label: 'Amount' }, { key: 'status', label: 'Status' }];

interface BillingTableProps {
  items: Invoice[];
  formatCell: (value: unknown, money: boolean) => string;
}

export const BillingTable: React.FC<BillingTableProps> = ({ items, formatCell }) => {
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
              <td key={String(c.key)}>{formatCell(item[c.key], c.key === 'amount')}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
