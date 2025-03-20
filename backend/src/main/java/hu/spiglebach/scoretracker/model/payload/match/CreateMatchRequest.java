package hu.spiglebach.scoretracker.model.payload.match;

import hu.spiglebach.scoretracker.model.entity.match.MatchResult;

import java.time.LocalDate;

public record CreateMatchRequest(String gameName, MatchResult matchResult, LocalDate date) {
}
