package hu.spiglebach.scoretracker.repository;

import hu.spiglebach.scoretracker.model.entity.user.User;
import hu.spiglebach.scoretracker.model.entity.user.UserSettings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserSettingsRepository extends JpaRepository<UserSettings, Long> {

    Optional<UserSettings> findUserSettingsByUser(User user);

}
