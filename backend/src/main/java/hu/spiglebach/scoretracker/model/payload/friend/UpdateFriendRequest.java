package hu.spiglebach.scoretracker.model.payload.friend;

public record UpdateFriendRequest(String friendNickname, String friendBackgroundColor, String friendTextColor) {
}
