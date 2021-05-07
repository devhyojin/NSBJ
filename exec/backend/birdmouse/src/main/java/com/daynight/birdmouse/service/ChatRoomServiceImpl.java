package com.daynight.birdmouse.service;

import com.daynight.birdmouse.dto.ChatRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;

@RequiredArgsConstructor
@Service
public class ChatRoomServiceImpl implements ChatRoomService {

    private Map<Long, ChatRoom> chatRoomMap;

    @PostConstruct
    private void init() {
        chatRoomMap = new LinkedHashMap<>();
    }

    public ChatRoom findRoomById(long id) {
        return chatRoomMap.get(id);
    }

    public ChatRoom createChatRoom(long id) {
        ChatRoom chatRoom = ChatRoom.create(id);
        chatRoomMap.put(chatRoom.getId(), chatRoom);
        return chatRoom;
    }

}
