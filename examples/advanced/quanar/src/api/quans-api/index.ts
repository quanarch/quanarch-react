import { appConfig } from '../../config';
import { API_ENDPOINTS } from '../../constants';
import { httpClient } from '../../core';
import type { QuanSource } from '../../types';

export const quansApi = {
  /** The quans delivered over the API that the signed-in user may load. */
  async getQuans(): Promise<QuanSource[]> {
    return httpClient.get<QuanSource[]>(API_ENDPOINTS.QUANS);
  },

  /** The URL of the SSE stream; EventSource cannot send headers, so the token rides in the query. */
  streamUrl(token: string): string {
    return `${appConfig.apiUrl}${API_ENDPOINTS.QUANS_STREAM}?token=${encodeURIComponent(token)}`;
  },
};
