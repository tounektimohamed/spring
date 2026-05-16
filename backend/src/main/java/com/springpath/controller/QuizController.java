package com.springpath.controller;

import com.springpath.dto.common.ApiResponse;
import com.springpath.dto.quiz.*;
import com.springpath.entity.QuizQuestion;
import com.springpath.security.SecurityUtils;
import com.springpath.service.QuizService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
@RequiredArgsConstructor
@Tag(name = "Quiz", description = "Quiz questions and submission")
public class QuizController {

    private final QuizService quizService;

    @GetMapping("/lesson/{lessonId}")
    @Operation(summary = "Get quiz questions for a lesson")
    public ResponseEntity<ApiResponse<List<QuizQuestion>>> getQuestions(@PathVariable Long lessonId) {
        List<QuizQuestion> questions = quizService.getQuestions(lessonId);
        return ResponseEntity.ok(ApiResponse.ok(questions));
    }

    @PostMapping("/submit")
    @Operation(summary = "Submit quiz answers and get results")
    public ResponseEntity<ApiResponse<QuizResultResponse>> submitQuiz(@Valid @RequestBody QuizSubmitRequest request) {
        Long userId = SecurityUtils.getCurrentUserId();
        QuizResultResponse result = quizService.submitQuiz(userId, request);
        return ResponseEntity.ok(ApiResponse.ok("Quiz submitted", result));
    }
}
// ✅ QuizController.java — complete
