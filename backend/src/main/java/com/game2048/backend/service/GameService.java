package com.game2048.backend.service;

import com.game2048.backend.dto.MoveRequestDTO;
import com.game2048.backend.dto.MoveResponseDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Service
public class GameService {
    private static final int TARGET = 2048;

    public MoveResponseDTO move(MoveRequestDTO moveRequest) {
        int[][] board = copyBoard(moveRequest.getBoard());
        long[] score = new long[]{moveRequest.getScore()};

        String direction = moveRequest.getMove();

        int[][] newBoard = switch (direction.toUpperCase()) {
            case "UP" -> moveUp(board, score);
            case "DOWN" -> moveDown(board, score);
            case "LEFT" -> moveLeft(board, score);
            case "RIGHT" -> moveRight(board, score);
            default -> board;
        };

        if (Arrays.deepEquals(board, newBoard)) {
            return new MoveResponseDTO(newBoard, score[0], "INVALID");
        }

        addRandomTile(newBoard);

        String status = checkGameStatus(newBoard);

        return new MoveResponseDTO(newBoard, score[0], status);
    }

    //MOVES
    private int[][] moveLeft(int[][] board, long[] score) {
        int n = board.length;
        int[][] newBoard = new int[n][n];

        for (int i = 0; i < n; i++) {
            int[] row = board[i];
            int[] compressed = compress(row);
            int[] merged = merge(compressed, score);
            newBoard[i] = compress(merged);
        }
        return newBoard;
    }

    private int[][] moveRight(int[][] board, long[] score) {
        reverseRows(board);
        board = moveLeft(board, score);
        reverseRows(board);
        return board;
    }

    private int[][] moveUp(int[][] board, long[] score) {
        board = transpose(board);
        board = moveLeft(board, score);
        board = transpose(board);
        return board;
    }

    private int[][] moveDown(int[][] board, long[] score) {
        board = transpose(board);
        board = moveRight(board, score);
        board = transpose(board);
        return board;
    }

    //Helpers
    private int[] compress(int[] row) {
        int[] newRow = new int[row.length];
        int index = 0;
        for (int val : row)
            if (val != 0) newRow[index++] = val;
        return newRow;
    }

    private int[] merge(int[] row, long[] score) {
        for (int i = 0; i < row.length - 1; i++) {
            if (row[i] != 0 && row[i] == row[i + 1]) {
                row[i] *= 2;
                score[0] += row[i];
                row[i + 1] = 0;
            }
        }
        return row;
    }

    private void reverseRows(int[][] board) {
        for (int[] row : board) {
            for (int i = 0, j = row.length - 1; i < j; i++, j--) {
                int tmp = row[i];
                row[i] = row[j];
                row[j] = tmp;
            }
        }
    }

    private int[][] transpose(int[][] board) {
        int n = board.length;
        int[][] newBoard = new int[n][n];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                newBoard[i][j] = board[j][i];
        return newBoard;
    }

    private int[][] copyBoard(int[][] board) {
        int[][] copy = new int[board.length][board.length];
        for (int i = 0; i < board.length; i++)
            copy[i] = Arrays.copyOf(board[i], board[i].length);
        return copy;
    }

    private void addRandomTile(int[][] board) {
        List<int[]> empty = new ArrayList<>();
        for (int i = 0; i < board.length; i++)
            for (int j = 0; j < board[i].length; j++)
                if (board[i][j] == 0) empty.add(new int[]{i, j});

        if (empty.isEmpty()) return;

        Random random = new Random();
        int[] pos = empty.get(random.nextInt(empty.size()));
        board[pos[0]][pos[1]] = random.nextDouble() < 0.9 ? 2 : 4;
    }

    private String checkGameStatus(int[][] board) {
        for (int[] row : board)
            for (int val : row)
                if (val == TARGET) return "WON";

        for (int[] row : board)
            for (int val : row)
                if (val == 0) return "IN_PROGRESS";

        if (!hasPossibleMove(board))
            return "LOST";

        return "IN_PROGRESS";
    }

    private boolean hasPossibleMove(int[][] board) {
        int n = board.length;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i < n - 1 && board[i][j] == board[i + 1][j]) return true;
                if (j < n - 1 && board[i][j] == board[i][j + 1]) return true;
            }
        }
        return false;
    }
}
