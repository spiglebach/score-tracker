package hu.spiglebach.scoretracker.model.entity.user;

import hu.spiglebach.scoretracker.model.entity.common.Auditable;
import hu.spiglebach.scoretracker.model.entity.player.PlayerSettings;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "user_settings")
@NoArgsConstructor
public class UserSettings extends Auditable {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "favourite_friend_id")
    private Long favouriteFriendId;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "nickname", column = @Column(name = "preferred_nickname")),
            @AttributeOverride(name = "backgroundColor", column = @Column(name = "preferred_background_color")),
            @AttributeOverride(name = "textColor", column = @Column(name = "preferred_text_color")),
    })
    private PlayerSettings playerSettings;

    public UserSettings(User user) {
        this.user = user;
        this.playerSettings = new PlayerSettings(user.getUsername(), "#000000", "#ffffff");
    }
}
