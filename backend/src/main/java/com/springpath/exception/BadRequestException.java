package com.springpath.exception;

public class BadRequestException extends RuntimeException {
    public BadRequestException(String message) {
        super(message);
    }
}
// ✅ BadRequestException.java — complete
