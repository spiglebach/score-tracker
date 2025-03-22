package hu.spiglebach.scoretracker.service.user;

import hu.spiglebach.scoretracker.exception.ApiErrorCode;
import hu.spiglebach.scoretracker.model.entity.user.User;
import hu.spiglebach.scoretracker.model.payload.auth.UserRegistrationRequest;
import hu.spiglebach.scoretracker.repository.UserRepository;
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

    public User registerUser(UserRegistrationRequest registrationRequest) {
        if (userFetcher.findUserByUsername(registrationRequest.username()).isPresent()) {
            throw ApiErrorCode.USERNAME_ALREADY_TAKEN.exception();
        }
        var encodedPassword = passwordEncoder.encode(registrationRequest.password());
        var user = new User(registrationRequest.username(), encodedPassword);
        return userRepository.save(user);
    }
}
