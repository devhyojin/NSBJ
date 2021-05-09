package com.daynight.birdmouse.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoom {
    private long id;

    public static ChatRoom create(long id) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.id = id;
        return chatRoom;
    }
}

