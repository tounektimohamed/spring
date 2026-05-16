package com.springpath.controller;

import com.springpath.dto.common.ApiResponse;
import com.springpath.entity.Course;
import com.springpath.entity.Lesson;
import com.springpath.repository.CourseRepository;
import com.springpath.repository.LessonRepository;
import com.springpath.exception.ResourceNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin", description = "Admin-only operations for managing courses and lessons")
public class AdminController {

    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;

    @PostMapping("/courses")
    @Operation(summary = "Create a new course")
    public ResponseEntity<ApiResponse<Course>> createCourse(@RequestBody Course course) {
        Course saved = courseRepository.save(course);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("Course created", saved));
    }

    @PutMapping("/courses/{id}")
    @Operation(summary = "Update an existing course")
    public ResponseEntity<ApiResponse<Course>> updateCourse(@PathVariable Long id, @RequestBody Course courseData) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", id));
        course.setTitle(courseData.getTitle());
        course.setDescription(courseData.getDescription());
        course.setSlug(courseData.getSlug());
        course.setLevel(courseData.getLevel());
        course.setColor(courseData.getColor());
        course.setIcon(courseData.getIcon());
        course.setOrderIndex(courseData.getOrderIndex());
        course.setPublished(courseData.isPublished());
        return ResponseEntity.ok(ApiResponse.ok("Course updated", courseRepository.save(course)));
    }

    @PostMapping("/lessons")
    @Operation(summary = "Create a new lesson")
    public ResponseEntity<ApiResponse<Lesson>> createLesson(@RequestBody Lesson lesson) {
        Lesson saved = lessonRepository.save(lesson);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("Lesson created", saved));
    }

    @PutMapping("/lessons/{id}")
    @Operation(summary = "Update an existing lesson")
    public ResponseEntity<ApiResponse<Lesson>> updateLesson(@PathVariable Long id, @RequestBody Lesson lessonData) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
        lesson.setTitle(lessonData.getTitle());
        lesson.setType(lessonData.getType());
        lesson.setContentMarkdown(lessonData.getContentMarkdown());
        lesson.setCodeExample(lessonData.getCodeExample());
        lesson.setCodeSolution(lessonData.getCodeSolution());
        lesson.setExpectedOutput(lessonData.getExpectedOutput());
        lesson.setDurationMinutes(lessonData.getDurationMinutes());
        lesson.setOrderIndex(lessonData.getOrderIndex());
        lesson.setXpReward(lessonData.getXpReward());
        return ResponseEntity.ok(ApiResponse.ok("Lesson updated", lessonRepository.save(lesson)));
    }

    @GetMapping("/courses")
    @Operation(summary = "List all courses (including unpublished)")
    public ResponseEntity<ApiResponse<List<Course>>> getAllCourses() {
        return ResponseEntity.ok(ApiResponse.ok(courseRepository.findAll()));
    }

    @GetMapping("/lessons")
    @Operation(summary = "List all lessons")
    public ResponseEntity<ApiResponse<List<Lesson>>> getAllLessons() {
        return ResponseEntity.ok(ApiResponse.ok(lessonRepository.findAll()));
    }
}
// ✅ AdminController.java — complete
