package com.springpath.service;

import com.springpath.dto.lesson.LessonDetailResponse;
import com.springpath.entity.Lesson;
import com.springpath.exception.ResourceNotFoundException;
import com.springpath.repository.LessonRepository;
import com.springpath.repository.UserProgressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LessonServiceImpl implements LessonService {

    private final LessonRepository lessonRepository;
    private final UserProgressRepository userProgressRepository;

    @Override
    public LessonDetailResponse getLessonDetail(Long lessonId, Long userId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", lessonId));

        boolean completed = userId != null && userProgressRepository.existsByUserIdAndLessonId(userId, lessonId);
        List<Lesson> moduleLessons = lessonRepository.findByModuleIdOrderByOrderIndexAsc(lesson.getModule().getId());

        return new LessonDetailResponse(
                lesson.getId(),
                lesson.getModule().getId(),
                lesson.getModule().getTitle(),
                lesson.getTitle(),
                lesson.getType().name(),
                lesson.getContentMarkdown(),
                lesson.getCodeExample(),
                lesson.getCodeSolution(),
                lesson.getExpectedOutput(),
                lesson.getXpReward(),
                lesson.getDurationMinutes(),
                lesson.getOrderIndex(),
                completed,
                moduleLessons.size()
        );
    }

    @Override
    public boolean isLessonLocked(Long lessonId, Long userId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", lessonId));

        if (userId == null) return true;

        // First lesson in module is always unlocked
        if (lesson.getOrderIndex() == 1) return false;

        // Check if previous lesson in the same module is completed
        List<Lesson> moduleLessons = lessonRepository.findByModuleIdOrderByOrderIndexAsc(lesson.getModule().getId());
        for (Lesson l : moduleLessons) {
            if (l.getId().equals(lessonId)) break;
            if (!userProgressRepository.existsByUserIdAndLessonId(userId, l.getId())) {
                return true; // Previous lesson not completed
            }
        }
        return false;
    }
}
// ✅ LessonServiceImpl.java — complete
