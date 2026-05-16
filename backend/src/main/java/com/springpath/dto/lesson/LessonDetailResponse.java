package com.springpath.dto.lesson;

public record LessonDetailResponse(
    Long id,
    Long moduleId,
    String moduleTitle,
    String title,
    String type,
    String contentMarkdown,
    String codeExample,
    String codeSolution,
    String expectedOutput,
    int xpReward,
    Integer durationMinutes,
    int orderIndex,
    boolean completed,
    int totalLessonsInModule
) {}
// ✅ LessonDetailResponse.java — complete
