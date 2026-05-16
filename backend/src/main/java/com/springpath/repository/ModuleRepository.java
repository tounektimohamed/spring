package com.springpath.repository;

import com.springpath.entity.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Long> {

    @Query("SELECT m FROM Module m LEFT JOIN FETCH m.lessons WHERE m.id = :id ORDER BY m.orderIndex")
    Optional<Module> getModuleWithLessons(Long id);

    List<Module> findByCourseIdOrderByOrderIndexAsc(Long courseId);
}
// ✅ ModuleRepository.java — complete
