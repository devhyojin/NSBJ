package com.daynight.birdmouse.repository;

import com.daynight.birdmouse.domain.ChatLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatLogRepository extends JpaRepository<ChatLog, Integer> {

}
