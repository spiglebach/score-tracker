package hu.spiglebach.scoretracker.repository;

import hu.spiglebach.scoretracker.model.entity.friend.Friend;
import hu.spiglebach.scoretracker.model.entity.match.Match;
import hu.spiglebach.scoretracker.model.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MatchRepository extends JpaRepository<Match, Long> {

    @Query("select m from Match m where m.owner = :owner and m.friend = :friend")
    List<Match> findMatchesByOwnerAndFriend(@Param("owner") User owner, @Param("friend") Friend friend);
}
