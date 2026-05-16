package com.springpath.dto.progress;

import java.time.LocalDate;

public record StreakResponse(
    int streakCount,
    LocalDate lastActivity
) {}
// ✅ StreakResponse.java — complete
