package hu.spiglebach.scoretracker.model.payload.friend;

public record AddFriendRequest(String nickname, String backgroundColor, String textColor, String friendUsername) {
}
