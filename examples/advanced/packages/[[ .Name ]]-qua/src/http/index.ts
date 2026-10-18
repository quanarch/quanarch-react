import { getQuanarCore } from '../state';
import type { HttpClient } from '../types';

/**
 * Requests to the server, through the quanar's client. A quan's api folder
 * calls these; the quanar adds the base URL and the user's token.
 */
export const http: HttpClient = {
  get: <T>(url: string) => getQuanarCore().http.get<T>(url),
  post: <T>(url: string, body?: unknown) => getQuanarCore().http.post<T>(url, body),
  put: <T>(url: string, body?: unknown) => getQuanarCore().http.put<T>(url, body),
  patch: <T>(url: string, body?: unknown) => getQuanarCore().http.patch<T>(url, body),
  delete: <T>(url: string) => getQuanarCore().http.delete<T>(url),
};
