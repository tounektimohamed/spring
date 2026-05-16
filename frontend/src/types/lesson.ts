export interface LessonDetailResponse {
  id: number;
  moduleId: number;
  moduleTitle: string;
  title: string;
  type: string;
  contentMarkdown: string;
  codeExample: string | null;
  codeSolution: string | null;
  expectedOutput: string | null;
  xpReward: number;
  durationMinutes: number | null;
  orderIndex: number;
  completed: boolean;
  totalLessonsInModule: number;
}
