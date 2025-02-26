package hu.spiglebach.scoretracker.configuration.security;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "app.security")
public class SecurityProperties {
    private JwtProperties jwt;

    @Getter
    @Setter
    public static class JwtProperties {
        private TokenProperties access;
        private TokenProperties refresh;
    }

    @Getter
    @Setter
    public static class TokenProperties {
        private String secret;
        private long validityInHours;
    }

}
