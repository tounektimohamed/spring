package com.springpath.dto.progress;

import jakarta.validation.constraints.NotNull;

public record CompleteRequest(
    @NotNull Long lessonId,
    Integer quizScore,
    Integer timeSpentSeconds
) {}
// ✅ CompleteRequest.java — complete
