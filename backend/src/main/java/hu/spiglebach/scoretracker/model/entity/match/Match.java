package hu.spiglebach.scoretracker.model.entity.match;

import hu.spiglebach.scoretracker.model.entity.AuditableEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "match")
@NoArgsConstructor
public class Match extends AuditableEntity {

    @Column(name = "game_name")
    private String gameName;

    @Column(name = "match_result")
    @Enumerated(EnumType.STRING)
    private MatchResult matchResult;

    @Column(name = "date")
    private LocalDate date;

    public Match(String gameName, MatchResult matchResult, LocalDate date) {
        this.gameName = gameName;
        this.matchResult = matchResult;
        this.date = date;
    }
}
