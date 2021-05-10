package com.daynight.birdmouse.repository;

import com.daynight.birdmouse.dto.ChatMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class RedisChatMessageRepository {

    final Logger logger = LoggerFactory.getLogger(RedisChatRoomRepository.class);

    private final ListOperations<String, String> listOperations;

    public RedisChatMessageRepository(StringRedisTemplate redisTemplate) {
        this.listOperations = redisTemplate.opsForList();
    }

    public void saveChatLog(ChatMessage message) {
        listOperations.rightPushAll("LOG"+message.getRoomId(), message.toString());
        logger.info(message.toString());
    }
}
