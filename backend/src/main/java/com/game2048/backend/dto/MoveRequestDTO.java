package com.game2048.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MoveRequestDTO {
    private int[][] board;
    private long score;
    private String move;
}
