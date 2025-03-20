package hu.spiglebach.scoretracker.service.friend;

import hu.spiglebach.scoretracker.model.entity.friend.Friend;
import hu.spiglebach.scoretracker.model.entity.user.User;
import hu.spiglebach.scoretracker.model.payload.friend.AddFriendRequest;
import hu.spiglebach.scoretracker.model.payload.friend.FriendResponse;
import hu.spiglebach.scoretracker.model.payload.user.UserResponse;
import hu.spiglebach.scoretracker.repository.FriendRepository;
import hu.spiglebach.scoretracker.service.fetch.FriendFetcher;
import hu.spiglebach.scoretracker.service.fetch.UserFetcher;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FriendService {
    private final FriendRepository friendRepository;
    private final FriendFetcher friendFetcher;
    private final UserFetcher userFetcher;

    public List<FriendResponse> getFriendsMapped(User owner) {
        return friendFetcher.findFriendsByOwner(owner)
                .stream()
                .map(this::mapToFriendResponse)
                .toList();
    }

    private FriendResponse mapToFriendResponse(Friend friend) {
        return new FriendResponse(
                friend.getId(),
                friend.getFriendNickname(),
                friend.getFriendBackgroundColor(),
                friend.getFriendTextColor(),
                mapToUserResponse(friend.getFriend())
        );
    }

    private UserResponse mapToUserResponse(User user) {
        if (user == null) {
            return null;
        }
        return new UserResponse(user.getId(), user.getUsername());
    }

    public FriendResponse addFriendMapped(AddFriendRequest request, User owner) {
        var newFriend = addFriend(request, owner);
        return mapToFriendResponse(newFriend);
    }

    public Friend addFriend(AddFriendRequest request, User owner) {
        var friendUser = Optional.ofNullable(request.friendUsername())
                .flatMap(userFetcher::findUserByUsername)
                .orElse(null);
        var friend = new Friend(owner, request.friendNickname(), request.friendBackgroundColor(), request.friendTextColor(), friendUser);
        friend = friendRepository.save(friend);
        return friend;
    }
}
