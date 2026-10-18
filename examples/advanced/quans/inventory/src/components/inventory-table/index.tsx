import React from 'react';
import type { StockItem } from '../../types';

const COLUMNS: { key: keyof StockItem; label: string }[] = [{ key: 'sku', label: 'SKU' }, { key: 'name', label: 'Item' }, { key: 'warehouse', label: 'Warehouse' }, { key: 'stock', label: 'Stock' }];

interface InventoryTableProps {
  items: StockItem[];
  formatCell: (value: unknown, money: boolean) => string;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({ items, formatCell }) => {
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
