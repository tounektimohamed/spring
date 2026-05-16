import { useQuery } from '@tanstack/react-query';
import { lessonsApi } from '../api/lessons';

export function useLesson(id: number) {
  return useQuery({
    queryKey: ['lesson', id],
    queryFn: async () => {
      const { data } = await lessonsApi.getById(id);
      return data.data;
    },
    enabled: !!id,
  });
}

export function useLessonLocked(id: number) {
  return useQuery({
    queryKey: ['lesson-locked', id],
    queryFn: async () => {
      const { data } = await lessonsApi.checkLocked(id);
      return data.data;
    },
    enabled: !!id,
  });
}
