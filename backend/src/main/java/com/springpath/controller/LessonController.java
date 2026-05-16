package com.springpath.controller;

import com.springpath.dto.common.ApiResponse;
import com.springpath.dto.lesson.LessonDetailResponse;
import com.springpath.security.SecurityUtils;
import com.springpath.service.LessonService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lessons")
@RequiredArgsConstructor
@Tag(name = "Lessons", description = "View lesson content and check lock status")
public class LessonController {

    private final LessonService lessonService;

    @GetMapping("/{id}")
    @Operation(summary = "Get lesson details with content")
    public ResponseEntity<ApiResponse<LessonDetailResponse>> getLesson(@PathVariable Long id) {
        Long userId = SecurityUtils.getCurrentUserId();
        LessonDetailResponse response = lessonService.getLessonDetail(id, userId);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @GetMapping("/{id}/locked")
    @Operation(summary = "Check if lesson is locked for current user")
    public ResponseEntity<ApiResponse<Boolean>> checkLocked(@PathVariable Long id) {
        Long userId = SecurityUtils.getCurrentUserId();
        boolean locked = lessonService.isLessonLocked(id, userId);
        return ResponseEntity.ok(ApiResponse.ok(locked));
    }
}
// ✅ LessonController.java — complete
