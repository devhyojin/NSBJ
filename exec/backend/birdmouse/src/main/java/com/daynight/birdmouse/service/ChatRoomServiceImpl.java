package com.daynight.birdmouse.service;

import com.daynight.birdmouse.dto.ChatRoom;
import com.daynight.birdmouse.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;

@RequiredArgsConstructor
@Service
public class ChatRoomServiceImpl implements ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    private Map<Long, ChatRoom> chatRoomMap;

    @PostConstruct
    private void init() {
        chatRoomMap = new LinkedHashMap<>();
    }

    public ChatRoom findRoomById(long id) {
        return chatRoomMap.get(id);
    }

    /**
     * @param id : 지역 아이디
     * @return 생성된 채팅방
     *
     * - 레디스의 채팅방 HSET에 유저의 아이디와 닉네임을 저장
     * - 채팅방 생성
     */
    public ChatRoom createChatRoom(long id) {
        ChatRoom chatRoom = ChatRoom.create(id);
        chatRoomMap.put(chatRoom.getId(), chatRoom);

        chatRoomRepository.createChatRoom(id, "region");

        return chatRoom;
    }

    /**
     *
     * @param region_id : 지역 아이디
     * @param user_id : 현재 입장하는 유저의 아이디
     * @param nickname : 현재 입장하는 유저의 닉네임
     * @return : 해당 채팅방의 채팅 내역 (하루치?)
     */
    @Override
    public Object registerUser(long region_id, String user_id, String nickname) {

        // 먼저 다른 지역에 등록돼 있는지 확인
        long currentRegion = chatRoomRepository.getUser(region_id, user_id);
        // 다른 지역에 있으면 해당 지역 채팅방에서 유저 정보 삭제
        if (currentRegion != 0) {
            chatRoomRepository.deleteUser(currentRegion, user_id);
        }
        // 현재 지역에 유저와 닉네임 등록
        chatRoomRepository.registerUser(region_id, user_id, nickname);
        // 현재 지역의 다른 유저리스트 조회
        Map<String, Object> userList = chatRoomRepository.getAllUsers(region_id);

        return userList;
    }

    @Override
    public List<ChatRoom> findAllRoom() {
        return chatRoomRepository.findAllRoom();
    }


}
