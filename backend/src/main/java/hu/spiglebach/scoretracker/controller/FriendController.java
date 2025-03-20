package hu.spiglebach.scoretracker.controller;

import hu.spiglebach.scoretracker.model.entity.user.User;
import hu.spiglebach.scoretracker.model.payload.friend.AddFriendRequest;
import hu.spiglebach.scoretracker.model.payload.friend.FriendResponse;
import hu.spiglebach.scoretracker.service.friend.FriendService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/friends")
@RequiredArgsConstructor
public class FriendController {
    private final FriendService friendService;

    @GetMapping
    public ResponseEntity<List<FriendResponse>> getFriends(@AuthenticationPrincipal User owner) {
        var response = friendService.getFriendsMapped(owner);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<FriendResponse> addFriend(@RequestBody AddFriendRequest request, @AuthenticationPrincipal User owner) {
        var response = friendService.addFriendMapped(request, owner);
        return ResponseEntity.ok(response);
    }
}
