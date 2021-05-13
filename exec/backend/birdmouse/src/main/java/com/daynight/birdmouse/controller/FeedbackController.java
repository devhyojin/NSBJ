package com.daynight.birdmouse.controller;

import com.daynight.birdmouse.dto.Feedback;
import com.daynight.birdmouse.repository.RedisFeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@Controller
public class FeedbackController {

    private final RedisFeedbackRepository feedbackRepository;

    private final SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/chat/feedback")
    public void feedback(Feedback feedback) {

        System.out.println(feedback.toString());
        feedbackRepository.giveFeedback(feedback.getRegion_id(), feedback.getSender_id(), feedback.getReceiver_id(),
                feedback.getReceiver_bird(), feedback.getReceiver_mouse(), feedback.getFeedback_id());

        messagingTemplate.convertAndSend("/sub/chat/room/"+feedback.getRegion_id(), feedback);


    }
}
