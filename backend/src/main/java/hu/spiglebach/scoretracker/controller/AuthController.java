package hu.spiglebach.scoretracker.controller;

import hu.spiglebach.scoretracker.configuration.security.JwtService;
import hu.spiglebach.scoretracker.model.entity.user.User;
import hu.spiglebach.scoretracker.model.payload.auth.AuthenticationRequest;
import hu.spiglebach.scoretracker.model.payload.auth.JwtResponse;
import hu.spiglebach.scoretracker.model.payload.auth.UserRegistrationRequest;
import hu.spiglebach.scoretracker.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtService jwtService;

    @PostMapping("/authenticate")
    public ResponseEntity<JwtResponse> authenticate(@RequestBody AuthenticationRequest authRequest) {
        var request = UsernamePasswordAuthenticationToken.unauthenticated(
                authRequest.username(),
                authRequest.password()
        );
        var authentication = authenticationManager.authenticate(request);
        var user = (User) authentication.getPrincipal();
        var jwtResponse = jwtService.generateTokens(user);
        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<JwtResponse> register(@RequestBody UserRegistrationRequest registrationRequest) {
        var registeredUser = userService.registerUser(registrationRequest);
        var jwtResponse = jwtService.generateTokens(registeredUser);
        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtResponse> refresh(@RequestParam String refreshToken) {
        var jwtResponse = jwtService.refreshTokens(refreshToken);
        return ResponseEntity.ok(jwtResponse);
    }

    @DeleteMapping("/refresh/invalidate")
    public ResponseEntity<Void> invalidateRefreshToken(@AuthenticationPrincipal User user) {
        jwtService.invalidateRefreshToken(user);
        return ResponseEntity.noContent().build();
    }
}
