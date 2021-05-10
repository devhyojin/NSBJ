package com.daynight.birdmouse.service;
import com.daynight.birdmouse.dto.ChatRoom;

import java.util.List;

public interface ChatRoomService {
    //    void findRegionChatRoom(long id);
    ChatRoom findRoomById(long id);
    ChatRoom createChatRoom(long id);
    Object registerUser(long region_id, String user_id, String nickname);
    List<ChatRoom> findAllRoom();

}
