package hu.spiglebach.scoretracker.configuration.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import hu.spiglebach.scoretracker.exception.ApiErrorCode;
import hu.spiglebach.scoretracker.exception.ApiException;
import hu.spiglebach.scoretracker.exception.ErrorMessageDto;
import hu.spiglebach.scoretracker.service.fetch.UserFetcher;
import jakarta.annotation.Nonnull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {
    private static final String BEARER_TOKEN_PREFIX = "Bearer ";

    private final JwtService jwtService;
    private final UserFetcher userFetcher;
    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(
            @Nonnull HttpServletRequest request,
            @Nonnull HttpServletResponse response,
            @Nonnull FilterChain filterChain
    ) throws ServletException, IOException {
        try {
            var jwt = parseJwt(request);
            if (jwt != null) {
                var username = jwtService.validateAccessTokenAndExtractSubject(jwt);
                var user = userFetcher.findUserByUsername(username)
                        .orElseThrow(ApiErrorCode.JWT_INVALID::exception);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        user, null, user.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

            filterChain.doFilter(request, response);
        } catch (ApiException e) {
            respondWithError(e, response);
        } catch (Exception e) {
            log.error("Can not set user authentication", e);
        }
    }

    private void respondWithError(ApiException e, HttpServletResponse response) throws IOException {
        var error = new ErrorMessageDto(e);
        response.setStatus(e.status.value());
        response.getWriter().write(objectMapper.writeValueAsString(error));
    }

    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith(BEARER_TOKEN_PREFIX)) {
            return headerAuth.substring(BEARER_TOKEN_PREFIX.length());
        }
        return null;
    }
}
