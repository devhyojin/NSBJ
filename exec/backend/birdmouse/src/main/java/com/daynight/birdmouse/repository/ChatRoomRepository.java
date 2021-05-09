package com.daynight.birdmouse.repository;

import com.daynight.birdmouse.dto.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
}
