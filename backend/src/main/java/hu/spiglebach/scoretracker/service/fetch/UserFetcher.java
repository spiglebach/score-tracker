package hu.spiglebach.scoretracker.service.fetch;

import hu.spiglebach.scoretracker.exception.ResourceNotFoundException;
import hu.spiglebach.scoretracker.model.entity.user.User;
import hu.spiglebach.scoretracker.model.entity.user.UserSettings;
import hu.spiglebach.scoretracker.repository.UserRepository;
import hu.spiglebach.scoretracker.repository.UserSettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional(readOnly = true)
@Component
@RequiredArgsConstructor
public class UserFetcher {
    private final UserRepository userRepository;
    private final UserSettingsRepository userSettingsRepository;

    public Optional<User> findUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }
    public UserSettings getUserSettingsByUser(User user) {
        return userSettingsRepository.findUserSettingsByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException(UserSettings.class, "user id", user.getId()));
    }
}
