package com.springpath.service;

import com.springpath.enums.BadgeType;

public interface BadgeService {
    void checkAndAwardBadges(Long userId);
    boolean hasBadge(Long userId, BadgeType badgeType);
}
// ✅ BadgeService.java — complete
