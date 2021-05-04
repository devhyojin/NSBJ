package com.daynight.birdmouse.service;

import com.daynight.birdmouse.dto.KakaoTokenDto;
import com.daynight.birdmouse.dto.Response;

public interface LoginService {

    public Response getAccessToken(String code);

    public Response getKakaoProfile(String accessToken, String dayNight);

    public Response getGoogleProfile(long id, String token, String mode);

}
