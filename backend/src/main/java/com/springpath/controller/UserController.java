package com.springpath.controller;

import com.springpath.dto.common.ApiResponse;
import com.springpath.dto.progress.DashboardResponse;
import com.springpath.entity.User;
import com.springpath.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "Current user profile and leaderboard")
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    @Operation(summary = "Get current user profile")
    public ResponseEntity<ApiResponse<User>> getCurrentUser() {
        User user = userService.getCurrentUserEntity();
        return ResponseEntity.ok(ApiResponse.ok(user));
    }

    @PutMapping("/me")
    @Operation(summary = "Update current user profile")
    public ResponseEntity<ApiResponse<User>> updateProfile(@RequestBody Map<String, String> body) {
        User user = userService.updateProfile(body.get("displayName"), body.get("avatarUrl"));
        return ResponseEntity.ok(ApiResponse.ok("Profile updated", user));
    }

    @GetMapping("/leaderboard")
    @Operation(summary = "Get user leaderboard")
    public ResponseEntity<ApiResponse<List<DashboardResponse.LeaderboardEntry>>> getLeaderboard() {
        List<DashboardResponse.LeaderboardEntry> entries = userService.getLeaderboard();
        return ResponseEntity.ok(ApiResponse.ok(entries));
    }
}
// ✅ UserController.java — complete
