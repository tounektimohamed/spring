package com.springpath.service;

import com.springpath.dto.code.CodeRunResponse;

import javax.tools.JavaCompiler;
import javax.tools.ToolProvider;
import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.regex.Pattern;

public interface CodeRunService {
    CodeRunResponse runCode(String code);
}
