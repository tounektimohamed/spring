package com.springpath.dto.auth;

import jakarta.validation.constraints.NotBlank;

public record RefreshRequest(
    @NotBlank String refreshToken
) {}
// ✅ RefreshRequest.java — complete
