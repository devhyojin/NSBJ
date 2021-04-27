package com.daynight.birdmouse.controller;

import com.daynight.birdmouse.domain.User;
import com.daynight.birdmouse.dto.KakaoProfileDto;
import com.daynight.birdmouse.dto.KakaoTokenDto;
import com.daynight.birdmouse.dto.Response;
import com.google.gson.Gson;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Controller
@RequestMapping("/login")
@Api(value = "소셜 로그인 관리")
public class LoginController {

    private final Environment env;
    private final RestTemplate restTemplate;
    private final Gson gson;

    @Value("${spring.url.base}")
    private String baseUrl;

    @Value("${spring.social.kakao.client_id}")
    private String clientId;

    @Value("${spring.social.kakao.redirect}")
    private String redirect;

    @GetMapping("/kakao")
    @ApiOperation(value = "authorization code 요청")
    public Object connectKakao() {
        String url = env.getProperty("spring.social.kakao.url.login") +
                "?client_id=" + clientId +
                "&redirect_uri=" + baseUrl + redirect +
                "&response_type=code";
        Response result = Response.builder()
                .status(true)
                .message("카카오 로그인 요청")
                .data(url)
                .build();

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping(value = "/kakao/callback")
    public Object redirectKakaoLogin(@RequestParam String code) {
        System.out.println("kakao code: "+code);

        Response result = Response.builder()
                .status(true)
                .message("카카오 로그인 코드")
                .data(code)
                .build();

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping(value = "/token")
    public Object getKakaoAccessToken(String code) {
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
        if (response.getStatusCode() == HttpStatus.OK) {
            return new ResponseEntity<>(gson.fromJson(response.getBody(), KakaoTokenDto.class), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping(value = "/info")
    public Object getKakaoProfile(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("Authorization", "Bearer " + accessToken);

        System.out.println(headers.toString());

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(null, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(env.getProperty("spring.social.kakao.url.profile"), request, String.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            return new ResponseEntity<>(gson.fromJson(response.getBody(), KakaoProfileDto.class), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

//    @PostMapping(value = "/signup")
//    public Object enrollUser(@RequestParam String accessToken) {
//        User user = new User();
//        user.se
//    }

}
