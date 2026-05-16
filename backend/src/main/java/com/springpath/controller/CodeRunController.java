package com.springpath.controller;

import com.springpath.dto.code.CodeRunRequest;
import com.springpath.dto.code.CodeRunResponse;
import com.springpath.dto.common.ApiResponse;
import com.springpath.exception.BadRequestException;
import com.springpath.security.SecurityUtils;
import com.springpath.service.CodeRunService;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/code-run")
@RequiredArgsConstructor
@Tag(name = "Code Runner", description = "Sandboxed Java code execution with rate limiting")
public class CodeRunController {

    private final CodeRunService codeRunService;
    private final Map<Long, Bucket> buckets = new ConcurrentHashMap<>();

    private Bucket createNewBucket() {
        Bandwidth limit = Bandwidth.builder()
                .capacity(10)
                .refillGreedy(10, Duration.ofMinutes(1))
                .build();
        return Bucket.builder().addLimit(limit).build();
    }

    @PostMapping
    @Operation(summary = "Execute Java code in a sandboxed environment (10 req/min per user)")
    public ResponseEntity<ApiResponse<CodeRunResponse>> runCode(@Valid @RequestBody CodeRunRequest request) {
        Long userId = SecurityUtils.getCurrentUserId();
        Bucket bucket = buckets.computeIfAbsent(userId, k -> createNewBucket());

        if (!bucket.tryConsume(1)) {
            throw new BadRequestException("Rate limit exceeded. Max 10 code runs per minute. Please wait.");
        }

        long availableTokens = bucket.getAvailableTokens();
        CodeRunResponse response = codeRunService.runCode(request.code());
        return ResponseEntity.ok(ApiResponse.ok("Execution complete (" + availableTokens + "/10 runs remaining)", response));
    }
}
// ✅ CodeRunController.java — complete
