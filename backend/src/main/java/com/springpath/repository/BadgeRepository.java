package com.springpath.repository;

import com.springpath.entity.Badge;
import com.springpath.enums.BadgeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BadgeRepository extends JpaRepository<Badge, Long> {
    List<Badge> findByUserId(Long userId);
    Optional<Badge> findByUserIdAndBadgeType(Long userId, BadgeType badgeType);
    boolean existsByUserIdAndBadgeType(Long userId, BadgeType badgeType);
    long countByUserId(Long userId);
}
// ✅ BadgeRepository.java — complete
