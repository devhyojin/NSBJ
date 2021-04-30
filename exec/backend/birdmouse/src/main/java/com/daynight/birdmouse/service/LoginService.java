package com.daynight.birdmouse.service;

import com.daynight.birdmouse.dto.KakaoTokenDto;
import com.daynight.birdmouse.dto.Response;

public interface LoginService {
    // 카카오에서 유저에 대한 accessToken 요청
    public Response getAccessToken(String code);
    
    // 유저의 카카오 정보 수집
    public Response getKakaoProfile(String accessToken);

}
