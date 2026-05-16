package com.springpath.repository;

import com.springpath.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

    @Query("SELECT u FROM User u ORDER BY u.streakCount DESC, u.createdAt ASC")
    List<User> findLeaderboard();
}
// ✅ UserRepository.java — complete
