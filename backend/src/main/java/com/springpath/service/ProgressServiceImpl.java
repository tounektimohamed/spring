package com.springpath.service;

import com.springpath.dto.progress.*;
import com.springpath.entity.*;
import com.springpath.enums.BadgeType;
import com.springpath.exception.BadRequestException;
import com.springpath.exception.ResourceNotFoundException;
import com.springpath.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProgressServiceImpl implements ProgressService {

    private final UserRepository userRepository;
    private final UserProgressRepository userProgressRepository;
    private final LessonRepository lessonRepository;
    private final CourseRepository courseRepository;
    private final BadgeRepository badgeRepository;
    private final BadgeService badgeService;

    @Override
    public DashboardResponse getDashboard(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        long completedCount = userProgressRepository.countByUserId(userId);
        long totalLessons = lessonRepository.countAllLessons();
        double overallProgress = totalLessons > 0 ? ((double) completedCount / totalLessons) * 100 : 0;
        int totalXp = (int) (completedCount * 10);

        List<Badge> earnedBadges = badgeRepository.findByUserId(userId);
        List<DashboardResponse.BadgeResponse> badgeResponses = Arrays.stream(BadgeType.values())
                .map(bt -> new DashboardResponse.BadgeResponse(
                        bt.name(),
                        earnedBadges.stream()
                                .filter(b -> b.getBadgeType() == bt)
                                .findFirst()
                                .map(b -> b.getEarnedAt().format(DateTimeFormatter.ISO_LOCAL_DATE))
                                .orElse(null),
                        earnedBadges.stream().anyMatch(b -> b.getBadgeType() == bt)))
                .collect(Collectors.toList());

        List<DashboardResponse.PhaseProgress> phases = courseRepository.findAllByIsPublishedTrueOrderByOrderIndexAsc()
                .stream().map(c -> {
                    long courseCompleted = userProgressRepository.countCompletedLessonsByUserAndCourse(userId, c.getId());
                    int courseTotal = c.getModules().stream()
                            .mapToInt(m -> m.getLessons().size()).sum();
                    Long nextLessonId = findNextLessonId(userId, c);
                    return new DashboardResponse.PhaseProgress(
                            c.getId(), c.getSlug(), c.getTitle(), c.getColor(),
                            (int) courseCompleted, courseTotal,
                            courseTotal > 0 ? ((double) courseCompleted / courseTotal) * 100 : 0,
                            nextLessonId);
                }).collect(Collectors.toList());

        List<DashboardResponse.RecentLesson> recentLessons = userProgressRepository
                .getRecentProgress(userId, PageRequest.of(0, 5))
                .stream().map(up -> new DashboardResponse.RecentLesson(
                        up.getLesson().getId(),
                        up.getLesson().getTitle(),
                        up.getLesson().getModule().getTitle(),
                        up.getLesson().getModule().getCourse().getTitle(),
                        up.getCompletedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME),
                        up.getQuizScore()))
                .collect(Collectors.toList());

        return new DashboardResponse(
                totalXp, (int) completedCount, (int) totalLessons, overallProgress,
                user.getStreakCount(), badgeResponses, phases, recentLessons);
    }

    @Override
    @Transactional
    public DashboardResponse completeLesson(Long userId, CompleteRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        if (userProgressRepository.existsByUserIdAndLessonId(userId, request.lessonId())) {
            throw new BadRequestException("Lesson already completed");
        }

        Lesson lesson = lessonRepository.findById(request.lessonId())
                .orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", request.lessonId()));

        // Lock check: previous lesson in module must be completed
        if (lesson.getOrderIndex() > 1) {
            List<Lesson> moduleLessons = lessonRepository
                    .findByModuleIdOrderByOrderIndexAsc(lesson.getModule().getId());
            Optional<Lesson> prevLesson = moduleLessons.stream()
                    .filter(l -> l.getOrderIndex() == lesson.getOrderIndex() - 1)
                    .findFirst();
            if (prevLesson.isPresent() && !userProgressRepository
                    .existsByUserIdAndLessonId(userId, prevLesson.get().getId())) {
                throw new BadRequestException("Previous lesson not completed");
            }
        }

        UserProgress progress = UserProgress.builder()
                .user(user)
                .lesson(lesson)
                .quizScore(request.quizScore())
                .timeSpentSeconds(request.timeSpentSeconds())
                .build();
        userProgressRepository.save(progress);

        // Update streak
        updateStreak(user);

        // Check and award badges
        badgeService.checkAndAwardBadges(userId);

        return getDashboard(userId);
    }

    @Override
    public StreakResponse getStreak(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        return new StreakResponse(user.getStreakCount(), user.getLastActivity());
    }

    private void updateStreak(User user) {
        LocalDate today = LocalDate.now();
        LocalDate lastActivity = user.getLastActivity();

        if (lastActivity == null || lastActivity.isBefore(today.minusDays(1))) {
            user.setStreakCount(1);
        } else if (lastActivity.equals(today.minusDays(1))) {
            user.setStreakCount(user.getStreakCount() + 1);
        }
        user.setLastActivity(today);
        userRepository.save(user);
    }

    private Long findNextLessonId(Long userId, Course course) {
        return course.getModules().stream()
                .flatMap(m -> m.getLessons().stream())
                .filter(l -> !userProgressRepository.existsByUserIdAndLessonId(userId, l.getId()))
                .map(Lesson::getId)
                .findFirst()
                .orElse(null);
    }
}
// ✅ ProgressServiceImpl.java — complete
