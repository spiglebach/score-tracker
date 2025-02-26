package hu.spiglebach.scoretracker.exception;

import org.springframework.http.HttpStatus;

import java.util.Map;
import java.util.stream.Collectors;

public class ApiException extends RuntimeException {
    public final String errorCode;
    public final HttpStatus status;
    public final String defaultMessage;
    public final Map<String, String> parameters;

    public ApiException(String errorCode, HttpStatus status, String defaultMessage, Map<String, String> parameters) {
        super("Error %d - %s (%s). Parameters: %s".formatted(status.value(), defaultMessage, errorCode, ApiException.parametersToString(parameters)));
        this.errorCode = errorCode;
        this.status = status;
        this.defaultMessage = defaultMessage;
        this.parameters = parameters;
    }

    public ApiException(String errorCode, HttpStatus status, String defaultMessage) {
        this(errorCode, status, defaultMessage, Map.of());
    }

    private static String parametersToString(Map<String, String> parameters) {
        return parameters.entrySet().stream()
                .map(entry -> "\"%s\":\"%s\"".formatted(entry.getKey(), entry.getValue()))
                .sorted()
                .collect(Collectors.joining(", ", "{", "}"));
    }

}
