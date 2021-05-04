package com.daynight.birdmouse.repository;

import com.daynight.birdmouse.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

}
