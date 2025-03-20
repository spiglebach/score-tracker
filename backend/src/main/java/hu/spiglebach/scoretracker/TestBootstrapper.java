package hu.spiglebach.scoretracker;

import hu.spiglebach.scoretracker.model.entity.match.Match;
import hu.spiglebach.scoretracker.model.entity.match.MatchResult;
import hu.spiglebach.scoretracker.model.payload.auth.UserRegistrationRequest;
import hu.spiglebach.scoretracker.repository.MatchRepository;
import hu.spiglebach.scoretracker.service.user.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;

@Configuration
public class TestBootstrapper {

    @Bean
    public String bootstrap(
            UserService userService,
            MatchRepository matchRepository
    ) {
        var user1 = userService.registerUser(new UserRegistrationRequest("user1", "user1"));

        SecurityContextHolder.getContext().setAuthentication(UsernamePasswordAuthenticationToken.authenticated(user1, null, user1.getAuthorities()));
        var match1 = matchRepository.save(new Match("Kingdomino", MatchResult.OWNER_LOST, LocalDate.of(2025, 1, 10)));
        var match2 = matchRepository.save(new Match("Scrabble", MatchResult.OWNER_LOST, LocalDate.of(2025, 1, 14)));
        var match3 = matchRepository.save(new Match("Jaipur", MatchResult.OWNER_WON, LocalDate.of(2025, 2, 5)));
        var match4 = matchRepository.save(new Match("Pandemic", MatchResult.COOPERATIVE, LocalDate.of(2025, 2, 5)));
        var match5 = matchRepository.save(new Match("Virus", MatchResult.NOT_APPLICABLE, LocalDate.of(2025, 2, 7)));
        return "test data loaded";
    }
}
