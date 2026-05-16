package com.springpath.service;

import com.springpath.dto.common.ApiResponse;
import com.springpath.entity.User;
import java.util.List;

public interface UserService {
    User getCurrentUserEntity();
    User updateProfile(String displayName, String avatarUrl);
    List<com.springpath.dto.progress.DashboardResponse.LeaderboardEntry> getLeaderboard();
}
// ✅ UserService.java — complete
