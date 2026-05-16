package com.springpath.dto.code;

import jakarta.validation.constraints.NotBlank;

public record CodeRunRequest(
    @NotBlank String code
) {}
// ✅ CodeRunRequest.java — complete
