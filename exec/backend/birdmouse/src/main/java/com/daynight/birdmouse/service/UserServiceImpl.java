package com.daynight.birdmouse.service;

import com.daynight.birdmouse.domain.*;
import com.daynight.birdmouse.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService{

    private final FoodRepository foodRepository;
    private final ColorRepository colorRepository;
    private final BirdRepository birdRepository;
    private final MouseRepository mouseRepository;
    private final UserRepository userRepository;

    @Override
    public Object getRandonNickname() {
        User user = new User();
        // 닉네임 생성 로직 = "음식"먹는 "~색" "동물"
        Random random = new Random();
        int FOODS = 1902;
        int COLORS = 125;
        int ANIMALS = 100;

        while (true) {
            int foodIdx = random.nextInt(FOODS + 1);
            Optional<Food> foundFood = foodRepository.findById(foodIdx);
            if (foundFood.isPresent() && !foundFood.get().is_used()) {
                Food food = foundFood.get();
                food.set_used(true);
                user.setFood(food);
                foodRepository.save(food);
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
                break;
            }
        }
        userRepository.save(user);
        return user;
    }
}
