package hu.spiglebach.scoretracker.model.entity.security;

import hu.spiglebach.scoretracker.model.entity.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "refresh_token")
@NoArgsConstructor
public class RefreshToken {

    @Id
    @Column(name = "owner_id")
    private Long ownerId;

    @Column(name = "refresh_token")
    private String refreshToken;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "owner_id")
    private User owner;

    public RefreshToken(String refreshToken, User owner) {
        this.refreshToken = refreshToken;
        this.owner = owner;
    }
}
