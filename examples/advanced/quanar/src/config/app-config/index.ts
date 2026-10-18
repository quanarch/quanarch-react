/** Settings: the code side of .env. */
export const appConfig = {
  apiUrl: import.meta.env.VITE_API_URL ?? '/api',
  artifactsUrl: import.meta.env.VITE_ARTIFACTS_URL ?? 'http://localhost:4100',
  requestTimeoutMs: 10_000,
  toastDurationMs: 4_000,
};
