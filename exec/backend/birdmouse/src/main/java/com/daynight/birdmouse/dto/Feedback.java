package com.daynight.birdmouse.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Feedback {

    private int feedback_id;
    private long region_id;

    private String sender_id;

    private String receiver_id;
    private String receiver_bird;
    private String receiver_mouse;

    private String mode;
}
