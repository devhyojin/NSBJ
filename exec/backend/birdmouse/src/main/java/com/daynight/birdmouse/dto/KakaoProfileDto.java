package com.daynight.birdmouse.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.util.HashMap;


@Getter
@Setter
@ToString
public class KakaoProfileDto {

    private long id;
    private HashMap<String, Object> kakao_account;

}
