package com.springpath.service;

import com.springpath.dto.quiz.*;
import com.springpath.entity.QuizQuestion;
import com.springpath.exception.BadRequestException;
import com.springpath.exception.ResourceNotFoundException;
import com.springpath.repository.QuizQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

    private final QuizQuestionRepository quizQuestionRepository;

    @Override
    public List<QuizQuestion> getQuestions(Long lessonId) {
        return quizQuestionRepository.findByLessonIdOrderByOrderIndexAsc(lessonId);
    }

    @Override
    public QuizResultResponse submitQuiz(Long userId, QuizSubmitRequest request) {
        List<QuizQuestion> questions = quizQuestionRepository.findByLessonIdOrderByOrderIndexAsc(request.lessonId());
        if (questions.isEmpty()) {
            throw new ResourceNotFoundException("No quiz questions found for lesson", "lessonId", request.lessonId());
        }

        Map<Long, QuizQuestion> questionMap = questions.stream()
                .collect(Collectors.toMap(QuizQuestion::getId, q -> q));

        List<QuizResultResponse.QuestionResult> results = new ArrayList<>();
        int correctAnswers = 0;

        for (QuizSubmitRequest.Answer answer : request.answers()) {
            QuizQuestion question = questionMap.get(answer.questionId());
            if (question == null) {
                throw new BadRequestException("Invalid question ID: " + answer.questionId());
            }

            boolean isCorrect = question.getCorrectAnswer().trim()
                    .equalsIgnoreCase(answer.selectedAnswer().trim());

            if (isCorrect) correctAnswers++;

            results.add(new QuizResultResponse.QuestionResult(
                    question.getId(), question.getQuestion(),
                    answer.selectedAnswer(), question.getCorrectAnswer(),
                    isCorrect, question.getExplanation()));
        }

        int totalQuestions = questions.size();
        int score = (int) (((double) correctAnswers / totalQuestions) * 100);
        boolean passed = score >= 60;

        return new QuizResultResponse(score, totalQuestions, correctAnswers, (double) score, passed, results);
    }
}
// ✅ QuizServiceImpl.java — complete
