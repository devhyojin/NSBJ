package com.daynight.birdmouse.repository;

import com.daynight.birdmouse.domain.Color;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColorRepository extends JpaRepository<Color, Integer> {
}
