package com.game2048.backend.dto;

import lombok.Data;

import java.util.Set;

@Data
public class RegisterRequestDTO {
    private String username;
    private String password;
}
