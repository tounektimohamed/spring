package com.springpath.service;

import com.springpath.dto.lesson.LessonDetailResponse;

public interface LessonService {
    LessonDetailResponse getLessonDetail(Long lessonId, Long userId);
    boolean isLessonLocked(Long lessonId, Long userId);
}
// ✅ LessonService.java — complete
