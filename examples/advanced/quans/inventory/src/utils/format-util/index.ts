import { inventoryConfig } from '../../config';

export function formatMoney(value: number): string {
  return new Intl.NumberFormat(inventoryConfig.locale, { style: 'currency', currency: inventoryConfig.currency }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat(inventoryConfig.locale).format(value);
}
