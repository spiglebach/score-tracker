package hu.spiglebach.scoretracker.model.payload.user;

public record UserSettingsResponse(Long favouriteFriendId, String nickname, String backgroundColor, String textColor) {
}
