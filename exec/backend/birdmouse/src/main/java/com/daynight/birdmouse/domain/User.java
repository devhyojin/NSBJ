package com.daynight.birdmouse.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class User {

    @Id
    private long id;    // 카카오 회원번호를 PK로 쓰기 때문에 Generated Value 설정 X

    private String token;
    private String nickname;
    private boolean changed_nickname;
    private int profile_img;
    private int megaphone_count;
    private int heart_count;
    private int clap_count;
    private int justice_count;
    private boolean has_left;
    private int region_id;
    private String badge;
    private long animal_id;

}
