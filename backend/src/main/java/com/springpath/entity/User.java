package com.springpath.entity;

import com.springpath.enums.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "display_name", nullable = false, length = 100)
    private String displayName;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    @Builder.Default
    private UserRole role = UserRole.USER;

    @Column(name = "streak_count")
    @Builder.Default
    private int streakCount = 0;

    @Column(name = "last_activity")
    private LocalDate lastActivity;

    @Column(name = "avatar_url", length = 500)
    private String avatarUrl;

    @Column(name = "created_at", updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}
// ✅ User.java — complete
