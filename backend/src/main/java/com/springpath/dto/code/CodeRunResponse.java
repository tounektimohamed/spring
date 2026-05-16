package com.springpath.dto.code;

public record CodeRunResponse(
    String output,
    String error,
    long executionMs,
    boolean success
) {}
// ✅ CodeRunResponse.java — complete
