package hu.spiglebach.scoretracker.service.fetch;

import hu.spiglebach.scoretracker.exception.ResourceNotFoundException;
import hu.spiglebach.scoretracker.model.entity.friend.Friend;
import hu.spiglebach.scoretracker.model.entity.user.User;
import hu.spiglebach.scoretracker.repository.FriendRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class FriendFetcher {
    private final FriendRepository friendRepository;

    public List<Friend> findFriendsByOwner(User owner) {
        return friendRepository.findFriendsByOwner(owner);
    }

    public Friend findFriendByIdAndOwner(Long friendId, User owner) {
        return friendRepository.findFriendByIdAndOwner(friendId, owner)
                .orElseThrow(() -> new ResourceNotFoundException(Friend.class, "id and owner user", String.format("id=%s, ownerUserId=%s", friendId, owner.getId())));
    }
}
