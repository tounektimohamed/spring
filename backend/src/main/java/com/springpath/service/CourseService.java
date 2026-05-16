package com.springpath.service;

import com.springpath.dto.course.*;
import java.util.List;

public interface CourseService {
    List<CourseResponse> getAllCourses();
    CourseDetailResponse getCourseBySlug(String slug);
}
// ✅ CourseService.java — complete
