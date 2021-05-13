package com.daynight.birdmouse.controller;

import com.daynight.birdmouse.dto.Response;
import com.daynight.birdmouse.service.LoginService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin(origins = { "*" })
@RequiredArgsConstructor
@Controller
@RequestMapping("/login")
@Api(value = "Login with Google")
public class LoginController {

    private final LoginService loginService;

    @GetMapping(value = "/google")
    @ApiOperation(value = "GET user data from Google")
    public Object getGoogleProfile(
            @ApiParam(value = "GoogleID", example = "12345", required = true) @RequestParam String id,
            @ApiParam(value = "AccessToken from Google", example = "ab23cd", required = true) @RequestParam String token,
            @ApiParam(value = "Light/Dark", example = "light", required = true) @RequestParam String mode) {
  
        Response result = loginService.getGoogleProfile(id, token, mode);
        return new ResponseEntity<>(result, HttpStatus.OK);

    }

}
