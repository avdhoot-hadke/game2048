package com.game2048.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MoveResponseDTO {
    private int[][] board;
    private long score;
    private String status;
}
