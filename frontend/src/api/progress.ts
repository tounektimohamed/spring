import apiClient from './client';
import type { ApiResponse } from '../types';
import type { DashboardResponse, StreakResponse } from '../types/progress';

export const progressApi = {
  getDashboard: () => apiClient.get<ApiResponse<DashboardResponse>>('/progress/dashboard'),
  completeLesson: (lessonId: number, quizScore?: number, timeSpentSeconds?: number) =>
    apiClient.post<ApiResponse<DashboardResponse>>('/progress/complete', {
      lessonId,
      quizScore,
      timeSpentSeconds,
    }),
  getStreak: () => apiClient.get<ApiResponse<StreakResponse>>('/progress/streak'),
};
