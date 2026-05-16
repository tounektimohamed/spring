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

export interface LeaderboardEntry {
  userId: number;
  displayName: string;
  streakCount: number;
  avatarUrl: string | null;
}
