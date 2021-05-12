package com.daynight.birdmouse.service;
import com.daynight.birdmouse.dto.ChatMessage;
import com.daynight.birdmouse.dto.ChatRoom;

import java.util.HashMap;
import java.util.List;

public interface ChatRoomService {

    ChatRoom createChatRoom(long id);
    void registerUser(long region_id, String user_id);
    List<HashMap<String, Object>> findAllUser(long region_id);
    List<HashMap<String, Object>> getChatLog(long region_id);
}
