package hu.spiglebach.scoretracker.model.payload.match;

import hu.spiglebach.scoretracker.model.entity.match.MatchResult;

import java.time.LocalDate;

public record MatchResponse(Long id, String gameName, MatchResult matchResult, LocalDate date) {
}
