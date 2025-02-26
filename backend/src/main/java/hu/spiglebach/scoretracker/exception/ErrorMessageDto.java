package hu.spiglebach.scoretracker.exception;

import java.time.OffsetDateTime;
import java.util.Map;

public class ErrorMessageDto {
    public final OffsetDateTime timeStamp = OffsetDateTime.now();
    public final String errorCode;
    public final String message;
    public final Map<String, String> parameters;

    public ErrorMessageDto(ApiException apiException) {
        this.errorCode = apiException.errorCode;
        this.message = apiException.defaultMessage;
        this.parameters = apiException.parameters;
    }

    public ErrorMessageDto(String errorCode, String message) {
        this(errorCode, message, Map.of());
    }

    public ErrorMessageDto(String errorCode, String message, Map<String, String> parameters) {
        this.errorCode = errorCode;
        this.message = message;
        this.parameters = parameters;
    }
}
