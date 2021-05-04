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

    private final Environment env;
    private final RestTemplate restTemplate;
    private final Gson gson;
    private final UserRepository userRepository;
    private final UserService userService;

    // application.yml에서 필요한 정보 가져오기
    @Value("${spring.url.base}")
    private String baseUrl;
    @Value("${spring.social.kakao.client_id}")
    private String clientId;
    @Value("${spring.social.kakao.redirect}")
    private String redirect;

    /**
     * Send request to Kakao for accessToken on user
     * @param code Authorization code received from Kakao
     * @return SUCCESS = token / FAIL = null
     */
    @Override
    public Response getAccessToken(String code) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // Parameters
        // The parameters are the information about OUR SERVICE (=CLIENT)
        // Our information is in the application.yml
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("grant_type", "authorization_code");
        parameters.add("client_id", clientId);
        parameters.add("redirect_uri", baseUrl + redirect);
        parameters.add("code", code);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(parameters, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(Objects.requireNonNull(
                env.getProperty("spring.social.kakao.url.token")), request, String.class);


        if (response.getStatusCode() == HttpStatus.OK) {
            KakaoTokenDto tokenDto = gson.fromJson(response.getBody(), KakaoTokenDto.class);
            return Response.builder().status(true).message("SUCCESS getting access token").data(tokenDto).build();
        }
        // If response FAILED, return NULL
        return Response.builder().status(false).message("FAIL to get access token").data(null).build();
    }

    /**
     * 카카오에서 유저 정보 가져오기
     * @param accessToken 카카오에서 받은 토큰
     * @return 성공 = DB에 있으면 로그인, 없으면 회원가입(DB에 저장) / 실패 = null
     */
    @Override
    public Response getKakaoProfile(String accessToken, String mode) {

        // Header
        // 카카오에 요청보낼 때 accessToken을 헤더에 담아서 보내야함
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("Authorization", "Bearer " + accessToken);

        // HttpEntity & ResponseEntity
        // 1. HttpEntity를 이용해서 카카오에 요청을 보냄
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(null, headers);

        // 2. ResponseEntity를 통해서 응답 받기
        // env.getProperty => @Value를 통해서 application.yml에 있는 정보를 여기에 담을 수 있음
        ResponseEntity<String> response = restTemplate.postForEntity(Objects.requireNonNull(
                env.getProperty("spring.social.kakao.url.profile")), request, String.class);

        // 요청 성공:
        if (response.getStatusCode() == HttpStatus.OK) {
            // gson을 이용해서 받은 json 데이터를 자바 클래스 형식으로 변환
            KakaoProfileDto user_info = gson.fromJson(response.getBody(), KakaoProfileDto.class);

            Optional<User> foundUser = userRepository.findById(user_info.getId());
            // HashMap을 통해서 key:value 형태로 데이터 저장 (response의 data 부분 형식에 맞춰보내기 위함)
            HashMap<String, Object> map = new HashMap<>();

            // 우리 디비에 있는 유저는 로그인 진행 (accessToken만 저장)
            if (foundUser.isPresent()) {
                User user = foundUser.get();
                user.setToken(accessToken);
                userRepository.save(user);
                map.put("user", user);
                return Response.builder()
                        .status(true)
                        .message("SUCCESS! LOGIN enrolled user")
                        .data(map).build();
            }

            // 우리 DB에 없는 유저라면 회원가입 (DB에 저장)
            else {
                // 유저에 랜덤 닉네임을 먼저 받아오고 나서 회원번호, 토큰 등 저장
                User user = (User) userService.getRandonNickname(mode);
                user.setId(user_info.getId());
                user.setToken(accessToken);

                // 확성기의 기본 개수는 2
                user.setMegaphone_count(2);

                // DB에 유저 정보 저장
                userRepository.save(user);
                map.put("user", user);
                return Response.builder().status(true)
                        .message("성공! 신규 유저는 회원가입 진행")
                        .data(map).build();
            }

            // 카카오에서 데이터 받기 실패한 경우 null과 status = false 보냄
        } else {
            return Response.builder().status(false).message("실패! 유저 데이터를 가져오지 못했습니다.").data(null).build();
        }
    }

    @Override
    public Response getGoogleProfile(long id, String token, String mode) {

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
