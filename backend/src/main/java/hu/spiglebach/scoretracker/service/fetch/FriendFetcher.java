package hu.spiglebach.scoretracker.service.fetch;

import hu.spiglebach.scoretracker.model.entity.friend.Friend;
import hu.spiglebach.scoretracker.model.entity.user.User;
import hu.spiglebach.scoretracker.repository.FriendRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendFetcher {
    private final FriendRepository friendRepository;

    public List<Friend> findFriendsByOwner(User owner) {
        return friendRepository.findFriendsByOwner(owner);
    }
}
