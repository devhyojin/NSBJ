package com.daynight.birdmouse.controller;


import com.daynight.birdmouse.domain.User;
import com.daynight.birdmouse.dto.Response;
import com.daynight.birdmouse.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

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
}
