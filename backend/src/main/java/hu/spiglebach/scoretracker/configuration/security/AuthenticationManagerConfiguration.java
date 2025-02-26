package hu.spiglebach.scoretracker.configuration.security;

import hu.spiglebach.scoretracker.exception.ApiErrorCode;
import hu.spiglebach.scoretracker.model.entity.user.User;
import hu.spiglebach.scoretracker.service.fetch.UserFetcher;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class AuthenticationManagerConfiguration {
    private final UserFetcher userFetcher;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public AuthenticationManager authenticationManager() {
        return authentication -> {
            var user = getUserForAuthentication(authentication.getName());
            var correctPassword = passwordEncoder.matches((String) authentication.getCredentials(), user.getPassword());
            if (correctPassword) {
                return UsernamePasswordAuthenticationToken.authenticated(user, null, user.getAuthorities());
            } else {
                throw ApiErrorCode.INCORRECT_CREDENTIALS.exception();
            }
        };
    }

    private User getUserForAuthentication(String username) {
        return userFetcher.findUserByUsername(username)
                .orElseThrow(ApiErrorCode.INCORRECT_CREDENTIALS::exception);
    }
}
