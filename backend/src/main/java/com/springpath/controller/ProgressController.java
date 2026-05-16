package com.springpath.controller;

import com.springpath.dto.common.ApiResponse;
import com.springpath.dto.progress.*;
import com.springpath.security.SecurityUtils;
import com.springpath.service.ProgressService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
@Tag(name = "Progress", description = "Track user progress, complete lessons, view dashboard")
public class ProgressController {

    private final ProgressService progressService;

    @GetMapping("/dashboard")
    @Operation(summary = "Get user dashboard with progress, badges, and recent activity")
    public ResponseEntity<ApiResponse<DashboardResponse>> getDashboard() {
        Long userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(ApiResponse.ok(progressService.getDashboard(userId)));
    }

    @PostMapping("/complete")
    @Operation(summary = "Mark a lesson as completed and update streak")
    public ResponseEntity<ApiResponse<DashboardResponse>> completeLesson(@Valid @RequestBody CompleteRequest request) {
        Long userId = SecurityUtils.getCurrentUserId();
        DashboardResponse response = progressService.completeLesson(userId, request);
        return ResponseEntity.ok(ApiResponse.ok("Lesson completed!", response));
    }

    @GetMapping("/streak")
    @Operation(summary = "Get current streak information")
    public ResponseEntity<ApiResponse<StreakResponse>> getStreak() {
        Long userId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(ApiResponse.ok(progressService.getStreak(userId)));
    }
}
// ✅ ProgressController.java — complete
