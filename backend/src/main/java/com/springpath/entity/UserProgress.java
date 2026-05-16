package com.springpath.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_progress",
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "lesson_id"}),
       indexes = {
           @Index(name = "idx_user_progress_user", columnList = "user_id"),
           @Index(name = "idx_user_progress_lesson", columnList = "lesson_id")
       })
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
        @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id", nullable = false)
        @JsonIgnore
    private Lesson lesson;

    @Column(name = "completed_at")
    @Builder.Default
    private LocalDateTime completedAt = LocalDateTime.now();

    @Column(name = "quiz_score")
    private Integer quizScore;

    @Builder.Default
    private int attempts = 1;

    @Column(name = "time_spent_seconds")
    private Integer timeSpentSeconds;
}
// ✅ UserProgress.java — complete
