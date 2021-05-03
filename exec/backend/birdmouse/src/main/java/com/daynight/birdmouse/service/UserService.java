package com.daynight.birdmouse.service;

import com.daynight.birdmouse.dto.Response;

public interface UserService {
    public Object getRandonNickname(String mode);
    public Response getMypage(Long id);
    public Response changeBadge(Long id, Integer badge);
    public Response changeProfileImg(Long id, Integer profile_img);
    public Response modifiedNickname(Long id, String mode);
}




