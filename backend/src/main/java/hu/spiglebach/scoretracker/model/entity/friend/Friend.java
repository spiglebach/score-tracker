package hu.spiglebach.scoretracker.model.entity.friend;

import hu.spiglebach.scoretracker.model.entity.common.AuditableWithId;
import hu.spiglebach.scoretracker.model.entity.player.PlayerSettings;
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
public class Friend extends AuditableWithId {

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "nickname", column = @Column(name = "friend_nickname")),
            @AttributeOverride(name = "backgroundColor", column = @Column(name = "friend_background_color")),
            @AttributeOverride(name = "textColor", column = @Column(name = "friend_text_color")),
    })
    private PlayerSettings playerSettings;

    @JoinColumn(name = "owner_user_id")
    @ManyToOne(optional = false)
    private User owner;

    @JoinColumn(name = "friend_user_id")
    @ManyToOne(optional = true)
    private User friend;

    public Friend(String friendNickname, String friendBackgroundColor, String friendTextColor, User owner, User friend) {
        this.playerSettings = new PlayerSettings(friendNickname, friendBackgroundColor, friendTextColor);
        this.owner = owner;
        this.friend = friend;
    }
}
