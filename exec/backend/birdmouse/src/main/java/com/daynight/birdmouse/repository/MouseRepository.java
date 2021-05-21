package com.daynight.birdmouse.repository;

import com.daynight.birdmouse.domain.Mouse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MouseRepository extends JpaRepository<Mouse, Integer> {

//    List<Long> findAllIdByIs_usedIsFalse();

}
