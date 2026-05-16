import apiClient from './client';
import type { ApiResponse } from '../types';
import type { RegisterRequest, LoginRequest, AuthResponse } from '../types/auth';

export const authApi = {
  register: (data: RegisterRequest) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/register', data),
  login: (data: LoginRequest) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data),
  refresh: (refreshToken: string) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/refresh', { refreshToken }),
  logout: () =>
    apiClient.post<ApiResponse<null>>('/auth/logout'),
};
