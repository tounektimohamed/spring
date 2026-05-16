package com.springpath.dto.progress;

import java.util.List;

public record DashboardResponse(
    int totalXp,
    int completedLessons,
    int totalLessons,
    double overallProgress,
    int currentStreak,
    List<BadgeResponse> badges,
    List<PhaseProgress> phases,
    List<RecentLesson> recentLessons
) {
    public record BadgeResponse(
        String badgeType,
        String earnedAt,
        boolean earned
    ) {}

    public record PhaseProgress(
        Long courseId,
        String slug,
        String title,
        String color,
        int completedLessons,
        int totalLessons,
        double progress,
        Long nextLessonId
    ) {}

    public record RecentLesson(
        Long lessonId,
        String lessonTitle,
        String moduleTitle,
        String courseTitle,
        String completedAt,
        Integer quizScore
    ) {}

    public record LeaderboardEntry(
        Long userId,
        String displayName,
        int streakCount,
        String avatarUrl
    ) {}
}
// ✅ DashboardResponse.java — complete
