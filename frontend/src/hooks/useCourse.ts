import { useQuery } from '@tanstack/react-query';
import { coursesApi } from '../api/courses';

export function useCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data } = await coursesApi.getAll();
      return data.data;
    },
  });
}

export function useCourse(slug: string) {
  return useQuery({
    queryKey: ['course', slug],
    queryFn: async () => {
      const { data } = await coursesApi.getBySlug(slug);
      return data.data;
    },
    enabled: !!slug,
  });
}
