package hu.spiglebach.scoretracker.model.entity.friend;

import hu.spiglebach.scoretracker.model.entity.AuditableEntity;
import hu.spiglebach.scoretracker.model.entity.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "friend")
@NoArgsConstructor
public class Friend extends AuditableEntity {

    @Column(name = "friend_nickname")
    private String friendNickname;

    @Column(name = "friend_background_color")
    private String friendBackgroundColor;

    @Column(name = "friend_text_color")
    private String friendTextColor;

    @JoinColumn(name = "owner_user_id")
    @ManyToOne(optional = false)
    private User owner;

    @JoinColumn(name = "friend_user_id")
    @ManyToOne(optional = true)
    private User friend;

    public Friend(String friendNickname, String friendBackgroundColor, String friendTextColor, User owner, User friend) {
        this.friendNickname = friendNickname;
        this.friendBackgroundColor = friendBackgroundColor;
        this.friendTextColor = friendTextColor;
        this.owner = owner;
        this.friend = friend;
    }
}
