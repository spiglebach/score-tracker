package hu.spiglebach.scoretracker;

import hu.spiglebach.scoretracker.model.payload.auth.UserRegistrationRequest;
import hu.spiglebach.scoretracker.service.user.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TestBootstrapper {

    @Bean
    public String bootstrap(
            UserService userService
    ) {
        var user1 = userService.registerUser(new UserRegistrationRequest("user1", "user1"));
        return "test data loaded";
    }
}
