package com.daynight.birdmouse.service;

import com.daynight.birdmouse.dto.Response;

public interface UserService {
    Object getRandonNickname(String mode);
    Response getMypage(String id);
    Response changeBadge(String id, Integer badge);
    Response changeProfileImg(String id, Integer profile_img);
    Response modifiedNickname(String id, String mode);
    Response withdrawUser(String id);
}




