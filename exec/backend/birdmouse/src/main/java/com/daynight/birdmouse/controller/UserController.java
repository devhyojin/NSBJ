package com.daynight.birdmouse.controller;

import com.daynight.birdmouse.dto.Response;
import com.daynight.birdmouse.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = { "*" })
@RequiredArgsConstructor
@Controller
@RequestMapping("/mypage")
@Api(value = "마이페이지 확인")
public class UserController {

    private final UserService userService;

    @GetMapping(value = "")
    @ApiOperation(value = "사용자의 마이페이지 정보 불러오기")
    public Object getMypage(@ApiParam(value = "user id", required = true)
                            @RequestParam Long id) {
        Response result = userService.getMypage(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PatchMapping(value = "/badge")
    @ApiOperation(value = "사용자의 칭호를 변경하기")
    public Object changeBadge(@ApiParam(value = "user_id", required = true)
                             @RequestParam Long id, int badge) {
        Response result = userService.changeBadge(id, badge);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PatchMapping(value = "/img")
    @ApiOperation(value = "사용자의 프로필 캐릭터를 변경하기")
    public Object changeProfileImg(@ApiParam(value = "user_id", required = true)
                             @RequestParam Long id, int profile_img) {
        Response result = userService.changeProfileImg(id, profile_img);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PatchMapping(value = "/nickname")
    @ApiOperation(value = "사용자의 닉네임을 변경하기")
    public Object changeNickname(@ApiParam(value = "user_id", required = true)
                                 @RequestParam Long id, String mode) {
        Response result = userService.modifiedNickname(id, mode);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PatchMapping(value = "/withdraw")
    @ApiOperation(value = "사용자 탈퇴하기")
    public Object changeNickname(@ApiParam(value = "user_id", required = true)
                                 @RequestParam Long id) {
        Response result = userService.withdrawUser(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }




}
