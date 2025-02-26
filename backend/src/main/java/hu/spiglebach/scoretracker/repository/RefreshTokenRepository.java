package hu.spiglebach.scoretracker.repository;

import hu.spiglebach.scoretracker.model.entity.user.User;
import hu.spiglebach.scoretracker.model.entity.security.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByOwner(User owner);

    Optional<RefreshToken> findByRefreshToken(String refreshToken);
}
