package com.springpath.dto.lesson;

public record LessonResponse(
    Long id,
    String title,
    String type,
    int orderIndex,
    int xpReward,
    Integer durationMinutes,
    boolean completed
) {}
// ✅ LessonResponse.java — complete
