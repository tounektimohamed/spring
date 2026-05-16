package com.springpath.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.springpath.enums.LessonType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "lessons")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id", nullable = false)
    @JsonIgnore
    private Module module;

    @Column(nullable = false, length = 200)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private LessonType type;

    @Column(name = "content_markdown", nullable = false, columnDefinition = "TEXT")
    private String contentMarkdown;

    @Column(name = "code_example", columnDefinition = "TEXT")
    private String codeExample;

    @Column(name = "code_solution", columnDefinition = "TEXT")
    private String codeSolution;

    @Column(name = "expected_output", columnDefinition = "TEXT")
    private String expectedOutput;

    @Column(name = "duration_minutes")
    private Integer durationMinutes;

    @Column(name = "order_index", nullable = false)
    private int orderIndex;

    @Column(name = "xp_reward")
    @Builder.Default
    private int xpReward = 10;
}
// ✅ Lesson.java — complete
