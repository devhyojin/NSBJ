package com.daynight.birdmouse.service;
import com.daynight.birdmouse.dto.ChatRoom;

public interface ChatRoomService {
    //    void findRegionChatRoom(long id);
    ChatRoom findRoomById(long id);
    ChatRoom createChatRoom(long id);
}
