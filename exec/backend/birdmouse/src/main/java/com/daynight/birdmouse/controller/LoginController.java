package com.daynight.birdmouse.controller;

import com.daynight.birdmouse.dto.Response;
import com.daynight.birdmouse.service.LoginService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RequiredArgsConstructor
@Controller
@RequestMapping("/login")
@Api(value = "Login with Google")
public class LoginController {

    private final LoginService loginService;

    /*
    프론트에서 로그인 요청 - 코드 전달은 해줄 예정
    https://kauth.kakao.com/oauth/authorize?client_id=c4e62099f8bdb6b35e2bee0fa3114ed7&redirect_uri=http://localhost:8080/login/kakao/callback&response_type=code

    @GetMapping("/kakao")
    @ApiOperation(value = "카카오 로그인 요청")
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
     */

    /*
    @GetMapping(value = "/google/callback")
    @ApiOperation(value = "(0) 로그인 후 코드 받기. 리다이렉트를 통해 자동 실행됨")
    public Object redirectGoogleLogin(@RequestParam String code) {
        Response result = Response.builder()
                .status(true)
                .message("구글 로그인 코드")
                .data(code)
                .build();

        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @GetMapping(value = "/token")
    @ApiOperation(value = "(1) 코드 입력 후 accessToken 발급")
    public Object getKakaoAccessToken(@ApiParam(value = "구글에서 발급받은 코드", required = true)
                                          @RequestParam String code) {
        Response result = loginService.getAccessToken(code);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    */


    @GetMapping(value = "/google")
    @ApiOperation(value = "GET user data from Google")
    public Object getGoogleProfile(
            @ApiParam(value = "GoogleID", example = "12345", required = true) @RequestParam String id,
            @ApiParam(value = "AccessToken from Google", example = "ab23cd", required = true) @RequestParam String token,
            @ApiParam(value = "Light/Dark", example = "light", required = true) @RequestParam String mode) {
  
        Response result = loginService.getGoogleProfile(id, token, mode);
        return new ResponseEntity<>(result, HttpStatus.OK);

    }

}
