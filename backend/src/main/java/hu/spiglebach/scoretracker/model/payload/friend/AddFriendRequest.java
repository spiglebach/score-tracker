package hu.spiglebach.scoretracker.model.payload.friend;

public record AddFriendRequest(String friendNickname, String friendBackgroundColor, String friendTextColor, String friendUsername) {
}
