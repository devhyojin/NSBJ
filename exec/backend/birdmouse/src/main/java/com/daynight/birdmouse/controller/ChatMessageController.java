package com.daynight.birdmouse.controller;

import com.daynight.birdmouse.domain.User;
import com.daynight.birdmouse.dto.ChatMessage;
import com.daynight.birdmouse.repository.RedisChatMessageRepository;
import com.daynight.birdmouse.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@Controller
public class ChatMessageController {

    private final RedisChatMessageRepository redisChatMessageRepository;
    private final UserRepository userRepository;

    private final SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {
        Optional<User> found_user = userRepository.findById(message.getSender_id());
        if (found_user.isPresent()) {
            User user = found_user.get();
            message.setBadge(user.getBadge().getBadge_name());
            message.setMouse_name(user.getMouse_name());
            message.setBird_name(user.getBird_name());
            message.setProfile_img(user.getProfile_img());
        }

        // 입장 환영 메세지
        // 모드에 따라 새/쥐 닉네임이 뜬다
        // 로그에 안남게 확성기 처럼 입장했습니다만 잠깐 뜨기
        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
            if (message.getMode().equals("light")) {
                message.setMessage(message.getBird_name() + "님이 입장하셨습니다.");
            } else {
                message.setMessage(message.getMouse_name() + "님이 입장하셨습니다.");
            }

        }
        // 확성기
//        else if (ChatMessage.MessageType.ANNOUNCE.equals(message.getType())) {
//            message.setMessage(message.getMessage());
//        }

        // 일반 채팅 입력
        else {
            redisChatMessageRepository.saveChatLog(message);
        }
        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getRoom_id(), message);
    }

    @MessageMapping("/chat/feedback")
    public void feedback() {

    }
}
