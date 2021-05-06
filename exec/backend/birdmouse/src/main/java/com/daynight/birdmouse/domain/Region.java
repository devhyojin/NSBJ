package com.daynight.birdmouse.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Region {

    @Id
    private long id;
    private String region_name;
}
