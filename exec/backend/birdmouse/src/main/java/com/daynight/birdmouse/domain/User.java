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
    private String badge;

    @Column(columnDefinition = "boolean default false")
    private boolean changed_nickname;
    @Column(columnDefinition = "integer default 0")
    private int profile_img;
    @Column(columnDefinition = "integer default 2") // 확성기는 기본 2개부터 주어짐
    private int megaphone_count;
    @Column(columnDefinition = "integer default 0")
    private int heart_count;
    @Column(columnDefinition = "integer default 0")
    private int clap_count;
    @Column(columnDefinition = "integer default 0")
    private int justice_count;
    @Column(columnDefinition = "boolean default false")
    private boolean has_left;
    @Column(columnDefinition = "integer default 0")
    private int region_id;
    @Column(columnDefinition = "integer default 0")
    private long animal_id;

}
