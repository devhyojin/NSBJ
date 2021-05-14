package com.daynight.birdmouse.controller;

import com.daynight.birdmouse.domain.Region;
import com.daynight.birdmouse.dto.Response;
import com.daynight.birdmouse.repository.RedisFeedbackRepository;
import com.daynight.birdmouse.repository.RegionRepository;
import com.daynight.birdmouse.service.ChatRoomService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
@Controller
@RequestMapping("/chat")
public class ChatRoomController {

    private final ChatRoomService chatRoomService;
    private final RegionRepository regionRepository;
    private final RedisFeedbackRepository feedbackRepository;

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

        // 현재 지역의 유저 리스트 조회
        List<HashMap<String, Object>> user_list = chatRoomService.findAllUser(region_id);

        // 유저 등록
        chatRoomService.registerUser(region_id, user_id);

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
    @GetMapping("region/{region_id}")
    public Object enterChatRoom(@PathVariable long region_id) {
        List<HashMap<String, Object>> chat_log = chatRoomService.getChatLog(region_id);
        Response result = Response.builder()
                .status(true)
                .message(String.format("%d 채팅방 입장", region_id))
                .data(chat_log)
                .build();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "유저의 피드백 확인")
    @GetMapping("/{region_id}/{receiver_id}")
    public Object getUserFeedback(@PathVariable long region_id, @PathVariable String receiver_id,
                                  String sender_id, String receiver_bird) {
        int feedback_id = feedbackRepository.getGivenFeedback(region_id, sender_id, receiver_id, receiver_bird);
        HashMap<String, Integer> map = new HashMap<>();
        map.put("feedback_id", feedback_id);
        Response result = Response.builder()
                .status(true)
                .message(String.format("%s 유저의 피드백 기록 조회 성공", receiver_id))
                .data(map)
                .build();

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "피드백 테스트용 api. 받은 사람의 feedback_id를 0으로 변경 가능")
    @PatchMapping("/test")
    public Object changeFeedbackId(@RequestParam long room_id, @RequestParam String sender_id, @RequestParam String receiver_id) {
        String tmp = feedbackRepository.changeFeedback(room_id, sender_id, receiver_id);
        Response result = Response.builder().status(true).message(tmp).data(tmp).build();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}
