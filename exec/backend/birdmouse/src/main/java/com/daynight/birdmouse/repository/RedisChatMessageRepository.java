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

    /**
     * 채팅 로그 저장
     * => json형식의 message를 ObjectMapper를 통해 String으로 변환 후 레디스에 저장
     * => 레디스에는 LIST 형식으로 저장됨
     * @param message : 유저 한명이 입력한 채팅메세지
     */
    public void saveChatLog(ChatMessage message) {
        try {
            String saveMessage = objectMapper.writeValueAsString(message);
            listOperations.rightPushAll("LOG"+message.getRoom_id(), saveMessage);
            logger.info("LOG"+message.getRoom_id() + ":" + message.toString());
        } catch (JsonProcessingException e) {
            logger.error(e.getMessage());
        }

    }

    /**
     * 특정 채팅방의 채팅 로그를 반환
     * => 레디스에서 채팅방의 로그를 가져온다 (초반엔 List<String> 형태)
     * => 로그 하나하나가 String 형태이기 때문에 ChatMessage 타입으로 다시 변환 후 List<HashMap> 형태로 반환한다
     * => (ObjectMapper를 이용해 String을 다시 json으로 변환)
     * @param region_id : 채팅방의 번호 = 지역번호
     * @return List 형식으로 메세지 반환
     */
    public List<HashMap<String, Object>> getChatLog(long region_id) {
        logger.info(String.format("[%d 지역] 채팅방의 채팅로그 가져오는 중", region_id));
        List<String> string_log = listOperations.range("LOG" + region_id, 0, -1);
        List<HashMap<String, Object>> returning_log = new ArrayList<>();

        if (string_log.size() > 0) {
            for (String log : string_log) {
                try {
                    HashMap<String, Object> map = objectMapper.readValue(log, new TypeReference<HashMap<String, Object>>() {
                        @Override
                        public Type getType() {
                            return super.getType();
                        }
                    });
                    returning_log.add(map);
                } catch (JsonProcessingException e) {
                    logger.info(e.getMessage());
                }
            }
        } else {
            logger.info(String.format("[%d 지역] 채팅방의 로그가 없습니다.", region_id));
        }

        return returning_log;
    }
}
