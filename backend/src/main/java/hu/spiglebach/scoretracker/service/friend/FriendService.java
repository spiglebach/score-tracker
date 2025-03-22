package hu.spiglebach.scoretracker.service.friend;

import hu.spiglebach.scoretracker.model.entity.friend.Friend;
import hu.spiglebach.scoretracker.model.entity.user.User;
import hu.spiglebach.scoretracker.model.mapper.Mapper;
import hu.spiglebach.scoretracker.model.payload.friend.AddFriendRequest;
import hu.spiglebach.scoretracker.model.payload.friend.FriendResponse;
import hu.spiglebach.scoretracker.model.payload.friend.UpdateFriendRequest;
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
    private final Mapper mapper;

    public List<FriendResponse> getFriendsMapped(User owner) {
        return friendFetcher.findFriendsByOwner(owner)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    public FriendResponse addFriendMapped(AddFriendRequest request, User owner) {
        var newFriend = addFriend(request, owner);
        return mapper.toResponse(newFriend);
    }

    public Friend addFriend(AddFriendRequest request, User owner) {
        var friendUser = Optional.ofNullable(request.friendUsername())
                .flatMap(userFetcher::findUserByUsername)
                .orElse(null);
        var friend = mapper.toEntity(request, owner, friendUser);
        friend = friendRepository.save(friend);
        return friend;
    }

    public FriendResponse updateFriendMapped(Long friendId, UpdateFriendRequest request, User owner) {
        var updatedFriend = updateFriend(friendId, request, owner);
        return mapper.toResponse(updatedFriend);
    }

    private Friend updateFriend(Long friendId, UpdateFriendRequest request, User owner) {
        var friend = friendFetcher.findFriendByIdAndOwner(friendId, owner);
        mapper.updateFriend(request, friend);
        friend = friendRepository.save(friend);
        return friend;
    }
}
