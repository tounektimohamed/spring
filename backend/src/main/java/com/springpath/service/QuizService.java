package com.springpath.service;

import com.springpath.dto.quiz.*;
import java.util.List;

public interface QuizService {
    List<com.springpath.entity.QuizQuestion> getQuestions(Long lessonId);
    QuizResultResponse submitQuiz(Long userId, QuizSubmitRequest request);
}
// ✅ QuizService.java — complete
