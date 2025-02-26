package hu.spiglebach.scoretracker.exception;

import org.springframework.http.HttpStatus;

import java.util.Map;
import java.util.stream.Collectors;

public enum ApiErrorCode {
    // common
    UNEXPECTED_EXCEPTION(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error."),
    RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND, "Resource not found."),

    // auth
    INCORRECT_CREDENTIALS(HttpStatus.UNAUTHORIZED, "Incorrect credentials."),
    JWT_INVALID(HttpStatus.UNAUTHORIZED, "JWT invalid"),
    USERNAME_ALREADY_TAKEN(HttpStatus.UNAUTHORIZED, "Username is already taken."),
;
    public final HttpStatus status;
    public final String message;

    ApiErrorCode(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public ApiException exception() {
        return new ApiException(name(), status, message, Map.of());
    }

    public ApiException exception(Map<String, Object> parameters) {
        var stringParameters = parameters.entrySet()
                .stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> String.valueOf(entry.getValue())
                ));
        return new ApiException(name(), status, message, stringParameters);
    }
}
