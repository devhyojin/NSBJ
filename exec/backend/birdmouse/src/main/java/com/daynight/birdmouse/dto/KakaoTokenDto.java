package com.daynight.birdmouse.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KakaoTokenDto {
    private String token_type;
    private String access_token;
    private int expires_in;
    private String refresh_token;
    private int refresh_token_expires_in;
    private String scope;
}
