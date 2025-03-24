package hu.spiglebach.scoretracker.model.payload.friend;

import hu.spiglebach.scoretracker.model.payload.user.UserResponse;

public record FriendResponse(
        Long id,
        String nickname,
        String backgroundColor,
        String textColor,
        UserResponse friendUser
) {
}
