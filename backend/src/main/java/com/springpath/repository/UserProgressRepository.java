package com.springpath.repository;

import com.springpath.entity.UserProgress;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    Optional<UserProgress> findByUserIdAndLessonId(Long userId, Long lessonId);
    boolean existsByUserIdAndLessonId(Long userId, Long lessonId);

    @Query("SELECT up FROM UserProgress up JOIN FETCH up.lesson l JOIN FETCH l.module m JOIN FETCH m.course c WHERE up.user.id = :userId ORDER BY up.completedAt DESC")
    List<UserProgress> getRecentProgress(Long userId, Pageable pageable);

    @Query("SELECT COUNT(up) FROM UserProgress up WHERE up.user.id = :userId AND up.lesson.module.course.id = :courseId")
    long countCompletedLessonsByUserAndCourse(Long userId, Long courseId);

    long countByUserId(Long userId);
}
// ✅ UserProgressRepository.java — complete
