package hu.spiglebach.scoretracker.controller;

import hu.spiglebach.scoretracker.model.entity.user.User;
import hu.spiglebach.scoretracker.model.payload.match.CreateMatchRequest;
import hu.spiglebach.scoretracker.model.payload.match.MatchResponse;
import hu.spiglebach.scoretracker.service.match.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/friends/{friend-id}/matches")
@RequiredArgsConstructor
public class MatchController {
    private final MatchService matchService;

    @GetMapping
    public ResponseEntity<List<MatchResponse>> getMatches(@PathVariable(name = "friend-id") Long friendId, @AuthenticationPrincipal User user) {
        var response = matchService.findMatchesByFriendIdAndOwnerMapped(friendId, user);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<MatchResponse> createMatch(@PathVariable(name = "friend-id") Long friendId, @RequestBody CreateMatchRequest matchData, @AuthenticationPrincipal User user) {
        var createdMatch = matchService.createMatchMapped(friendId, matchData, user);
        return ResponseEntity.ok(createdMatch);
    }
}
