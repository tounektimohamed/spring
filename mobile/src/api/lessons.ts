import apiClient from './client';
import type { ApiResponse } from '../types';
import type { LessonDetailResponse } from '../types';

export const lessonsApi = {
  getById: (id: number) => apiClient.get<ApiResponse<LessonDetailResponse>>(`/lessons/${id}`),
};
