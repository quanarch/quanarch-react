import { API_ENDPOINTS } from '../../constants';
import { httpClient } from '../../core';
import type { LoginRequest, LoginResponse, User } from '../../types';

export const authApi = {
  async login(request: LoginRequest): Promise<LoginResponse> {
    return httpClient.post<LoginResponse>(API_ENDPOINTS.LOGIN, request);
  },

  async me(): Promise<User> {
    return httpClient.get<User>(API_ENDPOINTS.ME);
  },

  async logout(): Promise<void> {
    await httpClient.post(API_ENDPOINTS.LOGOUT);
  },
};
