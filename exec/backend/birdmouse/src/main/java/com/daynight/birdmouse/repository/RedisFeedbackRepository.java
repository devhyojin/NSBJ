package com.daynight.birdmouse.repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;
import springfox.documentation.spring.web.json.Json;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class RedisFeedbackRepository {

    final ObjectMapper objectMapper = new ObjectMapper();
    final Logger logger = LoggerFactory.getLogger(RedisChatRoomRepository.class);

    private final HashOperations<String, Object, Object> hashOperations;

    public RedisFeedbackRepository(StringRedisTemplate redisTemplate) {
        this.hashOperations = redisTemplate.opsForHash();
    }

    public void giveFeedback(long region_id, String sender_id, String receiver_id,
                             String receiver_bird, String receiver_mouse, int badge) {

        HashMap<String, Object> receiver = new HashMap<>();
        receiver.put("receiver_bird", receiver_bird);
        receiver.put("receiver_mouse", receiver_mouse);
        receiver.put("badge", badge);

        try {
            String saveReceiver = objectMapper.writeValueAsString(receiver);
            hashOperations.put("room" + region_id + ";" + sender_id, region_id, saveReceiver);
            logger.info(String.format("[%d 지역]에서 [유저%s]가 [유저%s]에게 피드백", region_id, sender_id, receiver_id));

        } catch (JsonProcessingException e) {
            logger.error(e.getMessage());
        }
    }

    public int getGivenFeedback(long region_id, String sender_id, String receiver_id,
                                                          String receiver_bird) {

        int badge = 0;

        boolean checkStatus = hashOperations.hasKey("room" + region_id + ";" + sender_id, receiver_id);
        // 이미 준 적이 있다면 현재 닉네임과 기존 닉네임이 같은지 확인
        if (checkStatus) {
            String str_receiver = (String) hashOperations.get(String.format("room%d;%s", region_id, sender_id), receiver_id);
            try {
                HashMap receiver_info = objectMapper.readValue(str_receiver, HashMap.class);
                // 현재 닉이랑 기존 닉이 같다면 기존 뱃지 리턴
                if (receiver_info.get("receiver_bird").equals(receiver_bird)) {
                    badge = (int) receiver_info.get("badge");
                }
            } catch (JsonProcessingException e) {
                logger.error(e.getMessage());
            }
        }

        return badge;
    }

}
