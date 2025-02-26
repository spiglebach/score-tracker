package hu.spiglebach.scoretracker.exception;

import jakarta.annotation.Nonnull;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.Map;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends ApiException {

    public ResourceNotFoundException(@Nonnull Class<?> resourceClass, @Nonnull String fieldName, @Nonnull Object fieldValue) {
        super(
                ApiErrorCode.RESOURCE_NOT_FOUND.name(),
                HttpStatus.NOT_FOUND,
                String.format("%s not found by %s: %s", resourceClass.getSimpleName(), fieldName, fieldValue),
                Map.of(
                        "class", resourceClass.getSimpleName(),
                        "fieldName", fieldName,
                        "fieldValue", String.valueOf(fieldValue)
                )
        );
    }

}
