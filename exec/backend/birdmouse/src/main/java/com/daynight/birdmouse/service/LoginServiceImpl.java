package com.daynight.birdmouse.service;

import com.daynight.birdmouse.domain.User;
import com.daynight.birdmouse.dto.KakaoProfileDto;
import com.daynight.birdmouse.dto.KakaoTokenDto;
import com.daynight.birdmouse.dto.Response;
import com.daynight.birdmouse.repository.*;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Objects;
import java.util.Optional;


@RequiredArgsConstructor
@Service
public class LoginServiceImpl implements LoginService{

    private final UserRepository userRepository;
    private final UserService userService;

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

            // DB에 유저 정보 저장
            userRepository.save(user);
            map.put("user", user);
            return Response.builder().status(true)
                    .message("성공! 신규 유저는 회원가입 진행")
                    .data(map).build();
        }

    }


}
