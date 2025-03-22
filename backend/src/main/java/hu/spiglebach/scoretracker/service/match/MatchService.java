package hu.spiglebach.scoretracker.service.match;

import hu.spiglebach.scoretracker.model.entity.match.Match;
import hu.spiglebach.scoretracker.model.entity.user.User;
import hu.spiglebach.scoretracker.model.payload.match.CreateMatchRequest;
import hu.spiglebach.scoretracker.model.payload.match.MatchResponse;
import hu.spiglebach.scoretracker.repository.MatchRepository;
import hu.spiglebach.scoretracker.service.fetch.FriendFetcher;
import hu.spiglebach.scoretracker.service.fetch.MatchFetcher;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MatchService {
    private final MatchFetcher matchFetcher;
    private final FriendFetcher friendFetcher;
    private final MatchRepository matchRepository;

    public List<MatchResponse> findMatchesByFriendIdAndOwnerMapped(Long friendId, User owner) {
        var friend = friendFetcher.findFriendByIdAndOwner(friendId, owner);
        return matchFetcher.findMatchesByOwnerAndFriend(owner, friend)
                .stream()
                .map(this::mapToMatchResponse)
                .toList();
    }

    public MatchResponse createMatchMapped(Long friendId, CreateMatchRequest matchData, User owner) {
        var createdMatch = createMatch(friendId, matchData, owner);
        return mapToMatchResponse(createdMatch);
    }

    private Match createMatch(Long friendId, CreateMatchRequest matchData, User owner) {
        var friend = friendFetcher.findFriendByIdAndOwner(friendId, owner);
        var match = new Match(matchData.gameName(), matchData.matchResult(), matchData.date(), owner, friend);
        return matchRepository.save(match);
    }

    private MatchResponse mapToMatchResponse(Match match) {
        return new MatchResponse(match.getId(), match.getGameName(), match.getMatchResult(), match.getDate());
    }
}
