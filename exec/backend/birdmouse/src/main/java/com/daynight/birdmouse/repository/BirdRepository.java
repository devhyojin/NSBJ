package com.daynight.birdmouse.repository;

import com.daynight.birdmouse.domain.Bird;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BirdRepository extends JpaRepository<Bird, Integer> {
}
