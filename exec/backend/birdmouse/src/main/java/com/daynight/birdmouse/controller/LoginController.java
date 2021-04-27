package com.daynight.birdmouse.controller;

import com.google.gson.Gson;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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

    @GetMapping
    @ApiOperation(value = "accessToken 요청")
    public String connectKakao() {
        String url = env.getProperty("spring.social.kakao.url.login") +
                "?client_id=" + clientId +
                "&redirect_uri=" + baseUrl + redirect +
                "&response_type=code";
        System.out.println(url);
        return url;
    }

}
