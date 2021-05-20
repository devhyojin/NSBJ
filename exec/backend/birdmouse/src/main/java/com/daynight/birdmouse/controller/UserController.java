package com.daynight.birdmouse.controller;

import com.daynight.birdmouse.domain.Badge;
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
    public Object getMypage(@ApiParam(value = "user_id", required = true, example = "1234567890")
                            @RequestParam String user_id) {
        Response result = userService.getMypage(user_id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PatchMapping(value = "/badge")
    @ApiOperation(value = "사용자의 칭호를 변경하기")
    public Object changeBadge(@RequestParam(value = "user_id", required = true) String user_id,
                              @RequestParam(value = "badge", required = true) Badge badge) {
        Response result = userService.changeBadge(user_id, badge);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PatchMapping(value = "/img")
    @ApiOperation(value = "사용자의 프로필 캐릭터를 변경하기")
    public Object changeProfileImg(@RequestParam(value = "user_id", required = true) String user_id,
                                   @RequestParam(value = "profile_img", required = true) int profile_img) {
        Response result = userService.changeProfileImg(user_id, profile_img);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PatchMapping(value = "/nickname")
    @ApiOperation(value = "사용자의 닉네임을 변경하기")
    public Object changeNickname(@RequestParam(value = "user_id", required = true) String user_id,
                                 @RequestParam(value = "mode", required = true) String mode){
        Response result = userService.modifiedNickname(user_id, mode);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PatchMapping(value = "/withdraw")
    @ApiOperation(value = "사용자 탈퇴하기")
    public Object changeNickname(@ApiParam(value = "user_id", required = true, example = "12345")
                                 @RequestParam String user_id) {
        Response result = userService.withdrawUser(user_id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }




}
