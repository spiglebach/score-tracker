package hu.spiglebach.scoretracker.service.fetch;

import hu.spiglebach.scoretracker.model.entity.friend.Friend;
import hu.spiglebach.scoretracker.model.entity.match.Match;
import hu.spiglebach.scoretracker.model.entity.user.User;
import hu.spiglebach.scoretracker.repository.MatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MatchFetcher {
    private final MatchRepository matchRepository;

    public List<Match> findMatchesByOwnerAndFriend(User owner, Friend friend) {
        return matchRepository.findMatchesByOwnerAndFriend(owner, friend);
    }
}
