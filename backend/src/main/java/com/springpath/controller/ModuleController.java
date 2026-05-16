package com.springpath.controller;

import com.springpath.dto.common.ApiResponse;
import com.springpath.entity.Module;
import com.springpath.exception.ResourceNotFoundException;
import com.springpath.repository.ModuleRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/modules")
@RequiredArgsConstructor
@Tag(name = "Modules", description = "View module details")
public class ModuleController {

    private final ModuleRepository moduleRepository;

    @GetMapping("/{id}")
    @Operation(summary = "Get module details with lessons")
    public ResponseEntity<ApiResponse<Module>> getModule(@PathVariable Long id) {
        Module module = moduleRepository.getModuleWithLessons(id)
                .orElseThrow(() -> new ResourceNotFoundException("Module", "id", id));
        return ResponseEntity.ok(ApiResponse.ok(module));
    }
}
// ✅ ModuleController.java — complete
