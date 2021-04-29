package com.daynight.birdmouse.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String food_name;

    @Column(columnDefinition = "boolean default false")
    private boolean is_used;
}
