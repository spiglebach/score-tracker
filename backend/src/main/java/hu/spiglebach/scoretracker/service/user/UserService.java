package hu.spiglebach.scoretracker.service.user;

import hu.spiglebach.scoretracker.exception.ApiErrorCode;
import hu.spiglebach.scoretracker.model.entity.user.User;
import hu.spiglebach.scoretracker.model.entity.user.UserSettings;
import hu.spiglebach.scoretracker.model.mapper.Mapper;
import hu.spiglebach.scoretracker.model.payload.auth.UserRegistrationRequest;
import hu.spiglebach.scoretracker.model.payload.user.UpdateUserSettingsRequest;
import hu.spiglebach.scoretracker.model.payload.user.UserSettingsResponse;
import hu.spiglebach.scoretracker.repository.UserRepository;
import hu.spiglebach.scoretracker.repository.UserSettingsRepository;
import hu.spiglebach.scoretracker.service.fetch.UserFetcher;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
@RequiredArgsConstructor
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserFetcher userFetcher;
    private final UserRepository userRepository;
    private final UserSettingsRepository userSettingsRepository;
    private final Mapper mapper;

    public User registerUser(UserRegistrationRequest registrationRequest) {
        if (userFetcher.findUserByUsername(registrationRequest.username()).isPresent()) {
            throw ApiErrorCode.USERNAME_ALREADY_TAKEN.exception();
        }
        var encodedPassword = passwordEncoder.encode(registrationRequest.password());
        var user = new User(registrationRequest.username(), encodedPassword);
        user = userRepository.save(user);
        var userSettings = userSettingsRepository.save(new UserSettings(user));
        return user;
    }

    public UserSettingsResponse getUserSettingsByUserMapped(User user) {
        var userSettings = userFetcher.getUserSettingsByUser(user);
        return mapper.toResponse(userSettings);
    }

    public UserSettingsResponse updateUserSettingsMapped(UpdateUserSettingsRequest request, User user) {
        var userSettings = updateUserSettings(request, user);
        return mapper.toResponse(userSettings);
    }

    private UserSettings updateUserSettings(UpdateUserSettingsRequest request, User user) {
        var userSettings = userFetcher.getUserSettingsByUser(user);
        mapper.updateUserSettings(request, userSettings);
        userSettings = userSettingsRepository.save(userSettings);
        return userSettings;
    }
}
