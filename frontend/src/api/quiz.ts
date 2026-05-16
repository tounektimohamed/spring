import apiClient from './client';
import type { ApiResponse } from '../types';
import type { QuizQuestion, QuizSubmitRequest, QuizResultResponse } from '../types/quiz';

export const quizApi = {
  getQuestions: (lessonId: number) =>
    apiClient.get<ApiResponse<QuizQuestion[]>>(`/quiz/lesson/${lessonId}`),
  submit: (data: QuizSubmitRequest) =>
    apiClient.post<ApiResponse<QuizResultResponse>>('/quiz/submit', data),
};
