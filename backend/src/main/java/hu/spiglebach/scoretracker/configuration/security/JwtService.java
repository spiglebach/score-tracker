package hu.spiglebach.scoretracker.configuration.security;

import hu.spiglebach.scoretracker.exception.ApiErrorCode;
import hu.spiglebach.scoretracker.model.entity.user.User;
import hu.spiglebach.scoretracker.model.payload.auth.JwtResponse;
import hu.spiglebach.scoretracker.service.auth.RefreshTokenService;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class JwtService {
    private static final long HOURS_TO_MILLISECONDS_MULTIPLIER = 60 * 60 * 1000;

    private SecretKey accessTokenSecret;
    private JwtParser accessTokenParser;

    private SecretKey refreshTokenSecret;
    private JwtParser refreshTokenParser;

    private final SecurityProperties securityProperties;
    private final RefreshTokenService refreshTokenService;

    @PostConstruct
    public void init() {
        accessTokenSecret = Jwts.SIG.HS256.key().build();
        accessTokenParser = Jwts.parser().verifyWith(accessTokenSecret).build();

        refreshTokenSecret = Jwts.SIG.HS256.key().build();
        refreshTokenParser = Jwts.parser().verifyWith(refreshTokenSecret).build();
    }

    public String validateAccessTokenAndExtractSubject(String token) {
        return validateJwtAndExtractSubject(token, accessTokenParser);
    }

    public String validateRefreshTokenAndExtractSubject(String token) {
        return validateJwtAndExtractSubject(token, refreshTokenParser);
    }

    private String validateJwtAndExtractSubject(String jwt, JwtParser jwtParser) {
        try {
            var claims = jwtParser.parseSignedClaims(jwt).getPayload();
            var expiration = claims.getExpiration();
            if (expiration.before(new Date())) {
                throw new RuntimeException("jwt expired");
            }
            return claims.getSubject();
        } catch (Exception e) {
            throw ApiErrorCode.JWT_INVALID.exception();
        }
    }

    public JwtResponse generateTokens(User subjectUser) {
        String subject = subjectUser.getUsername();
        long issuedAt = System.currentTimeMillis();
        long accessTokenExpiration = issuedAt + securityProperties.getJwt().getAccess().getValidityInHours() * HOURS_TO_MILLISECONDS_MULTIPLIER;
        var accessToken = Jwts.builder()
                .claims(new HashMap<>())
                .subject(subject)
                .issuedAt(new Date(issuedAt))
                .expiration(new Date(accessTokenExpiration))
                .signWith(accessTokenSecret)
                .compact();

        var refreshTokenExpiration = issuedAt + securityProperties.getJwt().getRefresh().getValidityInHours() * HOURS_TO_MILLISECONDS_MULTIPLIER;
        var refreshToken = Jwts.builder()
                .claims(new HashMap<>())
                .subject(subject)
                .issuedAt(new Date(issuedAt))
                .expiration(new Date(refreshTokenExpiration))
                .signWith(refreshTokenSecret)
                .compact();
        refreshTokenService.saveRefreshTokenForUser(refreshToken, subjectUser);
        return new JwtResponse(accessToken, refreshToken);
    }

    public JwtResponse refreshTokens(String refreshToken) {
        var subjectUsername = validateRefreshTokenAndExtractSubject(refreshToken);
        var storedRefreshToken = refreshTokenService.validateAndGetRefreshToken(refreshToken, subjectUsername);
        return generateTokens(storedRefreshToken.getOwner());
    }

    public void invalidateRefreshToken(User user) {
        refreshTokenService.invalidateRefreshToken(user);
    }
}
