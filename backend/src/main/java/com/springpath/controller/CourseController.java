package com.springpath.controller;

import com.springpath.dto.common.ApiResponse;
import com.springpath.dto.course.*;
import com.springpath.service.CourseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
@Tag(name = "Courses", description = "Browse and view course details")
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    @Operation(summary = "Get all published courses")
    public ResponseEntity<ApiResponse<List<CourseResponse>>> getAllCourses() {
        return ResponseEntity.ok(ApiResponse.ok(courseService.getAllCourses()));
    }

    @GetMapping("/{slug}")
    @Operation(summary = "Get course details with modules and lessons")
    public ResponseEntity<ApiResponse<CourseDetailResponse>> getCourseBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.ok(courseService.getCourseBySlug(slug)));
    }
}
// ✅ CourseController.java — complete
