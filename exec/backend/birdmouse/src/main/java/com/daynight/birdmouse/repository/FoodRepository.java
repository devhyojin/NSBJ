package com.daynight.birdmouse.repository;

import com.daynight.birdmouse.domain.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food, Integer> {
}
