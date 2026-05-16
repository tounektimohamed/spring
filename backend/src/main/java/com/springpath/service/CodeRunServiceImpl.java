package com.springpath.service;

import com.springpath.dto.code.CodeRunResponse;
import com.springpath.exception.CodeExecutionException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.tools.JavaCompiler;
import javax.tools.ToolProvider;
import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.regex.Pattern;

@Service
public class CodeRunServiceImpl implements CodeRunService {

    @Value("${app.code-runner.sandbox-dir:/tmp/sandbox}")
    private String sandboxBaseDir;

    @Value("${app.code-runner.max-execution-seconds:5}")
    private int maxExecutionSeconds;

    private static final List<String> BLACKLISTED_IMPORTS = List.of(
            "java.io.File", "java.nio.file", "java.net", "java.lang.reflect",
            "java.lang.Runtime", "java.lang.ProcessBuilder", "java.lang.System.exit",
            "java.util.concurrent.Executors", "java.lang.Thread"
    );

    private static final Pattern MAIN_CLASS_PATTERN =
            Pattern.compile("public\\s+class\\s+Main\\s*\\{", Pattern.DOTALL);
    private static final Pattern MAIN_METHOD_PATTERN =
            Pattern.compile("public\\s+static\\s+void\\s+main\\s*\\(\\s*String\\s*\\[\\s*\\]\\s*\\w+\\s*\\)", Pattern.DOTALL);

    @Override
    public CodeRunResponse runCode(String code) {
        validateCode(code);

        String sandboxId = UUID.randomUUID().toString();
        Path sandboxDir = Path.of(sandboxBaseDir, sandboxId);

        try {
            Files.createDirectories(sandboxDir);

            Path sourceFile = sandboxDir.resolve("Main.java");
            Files.writeString(sourceFile, code);

            long startTime = System.currentTimeMillis();

            JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
            if (compiler == null) {
                throw new CodeExecutionException("Java compiler not available - use a JDK, not a JRE");
            }

            int compileResult = compiler.run(null, null, null, sourceFile.toString());
            if (compileResult != 0) {
                return new CodeRunResponse("", "Compilation failed", System.currentTimeMillis() - startTime, false);
            }

            ProcessBuilder pb = new ProcessBuilder(
                    "java",
                    "-Xmx64m",
                    "-Djava.security.manager=allow",
                    "-cp", sandboxDir.toString(),
                    "Main"
            );
            pb.directory(sandboxDir.toFile());
            pb.redirectErrorStream(true);

            Process process = pb.start();
            StringBuilder output = new StringBuilder();
            StringBuilder errorOutput = new StringBuilder();

            ExecutorService executor = Executors.newSingleThreadExecutor();
            Future<?> future = executor.submit(() -> {
                try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                    String line;
                    while ((line = reader.readLine()) != null) {
                        output.append(line).append("\n");
                    }
                } catch (IOException ignored) {}
            });

            try {
                future.get(maxExecutionSeconds, TimeUnit.SECONDS);
                process.waitFor(maxExecutionSeconds, TimeUnit.SECONDS);
            } catch (TimeoutException e) {
                process.destroyForcibly();
                future.cancel(true);
                return new CodeRunResponse("", "Execution timed out after " + maxExecutionSeconds + " seconds",
                        System.currentTimeMillis() - startTime, false);
            } finally {
                executor.shutdownNow();
            }

            long executionMs = System.currentTimeMillis() - startTime;
            int exitCode = process.exitValue();

            if (exitCode != 0) {
                errorOutput.append("Process exited with code: ").append(exitCode).append("\n");
                errorOutput.append(output);
                return new CodeRunResponse("", errorOutput.toString().trim(), executionMs, false);
            }

            return new CodeRunResponse(output.toString().trim(), "", executionMs, true);

        } catch (CodeExecutionException e) {
            throw e;
        } catch (Exception e) {
            throw new CodeExecutionException("Code execution failed: " + e.getMessage(), e);
        } finally {
            cleanupSandbox(sandboxDir);
        }
    }

    private void validateCode(String code) {
        if (code == null || code.isBlank()) {
            throw new CodeExecutionException("Code cannot be empty");
        }

        for (String banned : BLACKLISTED_IMPORTS) {
            if (code.contains(banned)) {
                throw new CodeExecutionException("Forbidden import/usage detected: " + banned);
            }
        }

        if (code.contains("Runtime.getRuntime()") || code.contains("System.exit(")) {
            throw new CodeExecutionException("Forbidden operation detected: Runtime / System.exit");
        }

        if (!MAIN_CLASS_PATTERN.matcher(code).find()) {
            throw new CodeExecutionException("Code must contain: public class Main { ... }");
        }

        if (!MAIN_METHOD_PATTERN.matcher(code).find()) {
            throw new CodeExecutionException("Code must contain: public static void main(String[] args)");
        }
    }

    private void cleanupSandbox(Path sandboxDir) {
        try {
            if (Files.exists(sandboxDir)) {
                try (var walk = Files.walk(sandboxDir)) {
                    walk.sorted(Comparator.reverseOrder())
                            .forEach(path -> {
                                try {
                                    Files.deleteIfExists(path);
                                } catch (IOException ignored) {}
                            });
                }
            }
        } catch (IOException ignored) {}
    }
}
// ✅ CodeRunServiceImpl.java — complete
