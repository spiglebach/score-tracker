package hu.spiglebach.scoretracker.model.payload.friend;

import hu.spiglebach.scoretracker.model.payload.user.UserResponse;

public record FriendResponse(
        Long id,
        String friendNickname,
        String friendBackgroundColor,
        String friendTextColor,
        UserResponse friendUser
) {
}
