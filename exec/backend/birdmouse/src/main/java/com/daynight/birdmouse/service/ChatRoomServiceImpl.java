package com.daynight.birdmouse.service;

import com.daynight.birdmouse.dto.ChatMessage;
import com.daynight.birdmouse.dto.ChatRoom;
import com.daynight.birdmouse.repository.RedisChatMessageRepository;
import com.daynight.birdmouse.repository.RedisChatRoomRepository;
import com.daynight.birdmouse.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;

@RequiredArgsConstructor
@Service
public class ChatRoomServiceImpl implements ChatRoomService {

    private final RedisChatRoomRepository redisChatRoomRepository;
    private final UserRepository userRepository;
    private final RedisChatMessageRepository redisChatMessageRepository;
    final Logger logger = LoggerFactory.getLogger(RedisChatRoomRepository.class);

    /**
     * 채팅방 생성
     * => DB에 채팅방 정보 등록
     * @param region_id :지역번호 (채팅방 pk)
     * @return ChatRoom 객체
     */
    public ChatRoom createChatRoom(long region_id) {
        ChatRoom chatRoom = ChatRoom.create(region_id);
        redisChatRoomRepository.createChatRoom(region_id, "region");
        return chatRoom;
    }

    /**
     * 지역 채팅방에 유저 등록
     * => 현재 유저가 등록된 채팅방이 있다면 해당 채팅방에서
     * @param region_id : 지역번호 (채팅방 pk)
     * @param user_id : 유저번호
     */
    @Override
    public void registerUser(long region_id, String user_id) {

        // 유저의 닉네임 정보 불러오기
        String bird_name = userRepository.findBirdNameByID(user_id);
        String mouse_name = userRepository.findMouseNameByID(user_id);

        // exception
        if (bird_name == null) {
            logger.info("%s 유저 정보를 찾을 수 없습니다.");
        }

        // 먼저 다른 지역에 등록돼 있는지 확인
        long currentRegion = redisChatRoomRepository.getUser(region_id, user_id);
        // 다른 지역에 있으면 해당 지역 채팅방에서 유저 정보 삭제
        if (currentRegion != 0) {
            redisChatRoomRepository.deleteUser(currentRegion, user_id);
        }
        // 현재 지역에 유저와 닉네임 등록
        redisChatRoomRepository.registerUser(region_id, user_id, bird_name, mouse_name);
    }

    /**
     * 현재 채팅방의 유저 리스트 조회
     * @param region_id : 지역 아이디
     * @return List of user nicknames
     */
    @Override
    public List<HashMap<String, Object>> findAllUser(long region_id) {
        return redisChatRoomRepository.getAllUsers(region_id);
    }

    /**
     * 채팅방 입장 시 기존 저장된 내역 조회
     * @param region_id
     * @return
     */
    @Override
    public List<HashMap<String, Object>> getChatLog(long region_id) {
        return redisChatMessageRepository.getChatLog(region_id);
    }


}
