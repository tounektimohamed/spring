package com.springpath.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.springpath.enums.BadgeType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "badges",
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "badge_type"}),
       indexes = @Index(name = "idx_badges_user", columnList = "user_id"))
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Badge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
        @JsonIgnore
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "badge_type", nullable = false, length = 50)
    private BadgeType badgeType;

    @Column(name = "earned_at")
    @Builder.Default
    private LocalDateTime earnedAt = LocalDateTime.now();
}
// ✅ Badge.java — complete
