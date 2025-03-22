package hu.spiglebach.scoretracker.service.fetch;

import hu.spiglebach.scoretracker.model.entity.user.User;
import hu.spiglebach.scoretracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional(readOnly = true)
@Component
@RequiredArgsConstructor
public class UserFetcher {
    private final UserRepository userRepository;

    public Optional<User> findUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }
}
