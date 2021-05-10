package com.daynight.birdmouse.controller;

import com.daynight.birdmouse.dto.ChatMessage;
import com.daynight.birdmouse.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@Controller
public class ChatMessageController {

    private final ChatMessageRepository chatMessageRepository;

    private final SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {
        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
            message.setMessage(message.getSender() + "님이 입장하셨습니다.");
        }
//        else {
//            chatMessageRepository.saveChatLog(message);
//        }
        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
    }
}
