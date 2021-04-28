package com.daynight.birdmouse.service;

import com.daynight.birdmouse.domain.User;
import com.daynight.birdmouse.dto.KakaoProfileDto;
import com.daynight.birdmouse.dto.KakaoTokenDto;
import com.daynight.birdmouse.dto.Response;
import com.daynight.birdmouse.repository.UserRepository;
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
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class LoginServiceImpl implements LoginService{

    private final Environment env;          // application.yml에 접근
    private final RestTemplate restTemplate;
    private final Gson gson;                // json 변환용
    private final UserRepository userRepository;

    // application.yml에서 가져올 값들 설정
    @Value("${spring.url.base}")
    private String baseUrl;
    @Value("${spring.social.kakao.client_id}")
    private String clientId;
    @Value("${spring.social.kakao.redirect}")
    private String redirect;

    /**
     * 카카오에서 유저 접근을 위한 accessToken 에 대한 요청을 보내는 메서드
     * @param code 카카오에서 전달 받는 코드
     * @return Response 객체로 결과 리턴
     */
    @Override
    public Response getAccessToken(String code) {
        // Header
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // Parameters
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("grant_type", "authorization_code");
        parameters.add("client_id", clientId);
        parameters.add("redirect_uri", baseUrl + redirect);
        parameters.add("code", code);

        // HttpEntity
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(parameters, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(env.getProperty("spring.social.kakao.url.token"), request, String.class);

        // 토큰 발급 성공하면 토큰을 리턴
        if (response.getStatusCode() == HttpStatus.OK) {
            KakaoTokenDto tokenDto = gson.fromJson(response.getBody(), KakaoTokenDto.class);
            return Response.builder().status(true).message("토큰 발급 성공").data(tokenDto).build();
        }
        // 토큰 발급 실패시 null 리턴
        return Response.builder().status(false).message("토큰 발급 실패").data(null).build();
    }

    @Override
    public Response getKakaoProfile(String accessToken) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(null, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(env.getProperty("spring.social.kakao.url.profile"), request, String.class);

        // 정보 가져오기 성공
        if (response.getStatusCode() == HttpStatus.OK) {
            KakaoProfileDto user_info = gson.fromJson(response.getBody(), KakaoProfileDto.class);
            Optional<User> foundUser = userRepository.findById(user_info.getId());
            HashMap<String, Object> map = new HashMap<>();

            // 기존 회원 = 로그인 진행
            if (foundUser.isPresent()) {
                User user = foundUser.get();
                user.setToken(accessToken);
                userRepository.save(user);
                map.put("user", user);
                return Response.builder()
                        .status(true)
                        .message("기존 회원은 로그인 진행")
                        .data(map).build();
            }

            // 없는 회원 = 회원가입
            else {
                User user = new User();
                user.setId(user_info.getId());
                userRepository.save(user);

                return Response.builder().status(true).message("신규 회원은 회원가입 진행")
                        .data(user).build();
            }

            // 정보 가져오기 실패
        } else {
            return Response.builder().status(false).message("카카오 정보 가져오기 실패").data(null).build();
        }
    }
}
