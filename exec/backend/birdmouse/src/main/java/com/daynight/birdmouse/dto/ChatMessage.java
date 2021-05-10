package com.daynight.birdmouse.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChatMessage {
    public enum MessageType { ENTER, TALK, ANNOUNCE }

    private MessageType type; // 메시지 타입
    private long roomId; // 방번호
    private String sender; // 메시지 보낸사람
    private String message; // 메시지
}
