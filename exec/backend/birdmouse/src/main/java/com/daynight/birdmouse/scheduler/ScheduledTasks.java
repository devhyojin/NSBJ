package com.daynight.birdmouse.scheduler;

import com.daynight.birdmouse.domain.User;
import com.daynight.birdmouse.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Component
public class ScheduledTasks {

    private static final Logger logger = LoggerFactory.getLogger(ScheduledTasks.class);
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/M/d HH:mm:ss");

    private final UserRepository userRepository;

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
        logger.info("{}명의 닉네임 변경 횟수가 초기화 되었습니다 - {}", user_list.size(),dateFormat.format(new Date()));
    }

    @Scheduled(cron = "0 0 0 1 JAN,APR,JUL,OCT *")
    public void deleteLeftUser() {
        List<User> user_list = userRepository.findAllByHas_leftIsTrue();
        for (User user : user_list) {
            userRepository.delete(user);
        }
        logger.info("{}명의 유저 정보가 삭제되었습니다 - {}", user_list.size(),dateFormat.format(new Date()));
    }
}
