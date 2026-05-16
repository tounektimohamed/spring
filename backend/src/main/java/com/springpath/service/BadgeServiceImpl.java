package com.springpath.service;

import com.springpath.entity.Badge;
import com.springpath.enums.BadgeType;
import com.springpath.repository.BadgeRepository;
import com.springpath.repository.UserProgressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BadgeServiceImpl implements BadgeService {

    private final BadgeRepository badgeRepository;
    private final UserProgressRepository userProgressRepository;

    @Override
    public void checkAndAwardBadges(Long userId) {
        long completedLessons = userProgressRepository.countByUserId(userId);

        awardIfNotExists(userId, BadgeType.JAVA_STARTER, completedLessons >= 5);
        awardIfNotExists(userId, BadgeType.SPRING_EXPLORER, completedLessons >= 10);
        awardIfNotExists(userId, BadgeType.REST_DESIGNER, completedLessons >= 15);
        awardIfNotExists(userId, BadgeType.DATA_WIZARD, completedLessons >= 20);
        awardIfNotExists(userId, BadgeType.SECURITY_GUARDIAN, completedLessons >= 30);
        awardIfNotExists(userId, BadgeType.PROJECT_BUILDER, completedLessons >= 40);
        awardIfNotExists(userId, BadgeType.SPEED_CODER, completedLessons >= 50);
        awardIfNotExists(userId, BadgeType.COMPLETIONIST, completedLessons >= 100);
    }

    private void awardIfNotExists(Long userId, BadgeType badgeType, boolean condition) {
        if (condition && !badgeRepository.existsByUserIdAndBadgeType(userId, badgeType)) {
            badgeRepository.save(Badge.builder()
                    .user(com.springpath.entity.User.builder().id(userId).build())
                    .badgeType(badgeType)
                    .build());
        }
    }

    @Override
    public boolean hasBadge(Long userId, BadgeType badgeType) {
        return badgeRepository.existsByUserIdAndBadgeType(userId, badgeType);
    }
}
// ✅ BadgeServiceImpl.java — complete
