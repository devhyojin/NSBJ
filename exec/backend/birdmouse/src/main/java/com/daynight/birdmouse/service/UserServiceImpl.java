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

    /**
     * 사용자의 닉네임을 사용되지 않은 음식, 색, 동물 값으로 무작위하게 부여
     * @param mode light/dark
     * @return 새 닉네임이 부여된 유저 객체
     */
    @Override
    public Object getRandonNickname(String mode) {
        User user = new User();
        // 닉네임 생성 로직 = "음식"먹는 "~색" "동물"
        Random random = new Random();
        int FOODS = 1902;
        int COLORS = 125;
        int ANIMALS = 100;

        String nickname = "";
        String bird_name = "";
        String mouse_name = "";

        while (true) {
            int foodIdx = random.nextInt(FOODS + 1);
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

                mouse_name = nickname + " " + mouse.getMouse_name();
                bird_name = nickname + " " + bird.getBird_name();
                break;
            }
        }
        user.setBird_name(bird_name);
        user.setMouse_name(mouse_name);
//        userRepository.save(user);
        return user;
    }

    /**
     * 사용자의 마이페이지 정보를 불러옴
     * @param id 사용자의 id 값
     * @return 변경된 사용자의 데이터가 담긴 Response 객체 반환
     */
    @Transactional(readOnly = true)
    public Response getMypage(String id) {
        Optional<User> user_db = userRepository.findById(id);
        HashMap<String, Object> data = new HashMap<>();
        HashMap<String, Integer> feedback = new HashMap<>();
        HashMap<String, Object> nickname = new HashMap<>();

        if (user_db.isPresent()) {
            User user = user_db.get();

            feedback.put("angel_count", user.getAngel_count());
            feedback.put("heart_count", user.getHeart_count());
            feedback.put("judge_count", user.getJudge_count());

            nickname.put("light", user.getBird_name());
            nickname.put("dark", user.getMouse_name());

            data.put("id", user.getId());
            data.put("nickname", nickname);
            data.put("changed_nickname", user.isChanged_nickname());
            data.put("profile_img", user.getProfile_img());
            data.put("megaphone_count", user.getMegaphone_count());
            data.put("feedback", feedback);
            data.put("region", user.getRegion());
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

    /**
     * 사용자의 칭호 변경
     * @param id 사용자의 id
     * @param badge 사용자가 선택한 badge int 값
     * @return badge:{id:, badge_name:}가 담긴 Response 객체 반환
     */
    @Override
    public Response changeBadge(String id, Badge badge) {
        Optional<User> user_db = userRepository.findById(id);
        HashMap<String, Badge> changed_badge = new HashMap<>();
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

    /**
     * 사용자의 프로필 이미지 변경
     * @param id 사용자의 id
     * @param profile_img 사용자가 선택한 profile_img int 값
     * @return profile_img가 담긴 Response 객체 반환
     */
    @Override
    public Response changeProfileImg(String id, Integer profile_img) {
        Optional<User> user_db = userRepository.findById(id);
        HashMap<String, Integer> changed_profile_img = new HashMap<>();
        if (user_db.isPresent()) {
            User user = user_db.get();
            user.setProfile_img(profile_img);
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

    /**
     * 사용자가 닉네임을 변경
     * @param id 사용자의 id 값
     * @param mode light/dark
     * @return changed_nickname, nickname:{light: , dark: }가 담긴 Response 객체 반환
     */
    @Override
    public Response modifiedNickname(String id, String mode) {
        Optional<User> user_db = userRepository.findById(id);
        HashMap<String, Object> changed_nickname = new HashMap<>();
        if (user_db.isPresent()) {
            User user = user_db.get();
            if (!user.isChanged_nickname()) {
                Optional<Food> originalFood = foodRepository.findById(user.getFood().getId());
                Optional<Color> originalColor = colorRepository.findById(user.getColor().getId());
                Optional<Bird> originalBird = birdRepository.findById(user.getAnimal_id());
                Optional<Mouse> originalMouse = mouseRepository.findById(user.getAnimal_id());

                User newNickname = (User) getRandonNickname(mode);

                user.setFood(newNickname.getFood());
                user.setColor(newNickname.getColor());
                user.setAnimal_id(newNickname.getAnimal_id());
                user.setBird_name(newNickname.getBird_name());
                user.setMouse_name(newNickname.getMouse_name());
                user.setChanged_nickname(true);
                userRepository.save(user);

                if (originalFood.isPresent()) {
                    Food food = originalFood.get();
                    food.set_used(false);
                    foodRepository.save(food);
                }
                if (originalColor.isPresent()) {
                    Color color = originalColor.get();
                    color.set_used(false);
                    colorRepository.save(color);
                }
                if (originalBird.isPresent()){
                    Bird bird = originalBird.get();
                    bird.set_used(false);
                    birdRepository.save(bird);
                }
                if (originalMouse.isPresent()) {
                    Mouse mouse = originalMouse.get();
                    mouse.set_used(false);
                    mouseRepository.save(mouse);
                }

                changed_nickname.put("id", id);
                changed_nickname.put("changed_nickname", user.isChanged_nickname());

                HashMap<String, Object> nickname = new HashMap<>();
                nickname.put("light", user.getBird_name());
                nickname.put("dark", user.getMouse_name());

                changed_nickname.put("nickname", nickname);

                return Response.builder()
                        .status(true)
                        .message("닉네임 변경 성공")
                        .data(changed_nickname).build();
            } else {
                return Response.builder()
                        .status(false)
                        .message("닉네임 횟수 초과")
                        .data(null).build();
            }
        } else {
            return Response.builder()
                    .status(false)
                    .message("닉네임 사용자 정보 조회 실패")
                    .data(null).build();
        }
    }

    /**
     * 사용자 탈퇴하기
     * @param id 사용자의 id 값
     * @return data에는 null, status에는 true가 담긴 Response 객체 반환
     */
    @Override
    public Response withdrawUser(String id) {
        Optional<User> user_db = userRepository.findById(id);
        if (user_db.isPresent()) {
            User user = user_db.get();
            user.setHas_left(true);
            userRepository.save(user);

            Optional<Food> userFood = foodRepository.findById(user.getFood().getId());
            Optional<Color> userColor = colorRepository.findById(user.getColor().getId());
            Optional<Bird> userBird = birdRepository.findById(user.getAnimal_id());
            Optional<Mouse> userMouse = mouseRepository.findById(user.getAnimal_id());

            if (userFood.isPresent()) {
                Food food = userFood.get();
                food.set_used(false);
                foodRepository.save(food);
            }
            if (userColor.isPresent()) {
                Color color = userColor.get();
                color.set_used(false);
                colorRepository.save(color);
            }
            if (userBird.isPresent()){
                Bird bird = userBird.get();
                bird.set_used(false);
                birdRepository.save(bird);
            }
            if (userMouse.isPresent()) {
                Mouse mouse = userMouse.get();
                mouse.set_used(false);
                mouseRepository.save(mouse);
            }

            return Response.builder()
                    .status(true)
                    .message("사용자 탈퇴 성공")
                    .data(null).build();
        } else {
            return Response.builder()
                    .status(false)
                    .message("탈퇴를 위한 사용자 조회 실패")
                    .data(null).build();
        }
    }


}
