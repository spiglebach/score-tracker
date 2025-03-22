package hu.spiglebach.scoretracker;

import hu.spiglebach.scoretracker.model.entity.match.Match;
import hu.spiglebach.scoretracker.model.entity.match.MatchResult;
import hu.spiglebach.scoretracker.model.payload.auth.UserRegistrationRequest;
import hu.spiglebach.scoretracker.model.payload.friend.AddFriendRequest;
import hu.spiglebach.scoretracker.repository.MatchRepository;
import hu.spiglebach.scoretracker.service.friend.FriendService;
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
            MatchRepository matchRepository,
            FriendService friendService
    ) {
        var user1 = userService.registerUser(new UserRegistrationRequest("user1", "user1"));
        var user2 = userService.registerUser(new UserRegistrationRequest("thefriend", "thefriend"));

        SecurityContextHolder.getContext().setAuthentication(UsernamePasswordAuthenticationToken.authenticated(user1, null, user1.getAuthorities()));

        var friend1 = friendService.addFriend(new AddFriendRequest("My Bestie", "#000000", "#7DFF7B", "thefriend"), user1);

        var match1 = matchRepository.save(new Match("Kingdomino", MatchResult.OWNER_LOST, LocalDate.of(2025, 1, 10), user1, friend1));
        var match2 = matchRepository.save(new Match("Scrabble", MatchResult.OWNER_LOST, LocalDate.of(2025, 1, 14), user1, friend1));
        var match3 = matchRepository.save(new Match("Jaipur", MatchResult.OWNER_WON, LocalDate.of(2025, 2, 5), user1, friend1));
        var match4 = matchRepository.save(new Match("Pandemic", MatchResult.COOPERATIVE, LocalDate.of(2025, 2, 5), user1, friend1));
        var match5 = matchRepository.save(new Match("Virus", MatchResult.NOT_APPLICABLE, LocalDate.of(2025, 2, 7), user1, friend1));
        return "test data loaded";
    }
}
