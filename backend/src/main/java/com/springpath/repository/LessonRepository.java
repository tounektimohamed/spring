package com.springpath.repository;

import com.springpath.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    List<Lesson> findByModuleIdOrderByOrderIndexAsc(Long moduleId);

    @Query("SELECT l FROM Lesson l WHERE l.module.course.id = :courseId ORDER BY l.module.orderIndex, l.orderIndex")
    List<Lesson> getAllLessonsForCourse(Long courseId);

    @Query("SELECT COUNT(l) FROM Lesson l")
    long countAllLessons();
}
// ✅ LessonRepository.java — complete
