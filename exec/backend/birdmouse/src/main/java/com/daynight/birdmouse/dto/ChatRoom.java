package com.daynight.birdmouse.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoom {
    private long id;

    public static ChatRoom create(long id) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.id = id;
        return chatRoom;
    }
}

