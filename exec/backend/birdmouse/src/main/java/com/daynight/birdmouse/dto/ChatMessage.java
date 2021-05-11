package com.daynight.birdmouse.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
public class ChatMessage {
    public enum MessageType { ENTER, TALK, ANNOUNCE }

    private MessageType type;   // 메시지 타입
    private long room_id;       // 방번호
    private String message;     // 메시지
    private String sent_at;       // 보낸 날짜
    private String sender_id;   // 메시지 보낸사람

    private String bird_name;   // 보낸 사람 닉네임
    private String mouse_name;

    private String badge;       // 보낸 사람의 현재 칭호
    private int profile_img;    // 보낸 사람의 프로필 인덱스

    private String mode;

    @Override
    public String toString() {

        return "type=" + type + ";" +
                "room_id=" + room_id + ";" +
                "message=" + message + ";" +
                "sent_at=" + sent_at + ";" +
                "sender_id=" + sender_id + ";" +
                "bird_name=" + bird_name + ";" +
                "mouse_name=" + mouse_name + ";" +
                "badge=" + badge + ";" +
                "profile_img=" + profile_img + ";" +
                "mode=" + mode;

    }
}
