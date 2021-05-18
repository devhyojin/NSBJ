package com.daynight.birdmouse.repository;

import com.daynight.birdmouse.domain.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {

    @Query("SELECT u FROM User u where u.changed_nickname = true")
    List<User> findByChanged_nicknameIsTrue();

    @Query("SELECT u FROM User u where u.has_left = true ")
    List<User> findAllByHas_leftIsTrue();

}
