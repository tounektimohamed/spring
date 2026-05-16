package com.springpath.service;

import com.springpath.dto.progress.*;

public interface ProgressService {
    DashboardResponse getDashboard(Long userId);
    DashboardResponse completeLesson(Long userId, CompleteRequest request);
    StreakResponse getStreak(Long userId);
}
// ✅ ProgressService.java — complete
