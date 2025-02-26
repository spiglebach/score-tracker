package hu.spiglebach.scoretracker.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalCommonExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorMessageDto> handleResourceNotFound(ApiException exception) {
        return ResponseEntity
                .status(exception.status)
                .body(new ErrorMessageDto(exception));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorMessageDto> handleUnexpectedException(Exception exception) {
        exception.printStackTrace();
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorMessageDto(ApiErrorCode.UNEXPECTED_EXCEPTION.name(), exception.getMessage()));
    }
}
