package com.daynight.birdmouse.service;

import com.daynight.birdmouse.domain.*;
import com.daynight.birdmouse.dto.Response;
import com.daynight.birdmouse.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Optional;
import java.util.Random;

@RequiredArgsConstructor
@Service
@Transactional
public class UserServiceImpl implements UserService{

    private final FoodRepository foodRepository;
    private final ColorRepository colorRepository;
    private final BirdRepository birdRepository;
    private final MouseRepository mouseRepository;
    private final UserRepository userRepository;

    @Override
    public Object getRandonNickname(String mode) {
        User user = new User();
        // 닉네임 생성 로직 = "음식"먹는 "~색" "동물"
        Random random = new Random();
        int FOODS = 1902;
        int COLORS = 125;
        int ANIMALS = 100;

        String nickname = "";

        while (true) {
            int foodIdx = random.nextInt(FOODS + 1);
            System.out.println("foodIdx: "+foodIdx);
            Optional<Food> foundFood = foodRepository.findById(foodIdx);
            if (foundFood.isPresent() && !foundFood.get().is_used()) {
                Food food = foundFood.get();
                food.set_used(true);
                user.setFood(food);
                foodRepository.save(food);
                nickname += food.getFood_name() + " 먹는 ";
                break;
            }
        }

        while (true) {
            int colorIdx = random.nextInt(COLORS + 1);
            Optional<Color> foundColor = colorRepository.findById(colorIdx);
            if (foundColor.isPresent() && !foundColor.get().is_used()) {
                Color color = foundColor.get();
                color.set_used(true);
                user.setColor(color);
                colorRepository.save(color);
                nickname += color.getColor_name();
                break;
            }
        }
        while (true) {
            int animalIdx = random.nextInt(ANIMALS + 1);
            Optional<Bird> foundBird = birdRepository.findById(animalIdx);
            if (foundBird.isPresent() && !foundBird.get().is_used()) {
                Bird bird = foundBird.get();
                bird.set_used(true);
                Mouse mouse = mouseRepository.findById(animalIdx).get();
                mouse.set_used(true);

                user.setAnimal_id(animalIdx);
                birdRepository.save(bird);
                mouseRepository.save(mouse);

                if (mode.equals("light")) {
                    nickname += " " + bird.getBird_name();
                } else {
                    nickname += " " + mouse.getMouse_name();
                }
                break;
            }
        }
        user.setNickname(nickname);
        return user;
    }


    @Transactional(readOnly = true)
    public Response getMypage(Long id) {
        Optional<User> user_db = userRepository.findById(id);
        HashMap<String, Object> data = new HashMap<>();
        HashMap<String, Integer> feedback = new HashMap<>();

        if (user_db.isPresent()) {
            User user = user_db.get();

            feedback.put("angle_count", user.getAngle_count());
            feedback.put("heart_count", user.getHeart_count());
            feedback.put("judge_count", user.getJudge_count());

            data.put("id", user.getId());
            data.put("nickname", user.getNickname());
            data.put("changed_nickname", user.isChanged_nickname());
            data.put("profile_img", user.getProfile_img());
            data.put("megaphone_count", user.getMegaphone_count());
            data.put("feedback", feedback);
            data.put("region_id", user.getRegion_id());
            data.put("badge", user.getBadge());

            return Response.builder()
                    .status(true)
                    .message("마이페이지 조회")
                    .data(data)
                    .build();
        } else {
            return Response.builder()
                    .status(false)
                    .message("마이페이지 조회 실패")
                    .data(null).build();
        }
    }

    @Override
    public Response changeBadge(Long id, Integer badge) {
        Optional<User> user_db = userRepository.findById(id);
        HashMap<String, Integer> changed_badge = new HashMap<>();
        if (user_db.isPresent()) {
            User user = user_db.get();
            user.setBadge(badge);
            userRepository.save(user);
            changed_badge.put("badge", badge);
            return Response.builder()
                    .status(true)
                    .message("칭호 변경 성공")
                    .data(changed_badge).build();
        } else {
            return Response.builder()
                    .status(false)
                    .message("칭호 변경 실패")
                    .data(null).build();
        }
    }

    @Override
    public Response changeProfileImg(Long id, Integer profile_img) {
        Optional<User> user_db = userRepository.findById(id);
        HashMap<String, Integer> changed_profile_img = new HashMap<>();
        if (user_db.isPresent()) {
            User user = user_db.get();
            user.setBadge(profile_img);
            userRepository.save(user);
            changed_profile_img.put("profile_img", profile_img);
            return Response.builder()
                    .status(true)
                    .message("프로필 캐릭터 변경 성공")
                    .data(changed_profile_img).build();
        } else {
            return Response.builder()
                    .status(false)
                    .message("프로필 캐릭터 변경 실패")
                    .data(null).build();
        }
    }


}
