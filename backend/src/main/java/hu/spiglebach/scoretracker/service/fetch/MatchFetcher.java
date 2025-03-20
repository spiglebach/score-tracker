package hu.spiglebach.scoretracker.service.fetch;

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

    public List<Match> findMatchesByOwner(User owner) {
        return matchRepository.findMatchesByOwner(owner);
    }
}
