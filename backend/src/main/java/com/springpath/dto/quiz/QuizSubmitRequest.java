package com.springpath.dto.quiz;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record QuizSubmitRequest(
    @NotNull Long lessonId,
    @NotEmpty List<Answer> answers
) {
    public record Answer(
        @NotNull Long questionId,
        @NotNull String selectedAnswer
    ) {}
}
// ✅ QuizSubmitRequest.java — complete
