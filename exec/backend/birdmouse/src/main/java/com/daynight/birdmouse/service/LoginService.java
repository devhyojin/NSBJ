package com.daynight.birdmouse.service;

import com.daynight.birdmouse.dto.Response;

public interface LoginService {

//    public Response getAccessToken(String code);
//    public Response getKakaoProfile(String accessToken, String dayNight);

    Response getGoogleProfile(String id, String token, String mode);

}
