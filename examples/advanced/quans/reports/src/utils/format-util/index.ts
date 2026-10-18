import { reportsConfig } from '../../config';

export function formatMoney(value: number): string {
  return new Intl.NumberFormat(reportsConfig.locale, { style: 'currency', currency: reportsConfig.currency }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat(reportsConfig.locale).format(value);
}
