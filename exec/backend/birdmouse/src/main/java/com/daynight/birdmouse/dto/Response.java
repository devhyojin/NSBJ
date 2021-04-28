package com.daynight.birdmouse.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;

public class Response {
    @ApiModelProperty(value = "status", position = 0)
    public boolean status;

    @ApiModelProperty(value = "message", position = 1)
    public String message;

    @ApiModelProperty(value = "data", position = 2)
    public Object data;

    @Builder
    public Response(boolean status, String message, @JsonProperty("data") Object data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
