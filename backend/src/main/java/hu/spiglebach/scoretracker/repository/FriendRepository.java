package hu.spiglebach.scoretracker.repository;

import hu.spiglebach.scoretracker.model.entity.friend.Friend;
import hu.spiglebach.scoretracker.model.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FriendRepository extends JpaRepository<Friend, Long> {
    List<Friend> findFriendsByOwner(User owner);

    Optional<Friend> findFriendByIdAndOwner(Long id, User owner);
}
