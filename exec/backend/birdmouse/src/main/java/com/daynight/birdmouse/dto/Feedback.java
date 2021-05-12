package com.daynight.birdmouse.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Feedback {

    private int badge;
    private long region_id;

    private String sender_id;
    private String sender_bird;
    private String sender_mouse;

    private String receiver_id;
    private String receiver_bird;
    private String receiver_mouse;

    private String mode;
}
