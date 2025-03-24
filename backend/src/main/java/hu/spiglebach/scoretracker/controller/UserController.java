package hu.spiglebach.scoretracker.controller;

import hu.spiglebach.scoretracker.model.entity.user.User;
import hu.spiglebach.scoretracker.model.mapper.Mapper;
import hu.spiglebach.scoretracker.model.payload.user.UpdateUserSettingsRequest;
import hu.spiglebach.scoretracker.model.payload.user.UserResponse;
import hu.spiglebach.scoretracker.model.payload.user.UserSettingsResponse;
import hu.spiglebach.scoretracker.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final Mapper mapper;
    private final UserService userService;

    @GetMapping("/self")
    public ResponseEntity<UserResponse> getOwnUser(@AuthenticationPrincipal User user) {
        var response = mapper.toResponse(user);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/self/settings")
    public ResponseEntity<UserSettingsResponse> getOwnUserSettings(@AuthenticationPrincipal User user) {
        var response = userService.getUserSettingsByUserMapped(user);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/self/settings")
    public ResponseEntity<UserSettingsResponse> updateOwnUserSettings(@RequestBody UpdateUserSettingsRequest request, @AuthenticationPrincipal User user) {
        var response = userService.updateUserSettingsMapped(request, user);
        return ResponseEntity.ok(response);
    }
}
