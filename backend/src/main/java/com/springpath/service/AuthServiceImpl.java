package com.springpath.service;

import com.springpath.dto.auth.*;
import com.springpath.entity.RefreshToken;
import com.springpath.entity.User;
import com.springpath.enums.UserRole;
import com.springpath.exception.BadRequestException;
import com.springpath.exception.UnauthorizedException;
import com.springpath.repository.RefreshTokenRepository;
import com.springpath.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new BadRequestException("Email already registered");
        }

        User user = User.builder()
                .email(request.email())
                .passwordHash(passwordEncoder.encode(request.password()))
                .displayName(request.displayName())
                .role(UserRole.USER)
                .build();

        user = userRepository.save(user);

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String accessToken = jwtService.generateAccessToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);

        saveRefreshToken(user, refreshToken);

        return AuthResponse.of(accessToken, refreshToken, jwtService.getAccessTokenExpiry(),
                user.getId(), user.getEmail(), user.getDisplayName(), user.getRole().name());
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String accessToken = jwtService.generateAccessToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);

        saveRefreshToken(user, refreshToken);

        return AuthResponse.of(accessToken, refreshToken, jwtService.getAccessTokenExpiry(),
                user.getId(), user.getEmail(), user.getDisplayName(), user.getRole().name());
    }

    @Override
    @Transactional
    public AuthResponse refresh(RefreshRequest request) {
        RefreshToken storedToken = refreshTokenRepository.findByToken(request.refreshToken())
                .orElseThrow(() -> new UnauthorizedException("Invalid refresh token"));

        if (storedToken.isRevoked() || storedToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new UnauthorizedException("Refresh token expired or revoked");
        }

        User user = storedToken.getUser();
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());

        String accessToken = jwtService.generateAccessToken(userDetails);
        String newRefreshToken = jwtService.generateRefreshToken(userDetails);

        storedToken.setRevoked(true);
        refreshTokenRepository.save(storedToken);
        saveRefreshToken(user, newRefreshToken);

        return AuthResponse.of(accessToken, newRefreshToken, jwtService.getAccessTokenExpiry(),
                user.getId(), user.getEmail(), user.getDisplayName(), user.getRole().name());
    }

    @Override
    @Transactional
    public void logout(String accessToken) {
        String email = jwtService.extractUsername(accessToken);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("User not found"));
        refreshTokenRepository.revokeAllByUserId(user.getId());
    }

    private void saveRefreshToken(User user, String token) {
        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .token(token)
                .expiresAt(LocalDateTime.now().plusSeconds(jwtService.getRefreshTokenExpiry() / 1000))
                .build();
        refreshTokenRepository.save(refreshToken);
    }
}
// ✅ AuthServiceImpl.java — complete
