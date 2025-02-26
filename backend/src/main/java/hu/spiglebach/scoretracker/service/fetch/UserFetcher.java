package hu.spiglebach.scoretracker.service.fetch;

import hu.spiglebach.scoretracker.model.entity.user.User;
import hu.spiglebach.scoretracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class UserFetcher {
    private final UserRepository userRepository;

    public Optional<User> findUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }
}
