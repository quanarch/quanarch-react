export interface User {
  id: number;
  username: string;
  name: string;
  permissions: string[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export type AuthStatus = 'restoring' | 'anonymous' | 'signing-in' | 'authenticated';
