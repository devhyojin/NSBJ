package com.daynight.birdmouse.scheduler;

import com.daynight.birdmouse.domain.ChatLog;
import com.daynight.birdmouse.domain.User;
import com.daynight.birdmouse.repository.ChatLogRepository;
import com.daynight.birdmouse.repository.RedisChatMessageRepository;
import com.daynight.birdmouse.repository.RedisChatRoomRepository;
import com.daynight.birdmouse.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@RequiredArgsConstructor
@Component
public class ScheduledTasks {

    private static final Logger logger = LoggerFactory.getLogger(ScheduledTasks.class);
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/M/d HH:mm:ss");

    private final UserRepository userRepository;
    private final RedisChatMessageRepository chatMessageRepository;
    private final RedisChatRoomRepository chatRoomRepository;
    private final ChatLogRepository chatLogRepository;

    /**
     * 매일 밤 12시 정각에 닉네임 변경 횟수를 초기화
     */
    @Scheduled(cron = "0 0 0 * * *")
    public void updateNicknameChangeStatus() {

        List<User> user_list = userRepository.findByChanged_nicknameIsTrue();
        for (User user : user_list) {
            user.setChanged_nickname(false);
            userRepository.save(user);
        }
        logger.info("{}명의 닉네임 변경 횟수가 초기화 되었습니다 - {}", user_list.size(), dateFormat.format(new Date()));
    }

    /**
     * 3개월에 한번씩 탈퇴 유저의 정보 삭제
     */
    @Scheduled(cron = "0 0 0 1 JAN,APR,JUL,OCT *")
    public void deleteLeftUser() {
        List<User> user_list = userRepository.findAllByHas_leftIsTrue();
        for (User user : user_list) {
            userRepository.delete(user);
        }
        logger.info("{}명의 유저 정보가 삭제되었습니다 - {}", user_list.size(), dateFormat.format(new Date()));
    }

    /**
     * 매일 밤 12시 정각에 오늘 하루의 채팅 로그를 MySQL에 저장
     * 이후 레디스에서 해당 로그 삭제
     */
    @Scheduled(cron = "0 0 0 * * *")
    public void saveChatLog() {
        // 존재하는 모든 채팅방의 지역번호를 가져온다
        List<Long> region_list = chatRoomRepository.getAllChatRoom();

        // 각 지역 채팅방의 오늘자 로그를 찾아온다
        for (long region_id : region_list) {
            List<HashMap<String, Object>> region_log = chatMessageRepository.getChatLog(region_id);

            // 오늘자 로그가 존재한다면 MySQL에 저장
            if (!region_log.isEmpty()) {
                ChatLog log = new ChatLog();
                log.setLog(region_log.toString());
                log.setDate(dateFormat.format(new Date()));
                log.setRegion_id(region_id);
                chatLogRepository.save(log);

                // MySQL 저장 후 오늘자 로그는 삭제
                chatMessageRepository.deleteChatLog(region_id);
            }

        }
    }
}
