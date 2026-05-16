package com.springpath.dto.course;

import com.springpath.dto.lesson.LessonResponse;
import java.util.List;

public record CourseDetailResponse(
    Long id,
    String slug,
    String title,
    String description,
    String level,
    String color,
    String icon,
    int orderIndex,
    List<ModuleResponse> modules
) {
    public record ModuleResponse(
        Long id,
        String title,
        String description,
        int orderIndex,
        Integer durationMinutes,
        List<LessonResponse> lessons
    ) {}
}
// ✅ CourseDetailResponse.java — complete
