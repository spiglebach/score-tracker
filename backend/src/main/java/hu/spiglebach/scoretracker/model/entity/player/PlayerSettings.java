package hu.spiglebach.scoretracker.model.entity.player;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Embeddable
@NoArgsConstructor
public class PlayerSettings {
    protected String nickname;
    protected String backgroundColor;
    protected String textColor;

    public PlayerSettings(String nickname, String backgroundColor, String textColor) {
        this.nickname = nickname;
        this.backgroundColor = backgroundColor;
        this.textColor = textColor;
    }
}
