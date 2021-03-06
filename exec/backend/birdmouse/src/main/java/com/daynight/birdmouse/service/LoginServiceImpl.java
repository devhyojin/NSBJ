package com.daynight.birdmouse.service;

import com.daynight.birdmouse.domain.Badge;
import com.daynight.birdmouse.domain.Region;
import com.daynight.birdmouse.domain.User;
import com.daynight.birdmouse.dto.Response;
import com.daynight.birdmouse.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Optional;


@RequiredArgsConstructor
@Service
public class LoginServiceImpl implements LoginService{

    private final UserRepository userRepository;
    private final UserService userService;
    private final BadgeRepository badgeRepository;
    private final RegionRepository regionRepository;
    final Logger logger = LoggerFactory.getLogger(LoginServiceImpl.class);

    /**
     * 구글에서 회원정보를 받아서 로그인/회원가입을 하는 메서드
     * @param id : 사용자의 구글 id
     * @param token : 구글에서 발급받은 토큰
     * @param mode : light/dark
     * @return 있는 유저는 로그인/없는 유저는 회원가입
     */
    @Override
    public Response getGoogleProfile(String id, String token, String mode) {

        Optional<User> foundUser = userRepository.findById(id);
        // HashMap을 통해서 key:value 형태로 데이터 저장 (response의 data 부분 형식에 맞춰보내기 위함)
        HashMap<String, Object> map = new HashMap<>();

        // 우리 디비에 있는 유저는 로그인 진행 (accessToken만 저장)
        if (foundUser.isPresent()) {
            User user = foundUser.get();
            user.setToken(token);
            userRepository.save(user);
            map.put("user", user);
            
            logger.info("기존 유저 - 로그인 진행");
            
            return Response.builder()
                    .status(true)
                    .message("성공! 기존 유저는 로그인 진행")
                    .data(map).build();
        }

        // 우리 DB에 없는 유저라면 회원가입 (DB에 저장)
        else {
            // 유저에 랜덤 닉네임을 먼저 받아오고 나서 회원번호, 토큰 등 저장
            User user = (User) userService.getRandonNickname(mode);
            user.setId(id);
            user.setToken(token);

            // 확성기의 기본 개수는 2
            user.setMegaphone_count(2);

            // 기본 뱃지 0
            Optional<Badge> zeroBadge = badgeRepository.findById(0);
            if (zeroBadge.isPresent()) {
                Badge badge = zeroBadge.get();
                user.setBadge(badge);
            }

            // 기본 지역 0
            Optional<Region> zeroRegion = regionRepository.findById(0L);
            if (zeroRegion.isPresent()) {
                Region region = zeroRegion.get();
                user.setRegion(region);
            }

            // DB에 유저 정보 저장
            userRepository.save(user);
            map.put("user", user);
            
            logger.info("신규 유저 - 회원가입 진행");
            
            return Response.builder().status(true)
                    .message("성공! 신규 유저는 회원가입 진행")
                    .data(map).build();
        }

    }


}
