package hu.spiglebach.scoretracker.model.payload.user;

public record UpdateUserSettingsRequest(Long favouriteFriendId, String nickname, String backgroundColor, String textColor) {
}
