package com.daynight.birdmouse.repository;

import com.daynight.birdmouse.domain.Badge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BadgeRepository extends JpaRepository<Badge, Integer> {
}
