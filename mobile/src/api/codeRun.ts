import apiClient from './client';
import type { ApiResponse, CodeRunResponse } from '../types';

export const codeRunApi = {
  run: (code: string) => apiClient.post<ApiResponse<CodeRunResponse>>('/code-run', { code }),
};
