package com.game2048.backend.controller;

import com.game2048.backend.dto.MoveRequestDTO;
import com.game2048.backend.dto.MoveResponseDTO;
import com.game2048.backend.service.GameService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class GameController {

    private final GameService gameService;

    @PostMapping("/move")
    public ResponseEntity<MoveResponseDTO> gameMove(@RequestBody MoveRequestDTO moveRequest) {
        MoveResponseDTO response = gameService.move(moveRequest);
        return ResponseEntity.ok(response);
    }



}
