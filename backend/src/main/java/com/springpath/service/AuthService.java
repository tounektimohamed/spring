package com.springpath.service;

import com.springpath.dto.auth.*;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    AuthResponse refresh(RefreshRequest request);
    void logout(String accessToken);
}
// ✅ AuthService.java — complete
