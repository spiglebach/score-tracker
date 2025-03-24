package hu.spiglebach.scoretracker.model.mapper;

import hu.spiglebach.scoretracker.model.entity.friend.Friend;
import hu.spiglebach.scoretracker.model.entity.match.Match;
import hu.spiglebach.scoretracker.model.entity.user.User;
import hu.spiglebach.scoretracker.model.entity.user.UserSettings;
import hu.spiglebach.scoretracker.model.payload.friend.AddFriendRequest;
import hu.spiglebach.scoretracker.model.payload.friend.FriendResponse;
import hu.spiglebach.scoretracker.model.payload.friend.UpdateFriendRequest;
import hu.spiglebach.scoretracker.model.payload.match.CreateMatchRequest;
import hu.spiglebach.scoretracker.model.payload.match.MatchResponse;
import hu.spiglebach.scoretracker.model.payload.user.UpdateUserSettingsRequest;
import hu.spiglebach.scoretracker.model.payload.user.UserResponse;
import hu.spiglebach.scoretracker.model.payload.user.UserSettingsResponse;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@org.mapstruct.Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface Mapper {

    @IgnoreId
    @IgnoreAuditable
    @Mapping(target = "playerSettings.nickname", source = "request.nickname")
    @Mapping(target = "playerSettings.backgroundColor", source = "request.backgroundColor")
    @Mapping(target = "playerSettings.textColor", source = "request.textColor")
    Friend toEntity(AddFriendRequest request, User owner, User friend);

    @IgnoreId
    @IgnoreAuditable
    @Mapping(target = "friend", source = "friend")
    Match toEntity(CreateMatchRequest request, User owner, Friend friend);

    @Mapping(target = "friendUser", source = "friend.friend")
    @Mapping(target = "nickname", source = "playerSettings.nickname")
    @Mapping(target = "backgroundColor", source = "playerSettings.backgroundColor")
    @Mapping(target = "textColor", source = "playerSettings.textColor")
    FriendResponse toResponse(Friend friend);

    UserResponse toResponse(User user);
    MatchResponse toResponse(Match match);

    @Mapping(target = "nickname", source = "playerSettings.nickname")
    @Mapping(target = "backgroundColor", source = "playerSettings.backgroundColor")
    @Mapping(target = "textColor", source = "playerSettings.textColor")
    UserSettingsResponse toResponse(UserSettings settings);

    @IgnoreId
    @IgnoreAuditable
    @Mapping(target = "owner", ignore = true)
    @Mapping(target = "friend", ignore = true)
    @Mapping(target = "playerSettings.nickname", source = "request.nickname")
    @Mapping(target = "playerSettings.backgroundColor", source = "request.backgroundColor")
    @Mapping(target = "playerSettings.textColor", source = "request.textColor")
    void updateFriend(UpdateFriendRequest request, @MappingTarget Friend original);

    @IgnoreAuditable
    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "playerSettings.nickname", source = "request.nickname")
    @Mapping(target = "playerSettings.backgroundColor", source = "request.backgroundColor")
    @Mapping(target = "playerSettings.textColor", source = "request.textColor")
    void updateUserSettings(UpdateUserSettingsRequest request, @MappingTarget UserSettings userSettings);
}
