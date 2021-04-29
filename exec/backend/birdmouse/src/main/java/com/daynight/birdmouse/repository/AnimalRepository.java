package com.daynight.birdmouse.repository;

import com.daynight.birdmouse.domain.Mouse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalRepository extends JpaRepository<Mouse, Long> {

//    List<Long> findAllIdByIs_usedIsFalse();

}
