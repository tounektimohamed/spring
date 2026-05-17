import apiClient from './client';
import type { ApiResponse } from '../types';
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types';

export const authApi = {
  login: (data: LoginRequest) => apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data),
  register: (data: RegisterRequest) => apiClient.post<ApiResponse<AuthResponse>>('/auth/register', data),
  refresh: (refreshToken: string) => apiClient.post<ApiResponse<AuthResponse>>('/auth/refresh', { refreshToken }),
  logout: () => apiClient.post<ApiResponse<null>>('/auth/logout'),
};
