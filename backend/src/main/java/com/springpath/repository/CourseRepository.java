package com.springpath.repository;

import com.springpath.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    Optional<Course> findBySlug(String slug);
    List<Course> findAllByIsPublishedTrueOrderByOrderIndexAsc();

    @Query("SELECT DISTINCT c FROM Course c LEFT JOIN FETCH c.modules WHERE c.slug = :slug")
    Optional<Course> getCourseDetail(String slug);
}
// ✅ CourseRepository.java — complete
