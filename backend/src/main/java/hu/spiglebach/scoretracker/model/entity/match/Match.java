package hu.spiglebach.scoretracker.model.entity.match;

import hu.spiglebach.scoretracker.model.entity.common.AuditableWithId;
import hu.spiglebach.scoretracker.model.entity.friend.Friend;
import hu.spiglebach.scoretracker.model.entity.user.User;
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
public class Match extends AuditableWithId {

    @Column(name = "game_name")
    private String gameName;

    @Column(name = "match_result")
    @Enumerated(EnumType.STRING)
    private MatchResult matchResult;

    @Column(name = "date")
    private LocalDate date;

    @JoinColumn(name = "owner_user_id")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private User owner;

    @JoinColumn(name = "friend_id")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Friend friend;

    public Match(String gameName, MatchResult matchResult, LocalDate date, User owner, Friend friend) {
        this.gameName = gameName;
        this.matchResult = matchResult;
        this.date = date;
        this.owner = owner;
        this.friend = friend;
    }
}
