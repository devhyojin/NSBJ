package com.daynight.birdmouse.repository;

import com.daynight.birdmouse.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
//    Optional<User> findById(long user_id);
}
