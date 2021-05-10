package com.daynight.birdmouse.repository;

import com.daynight.birdmouse.domain.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, String> {

    @Query("SELECT u.bird_name FROM User u where u.id = :id")
    String findBirdNameByID(@Param("id") String id);

    @Query("SELECT u.mouse_name FROM User u where u.id = :id")
    String findMouseNameByID(@Param("id") String id);

}
