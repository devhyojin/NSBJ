package com.daynight.birdmouse.service;

import com.daynight.birdmouse.dto.ChatMessage;
import com.daynight.birdmouse.dto.ChatRoom;
import com.daynight.birdmouse.repository.RedisChatMessageRepository;
import com.daynight.birdmouse.repository.RedisChatRoomRepository;
import com.daynight.birdmouse.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;

@RequiredArgsConstructor
@Service
public class ChatRoomServiceImpl implements ChatRoomService {

    private final RedisChatRoomRepository redisChatRoomRepository;
    private final UserRepository userRepository;
    private final RedisChatMessageRepository redisChatMessageRepository;


    /**
     * @param id : 지역 아이디
     * @return 생성된 채팅방
     *
     * - 레디스의 채팅방 HSET에 유저의 아이디와 닉네임을 저장
     * - 채팅방 생성
     */
    public ChatRoom createChatRoom(long id) {
        ChatRoom chatRoom = ChatRoom.create(id);

        redisChatRoomRepository.createChatRoom(id, "region");

        return chatRoom;
    }

    /**
     *
     * @param region_id : 지역 아이디
     * @param user_id : 현재 입장하는 유저의 아이디
     */
    @Override
    public void registerUser(long region_id, String user_id) {

        // 유저의 닉네임 정보 불러오기
        String bird_name = userRepository.findBirdNameByID(user_id);
        String mouse_name = userRepository.findMouseNameByID(user_id);

        // exception
        if (bird_name == null) {
            System.out.println("no such user");
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
        // 현재 지역의 다른 유저리스트 조회
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
