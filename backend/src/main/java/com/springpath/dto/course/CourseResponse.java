package com.springpath.dto.course;

public record CourseResponse(
    Long id,
    String slug,
    String title,
    String description,
    String level,
    String color,
    String icon,
    int orderIndex,
    int moduleCount,
    int lessonCount
) {}
// ✅ CourseResponse.java — complete
