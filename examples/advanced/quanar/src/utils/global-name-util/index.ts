/** "billing-report" → "BillingReportQuan", the global a built quan assigns its manifest to. */
export function toGlobalName(name: string): string {
  return (
    name
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('') + 'Quan'
  );
}
