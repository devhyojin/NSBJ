package com.daynight.birdmouse.service;
import com.daynight.birdmouse.dto.ChatRoom;

import java.util.HashMap;
import java.util.List;

public interface ChatRoomService {
    //    void findRegionChatRoom(long id);
    ChatRoom findRoomById(long id);
    ChatRoom createChatRoom(long id);
    void registerUser(long region_id, String user_id);
    List<ChatRoom> findAllRoom();

    List<HashMap<String, Object>> findAllUser(long region_id);

}
