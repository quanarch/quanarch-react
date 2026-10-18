import { analyticsConfig } from '../../config';

export function formatMoney(value: number): string {
  return new Intl.NumberFormat(analyticsConfig.locale, { style: 'currency', currency: analyticsConfig.currency }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat(analyticsConfig.locale).format(value);
}
