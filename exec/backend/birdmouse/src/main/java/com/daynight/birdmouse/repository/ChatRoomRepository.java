package com.daynight.birdmouse.repository;

import com.daynight.birdmouse.dto.ChatRoom;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class ChatRoomRepository {

    final Logger logger = LoggerFactory.getLogger(ChatRoomRepository.class);

    private HashOperations hashOperations;

    public ChatRoomRepository(StringRedisTemplate redisTemplate) {
        this.hashOperations = redisTemplate.opsForHash();
    }

    /**
     * 지역 채팅방에 유저:닉네임 등록
     *
     * @param regionId : 지역 아이디
     * @param userId   : 유저의 아이디
     * @param nickname : 현재 유저의 닉네임 => set이라서 아이디는 냅두고 계속 값은 업데이트 가능
     */
    public void registerUser(long regionId, String userId, String nickname) {
        hashOperations.put("room" + regionId, userId, nickname);
        hashOperations.put("user", userId, regionId + "");
        logger.info(String.format("[%d지역] 채팅방에 [유저%s:%s] 등록 완료", regionId, userId, nickname));
    }

    /**
     * 지역 채팅방의 모든 유저 리스트 조회
     *
     * @param regionId :지역 아이디
     * @return 지역 아이디에 등록된 유저 리스트
     */
    public Map<String, Object> getAllUsers(long regionId) {
        logger.info(String.format("[%s지역] 채팅방 조회", regionId));
        return hashOperations.entries("room" + regionId);
    }

    /**
     * 지역 채팅방에서 유저 삭제 (=나가기)
     *
     * @param regionId : 지역 아이디
     * @param userId   : 해당 지역에 등록된 유저 아이디
     */
    public void deleteUser(long regionId, String userId) {
        hashOperations.delete("room" + regionId, userId);
        logger.info(String.format("[%d지역] 채팅방에서 [유저%s] 나가기 완료", regionId, userId));
    }

    /**
     * 유저의 채팅방 등록 정보 조회
     *
     * @param regionId : 지역 아이디
     * @param userId   : 유저 아이디
     * @return 채팅방 정보가 없거나, 현재 채팅방에 그대로 있는 거라면 0 리턴
     * 기존 채팅방정보와 새로 들어가려는 채팅방 정보가 다르면 해당 채팅방의 번호 리턴
     */
    public long getUser(long regionId, String userId) {
        boolean checkStatus = hashOperations.hasKey("user", userId);
        if (!checkStatus) {
            logger.info("채팅방에 등록되지 않은 유저");
            return 0;
        } else {
            long region = Long.parseLong((String) hashOperations.get("user", userId));
            if (region == regionId) {
                logger.info("기존 채팅방 잔류");
                return 0;
            } else {
                logger.info(String.format("[%d지역] 채팅방에 등록된 유저", region));
                return region;
            }
        }
    }

    /**
     * 채팅방 생성
     * @param regionId : 지역아이디
     * @param regionName : 지역의 한글 이름
     */
    public void createChatRoom(long regionId, String regionName) {
        hashOperations.put("room", regionId + "", regionName);
    }

    /**
     * 모든 채팅방 리스트로 가져오기
     * 아빠프로그래머 예제에 필요해서 추가한거
     * @return List of chatrooms
     */
    public List<ChatRoom> findAllRoom() {
        List<ChatRoom> chatRooms = new ArrayList<>();
        Map rooms = hashOperations.entries("room");
        for (Object id : rooms.keySet()) {
            long tmp = Long.parseLong((String) id);
            System.out.println(tmp);
            ChatRoom room = new ChatRoom(tmp);
            chatRooms.add(room);
        }
        return chatRooms;
    }

}
