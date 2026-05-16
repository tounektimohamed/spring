package com.springpath.dto.quiz;

import java.util.List;

public record QuizResultResponse(
    int score,
    int totalQuestions,
    int correctAnswers,
    double percentage,
    boolean passed,
    List<QuestionResult> results
) {
    public record QuestionResult(
        Long questionId,
        String question,
        String yourAnswer,
        String correctAnswer,
        boolean isCorrect,
        String explanation
    ) {}
}
// ✅ QuizResultResponse.java — complete
