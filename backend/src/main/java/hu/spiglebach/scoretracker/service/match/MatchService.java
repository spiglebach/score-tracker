package hu.spiglebach.scoretracker.service.match;

import hu.spiglebach.scoretracker.model.entity.match.Match;
import hu.spiglebach.scoretracker.model.entity.user.User;
import hu.spiglebach.scoretracker.model.mapper.Mapper;
import hu.spiglebach.scoretracker.model.payload.match.CreateMatchRequest;
import hu.spiglebach.scoretracker.model.payload.match.MatchResponse;
import hu.spiglebach.scoretracker.repository.MatchRepository;
import hu.spiglebach.scoretracker.service.fetch.FriendFetcher;
import hu.spiglebach.scoretracker.service.fetch.MatchFetcher;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class MatchService {
    private final MatchFetcher matchFetcher;
    private final FriendFetcher friendFetcher;
    private final MatchRepository matchRepository;
    private final Mapper mapper;

    @Transactional(readOnly = true)
    public List<MatchResponse> findMatchesByFriendIdAndOwnerMapped(Long friendId, User owner) {
        var friend = friendFetcher.findFriendByIdAndOwner(friendId, owner);
        return matchFetcher.findMatchesByOwnerAndFriend(owner, friend)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    public MatchResponse createMatchMapped(Long friendId, CreateMatchRequest matchData, User owner) {
        var createdMatch = createMatch(friendId, matchData, owner);
        return mapper.toResponse(createdMatch);
    }

    private Match createMatch(Long friendId, CreateMatchRequest matchData, User owner) {
        var friend = friendFetcher.findFriendByIdAndOwner(friendId, owner);
        var match = mapper.toEntity(matchData, owner, friend);
        return matchRepository.save(match);
    }
}
