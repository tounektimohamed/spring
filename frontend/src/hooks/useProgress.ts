import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { progressApi } from '../api/progress';

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const { data } = await progressApi.getDashboard();
      return data.data;
    },
  });
}

export function useCompleteLesson() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ lessonId, quizScore, timeSpentSeconds }: {
      lessonId: number; quizScore?: number; timeSpentSeconds?: number;
    }) => progressApi.completeLesson(lessonId, quizScore, timeSpentSeconds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['course'] });
      queryClient.invalidateQueries({ queryKey: ['lesson'] });
      queryClient.invalidateQueries({ queryKey: ['lesson-locked'] });
    },
  });
}

export function useStreak() {
  return useQuery({
    queryKey: ['streak'],
    queryFn: async () => {
      const { data } = await progressApi.getStreak();
      return data.data;
    },
  });
}
