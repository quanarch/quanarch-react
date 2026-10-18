export function formatTime(iso?: string): string {
  return iso ? new Date(iso).toLocaleTimeString() : '—';
}
