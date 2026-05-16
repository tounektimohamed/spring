package com.springpath.service;

import com.springpath.dto.course.*;
import com.springpath.dto.lesson.LessonResponse;
import com.springpath.entity.Course;
import com.springpath.entity.Lesson;
import com.springpath.entity.Module;
import com.springpath.exception.ResourceNotFoundException;
import com.springpath.repository.CourseRepository;
import com.springpath.repository.UserProgressRepository;
import com.springpath.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final UserProgressRepository userProgressRepository;

    @Override
    public List<CourseResponse> getAllCourses() {
        return courseRepository.findAllByIsPublishedTrueOrderByOrderIndexAsc().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public CourseDetailResponse getCourseBySlug(String slug) {
        Course course = courseRepository.getCourseDetail(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "slug", slug));

        Long userId = SecurityUtils.getCurrentUserId();
        Set<Long> completedLessonIds = Set.of();
        if (userId != null) {
            completedLessonIds = userProgressRepository.getRecentProgress(userId,
                    org.springframework.data.domain.Pageable.unpaged()).stream()
                    .map(up -> up.getLesson().getId())
                    .collect(Collectors.toSet());
        }
        final Set<Long> finalCompletedIds = completedLessonIds;

        List<CourseDetailResponse.ModuleResponse> modules = course.getModules().stream()
                .map(m -> {
                    List<LessonResponse> lessons = m.getLessons().stream()
                            .map(l -> new LessonResponse(
                                    l.getId(), l.getTitle(), l.getType().name(),
                                    l.getOrderIndex(), l.getXpReward(),
                                    l.getDurationMinutes(),
                                    finalCompletedIds.contains(l.getId())))
                            .collect(Collectors.toList());
                    return new CourseDetailResponse.ModuleResponse(
                            m.getId(), m.getTitle(), m.getDescription(),
                            m.getOrderIndex(), m.getDurationMinutes(), lessons);
                })
                .collect(Collectors.toList());

        return new CourseDetailResponse(
                course.getId(), course.getSlug(), course.getTitle(),
                course.getDescription(), course.getLevel().name(),
                course.getColor(), course.getIcon(), course.getOrderIndex(), modules);
    }

    private CourseResponse toResponse(Course c) {
        int moduleCount = c.getModules() != null ? c.getModules().size() : 0;
        int lessonCount = 0;
        if (c.getModules() != null) {
            lessonCount = c.getModules().stream()
                    .mapToInt(m -> m.getLessons() != null ? m.getLessons().size() : 0)
                    .sum();
        }
        return new CourseResponse(c.getId(), c.getSlug(), c.getTitle(), c.getDescription(),
                c.getLevel().name(), c.getColor(), c.getIcon(), c.getOrderIndex(),
                moduleCount, lessonCount);
    }
}
// ✅ CourseServiceImpl.java — complete
