export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  userId: number;
  email: string;
  displayName: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  displayName: string;
}

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

export interface QuizQuestion {
  id: number;
  question: string;
  type: string;
  options: string | null;
  correctAnswer: string;
  explanation: string | null;
  orderIndex: number;
}

export interface QuizSubmitRequest {
  lessonId: number;
  answers: { questionId: number; selectedAnswer: string }[];
}

export interface QuestionResult {
  questionId: number;
  question: string;
  yourAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string | null;
}

export interface QuizResultResponse {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  passed: boolean;
  results: QuestionResult[];
}

export interface BadgeResponse {
  badgeType: string;
  earnedAt: string | null;
  earned: boolean;
}

export interface PhaseProgress {
  courseId: number;
  slug: string;
  title: string;
  color: string;
  completedLessons: number;
  totalLessons: number;
  progress: number;
  nextLessonId: number | null;
}

export interface RecentLesson {
  lessonId: number;
  lessonTitle: string;
  moduleTitle: string;
  courseTitle: string;
  completedAt: string;
  quizScore: number | null;
}

export interface DashboardResponse {
  totalXp: number;
  completedLessons: number;
  totalLessons: number;
  overallProgress: number;
  currentStreak: number;
  badges: BadgeResponse[];
  phases: PhaseProgress[];
  recentLessons: RecentLesson[];
}

export interface StreakResponse {
  streakCount: number;
  lastActivity: string | null;
}

export interface CodeRunResponse {
  output: string;
  error: string;
  executionMs: number;
  success: boolean;
}
