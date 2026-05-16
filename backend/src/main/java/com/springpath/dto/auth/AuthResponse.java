package com.springpath.dto.auth;

public record AuthResponse(
    String accessToken,
    String refreshToken,
    String tokenType,
    long expiresIn,
    Long userId,
    String email,
    String displayName,
    String role
) {
    public static AuthResponse of(String accessToken, String refreshToken, long expiresIn,
                                   Long userId, String email, String displayName, String role) {
        return new AuthResponse(accessToken, refreshToken, "Bearer", expiresIn, userId, email, displayName, role);
    }
}
// ✅ AuthResponse.java — complete
