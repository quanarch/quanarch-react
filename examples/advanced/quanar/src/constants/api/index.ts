/** Server endpoints, relative to appConfig.apiUrl. */
export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  ME: '/auth/me',
  LOGOUT: '/auth/logout',
  QUANS: '/quans',
  QUANS_STREAM: '/quans/stream',
} as const;
