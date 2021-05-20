package com.daynight.birdmouse.service;

import com.daynight.birdmouse.domain.Region;
import com.daynight.birdmouse.domain.User;
import com.daynight.birdmouse.dto.ChatMessage;
import com.daynight.birdmouse.dto.ChatRoom;
import com.daynight.birdmouse.repository.RedisChatMessageRepository;
import com.daynight.birdmouse.repository.RedisChatRoomRepository;
import com.daynight.birdmouse.repository.RegionRepository;
import com.daynight.birdmouse.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.swing.text.html.Option;
import java.util.*;

@RequiredArgsConstructor
@Service
public class ChatRoomServiceImpl implements ChatRoomService {

    private final RedisChatRoomRepository redisChatRoomRepository;
    private final UserRepository userRepository;
    private final RedisChatMessageRepository redisChatMessageRepository;
    private final RegionRepository regionRepository;
    final Logger logger = LoggerFactory.getLogger(RedisChatRoomRepository.class);

    /**
     * 채팅방 생성
     * => 레디스에 채팅방 정보 등록
     * @param region_id :지역번호 (채팅방 pk)
     */
    public void createChatRoom(long region_id) {
        ChatRoom chatRoom = ChatRoom.create(region_id);
        Optional<Region> found_region = regionRepository.findById(region_id);
        found_region.ifPresent(region -> redisChatRoomRepository.createChatRoom(region_id, region.getRegion_name()));
    }

    /**
     * 지역 채팅방에 유저 등록
     * => 현재 유저가 등록된 채팅방이 있다면 해당 채팅방에서 정보 삭제 후 새로운 채팅방에 정보 입력
     * @param region_id : 지역번호 (채팅방 pk)
     * @param user_id : 유저번호
     */
    @Override
    public int registerUser(long region_id, String user_id) {

        int entered = 0;

        Optional<User> found_user = userRepository.findById(user_id);
        if (found_user.isPresent()) {
            User user = found_user.get();

            // 유저의 닉네임 정보 불러오기
            String bird_name = user.getBird_name();
            String mouse_name = user.getMouse_name();

            // 먼저 다른 지역에 등록돼 있는지 확인
            long currentRegion = redisChatRoomRepository.getUser(region_id, user_id);

            // 기존 지역인 경우
            if ((int) currentRegion == 1) {

                // 닉네임 변경 여부 확인
                String nickname = redisChatRoomRepository.getUserNickname(region_id, user_id);
                String[] nicknames = nickname.split(";");

                if (!bird_name.equals(nicknames[0])) {
                    bird_name = nicknames[0];
                    mouse_name = nicknames[1];
                    
                    // 닉네임 재등록
                    redisChatRoomRepository.registerUser(region_id, user_id, bird_name, mouse_name);
                    entered = 0;
                } else {
                    entered = 1;
                }
            }
            // 다른 지역에 있으면 해당 지역 채팅방에서 유저 정보 삭제
            else if (currentRegion > 2L) {
                redisChatRoomRepository.deleteUser(currentRegion, user_id);
            }
            // 아무지역에 등록되지 않은 유저는 그냥 진행

            // 현재 지역에 유저와 닉네임 등록
            redisChatRoomRepository.registerUser(region_id, user_id, bird_name, mouse_name);
            Optional<Region> found_region = regionRepository.findById(region_id);

            // functional representation
            found_region.ifPresent(user::setRegion);
            userRepository.save(user);

            logger.info(String.format("%s 지역에 유저 %s 등록 완료", found_region.get().getRegion_name(), user_id));
        }
        else {
            logger.info("%s 유저 정보를 찾을 수 없습니다.");
        }
        return entered;

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
     * @param region_id : 로그를 확인하려는 채팅방의 번호
     * @return : 채팅방의 대화내역
     */
    @Override
    public List<HashMap<String, Object>> getChatLog(long region_id) {


        return redisChatMessageRepository.getChatLog(region_id);
    }


}
