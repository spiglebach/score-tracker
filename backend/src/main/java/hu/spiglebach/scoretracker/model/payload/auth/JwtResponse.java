package hu.spiglebach.scoretracker.model.payload.auth;

public record JwtResponse(String accessToken, String refreshToken) {
}
