import apiClient from './client';
import type { ApiResponse } from '../types';
import type { LessonDetailResponse } from '../types/lesson';

export const lessonsApi = {
  getById: (id: number) => apiClient.get<ApiResponse<LessonDetailResponse>>(`/lessons/${id}`),
  checkLocked: (id: number) => apiClient.get<ApiResponse<boolean>>(`/lessons/${id}/locked`),
};
