package hu.spiglebach.scoretracker.model.mapper;

import hu.spiglebach.scoretracker.model.entity.friend.Friend;
import hu.spiglebach.scoretracker.model.entity.match.Match;
import hu.spiglebach.scoretracker.model.entity.user.User;
import hu.spiglebach.scoretracker.model.payload.friend.AddFriendRequest;
import hu.spiglebach.scoretracker.model.payload.friend.FriendResponse;
import hu.spiglebach.scoretracker.model.payload.friend.UpdateFriendRequest;
import hu.spiglebach.scoretracker.model.payload.match.CreateMatchRequest;
import hu.spiglebach.scoretracker.model.payload.match.MatchResponse;
import hu.spiglebach.scoretracker.model.payload.user.UserResponse;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@org.mapstruct.Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface Mapper {

    @IgnoreAuditable
    Friend toEntity(AddFriendRequest request, User owner, User friend);

    @IgnoreAuditable
    @Mapping(target = "friend", source = "friend")
    Match toEntity(CreateMatchRequest request, User owner, Friend friend);

    @Mapping(target = "friendUser", source = "friend.friend")
    FriendResponse toResponse(Friend friend);
    UserResponse toResponse(User user);
    MatchResponse toResponse(Match match);

    @IgnoreAuditable
    @Mapping(target = "owner", ignore = true)
    @Mapping(target = "friend", ignore = true)
    void updateFriend(UpdateFriendRequest request, @MappingTarget Friend original);

}
