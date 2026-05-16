import apiClient from './client';
import type { ApiResponse } from '../types';
import type { CourseResponse, CourseDetailResponse } from '../types/course';

export const coursesApi = {
  getAll: () => apiClient.get<ApiResponse<CourseResponse[]>>('/courses'),
  getBySlug: (slug: string) => apiClient.get<ApiResponse<CourseDetailResponse>>(`/courses/${slug}`),
};
