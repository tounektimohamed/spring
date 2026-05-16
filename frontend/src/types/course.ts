export interface CourseResponse {
  id: number;
  slug: string;
  title: string;
  description: string;
  level: string;
  color: string;
  icon: string;
  orderIndex: number;
  moduleCount: number;
  lessonCount: number;
}

export interface LessonResponse {
  id: number;
  title: string;
  type: string;
  orderIndex: number;
  xpReward: number;
  durationMinutes: number | null;
  completed: boolean;
}

export interface ModuleResponse {
  id: number;
  title: string;
  description: string;
  orderIndex: number;
  durationMinutes: number | null;
  lessons: LessonResponse[];
}

export interface CourseDetailResponse {
  id: number;
  slug: string;
  title: string;
  description: string;
  level: string;
  color: string;
  icon: string;
  orderIndex: number;
  modules: ModuleResponse[];
}
