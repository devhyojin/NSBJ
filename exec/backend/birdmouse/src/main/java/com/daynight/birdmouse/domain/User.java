package com.daynight.birdmouse.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@Setter
@DynamicUpdate
public class User {

    @Id
    private String id;    // 카카오 회원번호를 PK로 쓰기 때문에 Generated Value 설정 X
    private String token;

    private String bird_name;
    private String mouse_name;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(columnDefinition = "integer default 0")
    private Badge badge;


    @Column(columnDefinition = "boolean default false")
    private boolean changed_nickname;
    @Column(columnDefinition = "integer default 0")
    private int profile_img;
    @Column(columnDefinition = "integer default 2") // 확성기는 기본 2개부터 주어짐
    private int megaphone_count;
    @Column(columnDefinition = "integer default 0")
    private int heart_count;
    @Column(columnDefinition = "integer default 0")
    private int angel_count;
    @Column(columnDefinition = "integer default 0")
    private int judge_count;
    @Column(columnDefinition = "boolean default false")
    private boolean has_left;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(columnDefinition = "integer default 0")
    private Region region;

    @Column(columnDefinition = "integer default 0")
    private int animal_id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(referencedColumnName = "id")
    private Food food;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(referencedColumnName = "id")
    private Color color;

}
