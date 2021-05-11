package com.daynight.birdmouse.repository;

import com.daynight.birdmouse.dto.ChatMessage;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@Repository
public class RedisChatMessageRepository {

    final ObjectMapper objectMapper = new ObjectMapper();
    final Logger logger = LoggerFactory.getLogger(RedisChatRoomRepository.class);

    private final ListOperations<String, String> listOperations;

    public RedisChatMessageRepository(StringRedisTemplate redisTemplate) {
        this.listOperations = redisTemplate.opsForList();
    }

    public void saveChatLog(ChatMessage message) {
        try {
            String saveMessage = objectMapper.writeValueAsString(message);
            listOperations.rightPushAll("LOG"+message.getRoom_id(), saveMessage);
            logger.info(message.toString());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

    }

    public List<HashMap<String, Object>> getChatLog(long region_id) {
        List<String> string_log = listOperations.range("LOG" + region_id, 0, -1);
        List<HashMap<String, Object>> chatlog = new ArrayList<>();

        if (string_log.size() > 0) {
            for (String log : string_log) {
                try {
                    HashMap<String, Object> map = objectMapper.readValue(log, new TypeReference<HashMap<String, Object>>() {
                        @Override
                        public Type getType() {
                            return super.getType();
                        }
                    });
                    chatlog.add(map);
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }
            }
        } else {
            System.out.println("Empty Log!");
        }

        return chatlog;
    }
}
