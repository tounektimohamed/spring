package com.springpath.service;

import com.springpath.dto.progress.DashboardResponse;
import com.springpath.entity.User;
import com.springpath.repository.UserRepository;
import com.springpath.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User getCurrentUserEntity() {
        String email = SecurityUtils.getCurrentUserEmail();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new com.springpath.exception.UnauthorizedException("User not found"));
    }

    @Override
    public User updateProfile(String displayName, String avatarUrl) {
        User user = getCurrentUserEntity();
        if (displayName != null && !displayName.isBlank()) {
            user.setDisplayName(displayName);
        }
        if (avatarUrl != null) {
            user.setAvatarUrl(avatarUrl);
        }
        return userRepository.save(user);
    }

    @Override
    public List<DashboardResponse.LeaderboardEntry> getLeaderboard() {
        return userRepository.findLeaderboard().stream()
                .map(u -> new DashboardResponse.LeaderboardEntry(
                        u.getId(), u.getDisplayName(), u.getStreakCount(), u.getAvatarUrl()))
                .collect(Collectors.toList());
    }
}
// ✅ UserServiceImpl.java — complete
