package com.daynight.birdmouse.controller;

import com.daynight.birdmouse.domain.Region;
import com.daynight.birdmouse.dto.ChatRoom;
import com.daynight.birdmouse.dto.Response;
import com.daynight.birdmouse.repository.RegionRepository;
import com.daynight.birdmouse.service.ChatRoomService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@Controller
@RequestMapping("/chat")
public class ChatRoomController {

    private final ChatRoomService chatRoomService;
    private final RegionRepository regionRepository;

    /**
     * 현재 지역에 유저 등록 및 채팅방의 사용자 리스트 조회
     * @param region_id
     * @param user_id
     * @return
     */
    @ApiOperation(value = "현재 지역 채팅방에 유저 등록")
    @PostMapping("/roar/{region_id}")
    @ResponseBody
    public Object registerUser(@PathVariable long region_id, @RequestParam String user_id) {

        // 지역 채팅방이 존재하는지 확인. 없으면 생성. 있으면 do nothing
        chatRoomService.createChatRoom(region_id);

        // 지역 채팅방의 한글 이름 확인
        String region_name = null;
        Optional<Region> found_region = regionRepository.findById(region_id);
        if (found_region.isPresent()) {
            region_name = found_region.get().getRegion_name();
        }

        // 유저 등록
        chatRoomService.registerUser(region_id, user_id);

        // 현재 지역의 유저 리스트 조회
        List<HashMap<String, Object>> user_list = chatRoomService.findAllUser(region_id);

        // return data 포맷에 맞게 가공하기
        HashMap<String, Object> data = new HashMap<>();
        data.put("neighbor", user_list);
        data.put("region_id", region_id);
        data.put("region_name", region_name);
        data.put("count", user_list.size());

        Response result = Response.builder()
                .status(true)
                .message(String.format("[%s] 채팅방에 [유저 %s] 등록 완료", region_name, user_id))
                .data(data)
                .build();

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "지역 채팅방 입장")
    @GetMapping("/room/enter/{regionId}")
    public String roomDetail(Model model, @PathVariable long regionId) {
        model.addAttribute("roomId", regionId+"");
        return "/chat/roomdetail";
    }

}
