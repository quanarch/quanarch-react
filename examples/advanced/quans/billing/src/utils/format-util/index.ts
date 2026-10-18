import { billingConfig } from '../../config';

export function formatMoney(value: number): string {
  return new Intl.NumberFormat(billingConfig.locale, { style: 'currency', currency: billingConfig.currency }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat(billingConfig.locale).format(value);
}
