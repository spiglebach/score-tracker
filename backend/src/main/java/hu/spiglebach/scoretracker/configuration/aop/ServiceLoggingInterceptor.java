package hu.spiglebach.scoretracker.configuration.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

@Slf4j
@Aspect
@Component
public class ServiceLoggingInterceptor {

    @Around("within(hu.spiglebach.scoretracker.service..*)")
    public Object logServiceMethodExecutionDurations(ProceedingJoinPoint joinPoint) throws Throwable {
        return logMethodExecutionDuration("Service", joinPoint);
    }

    @Around("within(hu.spiglebach.scoretracker.controller..*)")
    public Object logControllerEndpointExecutionDurations(ProceedingJoinPoint joinPoint) throws Throwable {
        return logMethodExecutionDuration("Controller", joinPoint);
    }

    private Object logMethodExecutionDuration(String methodType, ProceedingJoinPoint joinPoint) throws Throwable {
        var stopWatch = new StopWatch();
        stopWatch.start();
        var returnValue = joinPoint.proceed();
        stopWatch.stop();

        var totalTimeMillis = stopWatch.getTotalTimeMillis();

        var seconds = totalTimeMillis / 1000;
        var millis = totalTimeMillis % 1000;

        log.info("{} method {} executed in {}s {}ms", methodType, joinPoint.getSignature().toShortString(), seconds, millis);

        return returnValue;
    }
}
