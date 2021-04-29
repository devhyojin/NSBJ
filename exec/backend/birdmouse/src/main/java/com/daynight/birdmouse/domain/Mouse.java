package com.daynight.birdmouse.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Mouse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String mouse_name;

    @Column(columnDefinition = "boolean default false")
    private boolean is_used;
}
