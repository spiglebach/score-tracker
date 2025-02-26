package hu.spiglebach.scoretracker.service.auth;

import hu.spiglebach.scoretracker.exception.ApiErrorCode;
import hu.spiglebach.scoretracker.model.entity.user.User;
import hu.spiglebach.scoretracker.model.entity.security.RefreshToken;
import hu.spiglebach.scoretracker.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public void saveRefreshTokenForUser(String refreshToken, User user) {
        var oldRefreshToken = refreshTokenRepository.findByOwner(user);
        RefreshToken newRefreshToken;
        if (oldRefreshToken.isPresent()) {
            newRefreshToken = oldRefreshToken.get();
            newRefreshToken.setRefreshToken(refreshToken);
        } else {
            newRefreshToken = new RefreshToken(refreshToken, user);
        }
        refreshTokenRepository.save(newRefreshToken);
    }

    public RefreshToken validateAndGetRefreshToken(String refreshToken, String subjectUsername) {
        var storedRefreshToken = refreshTokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(ApiErrorCode.JWT_INVALID::exception);
        if (!subjectUsername.equals(storedRefreshToken.getOwner().getUsername())) {
            throw ApiErrorCode.JWT_INVALID.exception();
        }
        return storedRefreshToken;
    }

    public void invalidateRefreshToken(User user) {
        refreshTokenRepository.findByOwner(user)
                .ifPresent(refreshTokenRepository::delete);
    }
}
