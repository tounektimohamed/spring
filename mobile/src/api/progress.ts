import apiClient from './client';
import type { ApiResponse } from '../types';
import type { DashboardResponse, StreakResponse } from '../types';

export const progressApi = {
  getDashboard: () => apiClient.get<ApiResponse<DashboardResponse>>('/progress/dashboard'),
  completeLesson: (lessonId: number, quizScore?: number) =>
    apiClient.post<ApiResponse<DashboardResponse>>('/progress/complete', { lessonId, quizScore, timeSpentSeconds: 0 }),
  getStreak: () => apiClient.get<ApiResponse<StreakResponse>>('/progress/streak'),
};
