package com.daynight.birdmouse.controller;

import com.daynight.birdmouse.dto.ChatRoom;
import com.daynight.birdmouse.dto.Response;
import com.daynight.birdmouse.service.ChatRoomService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@Controller
@RequestMapping("/chat")
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    /**
     * 지역방에 활성화 되어 있지 않은 상태에서 사용자가 채팅방을 생성함
     *
     * @param region_id 지역 번호 region_id
     * @return chatRoomMap 객체 반환
     */
    @ApiOperation(value = "채팅방 생성")
    @PostMapping("/room")
    @ResponseBody
    public ChatRoom createRoom(@RequestParam long region_id) {
        return chatRoomService.createChatRoom(region_id);
    }

//    /**
//     * 현재 위치에 해당되는 지역방 조회
//     *
//     * @param id 지역 번호 region_id
//     * @return chatRoomMap 객체 반환
//     */
//    @GetMapping("/room/{id}")
//    @ResponseBody
//    public ChatRoom roomInfo(@PathVariable long id) {
//        return chatRoomService.findRoomById(id);
//    }

    /**
     * 현재 지역에 유저 등록 및 채팅방의 사용자 리스트 조회
     */
    @ApiOperation(value = "현재 지역 채팅방에 유저 등록")
    @GetMapping("/room/{regionId}")
    @ResponseBody
    public Object registerUser(@PathVariable long regionId, @RequestParam String userId, @RequestParam String nickname) {

        Map<String, Object> userList = (Map<String, Object>) chatRoomService.registerUser(regionId, userId, nickname);
        Response result = Response.builder()
                .status(true)
                .message(String.format("[%d지역] 채팅방에 [유저 %s] 등록 완료", regionId, userId))
                .data(userList)
                .build();

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "지역 채팅방 입장")
    @GetMapping("/room/enter/{regionId}")
    public String roomDetail(Model model, @PathVariable long regionId) {
        model.addAttribute("roomId", regionId+"");
        return "/chat/roomdetail";
    }

    @ApiOperation(value = "채팅방 리스트 보기?")
    @GetMapping("/room")
    public String rooms(Model model) {
        return "/chat/room";
    }

    @ApiOperation(value = "채팅방 리스트 보기. 우리는 필요 없는 코드")
    @GetMapping("/rooms")
    @ResponseBody
    public List<ChatRoom> rooms() {
        return chatRoomService.findAllRoom();
    }
}
