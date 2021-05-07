package com.daynight.birdmouse.controller;

import com.daynight.birdmouse.dto.ChatRoom;
import com.daynight.birdmouse.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@Controller
@RequestMapping("/chat")
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    /**
     * 지역방에 활성화 되어 있지 않은 상태에서 사용자가 채팅방을 생성함
     * @param id 지역 번호 region_id
     * @return chatRoomMap 객체 반환
     */
    @PostMapping("/room")
    @ResponseBody
    public ChatRoom createRoom(@RequestParam long id) {
        return chatRoomService.createChatRoom(id);
    }

    /**
     * 현재 위치에 해당되는 지역방 조회
     * @param id 지역 번호 region_id
     * @return chatRoomMap 객체 반환
     */
    @GetMapping("/room/{id}")
    @ResponseBody
    public ChatRoom roomInfo(@PathVariable long id) {
        return chatRoomService.findRoomById(id);
    }


}
