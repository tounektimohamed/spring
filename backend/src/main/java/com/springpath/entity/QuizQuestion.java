package com.springpath.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.springpath.enums.QuizType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "quiz_questions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id", nullable = false)
        @JsonIgnore
    private Lesson lesson;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String question;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private QuizType type;

    @Column(columnDefinition = "TEXT")
    private String options;

    @Column(name = "correct_answer", nullable = false, length = 500)
    private String correctAnswer;

    @Column(columnDefinition = "TEXT")
    private String explanation;

    @Column(name = "order_index", nullable = false)
    private int orderIndex;
}
// ✅ QuizQuestion.java — complete
