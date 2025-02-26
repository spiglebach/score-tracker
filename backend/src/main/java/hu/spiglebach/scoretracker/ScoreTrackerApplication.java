package hu.spiglebach.scoretracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableTransactionManagement
@SpringBootApplication
public class ScoreTrackerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ScoreTrackerApplication.class, args);
    }

}
