package hu.spiglebach.scoretracker.model.mapper;

import org.mapstruct.Mapping;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.CLASS)
@Mapping(target = "createdDate", ignore = true)
@Mapping(target = "lastModifiedDate", ignore = true)
@Mapping(target = "createdBy", ignore = true)
@Mapping(target = "lastModifiedBy", ignore = true)
public @interface IgnoreAuditable {
}
