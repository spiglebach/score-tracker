package hu.spiglebach.scoretracker.service.match;

import hu.spiglebach.scoretracker.model.entity.match.Match;
import hu.spiglebach.scoretracker.model.entity.user.User;
import hu.spiglebach.scoretracker.model.payload.match.CreateMatchRequest;
import hu.spiglebach.scoretracker.model.payload.match.MatchResponse;
import hu.spiglebach.scoretracker.repository.MatchRepository;
import hu.spiglebach.scoretracker.service.fetch.MatchFetcher;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MatchService {
    private final MatchFetcher matchFetcher;
    private final MatchRepository matchRepository;

    public List<MatchResponse> findMatchesByOwnerMapped(User owner) {
        return matchFetcher.findMatchesByOwner(owner)
                .stream()
                .map(this::mapToMatchResponse)
                .toList();
    }

    public MatchResponse createMatchMapped(CreateMatchRequest matchData) {
        var createdMatch = createMatch(matchData);
        return mapToMatchResponse(createdMatch);
    }

    private Match createMatch(CreateMatchRequest matchData) {
        var match = new Match(matchData.gameName(), matchData.matchResult(), matchData.date());
        return matchRepository.save(match);
    }

    private MatchResponse mapToMatchResponse(Match match) {
        return new MatchResponse(match.getId(), match.getGameName(), match.getMatchResult(), match.getDate());
    }
}
