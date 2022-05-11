import { BoardState } from '../services/game/types';
import { Color } from '../types';
import { testCombinationAt } from './testCombinationAt';
import { Combination } from './winningCoordinates';

export interface WinningCoordinates {
  row: number;
  col: number;
  color: Color;
  combination: Combination;
}

export function testCombination(
  board: BoardState,
  combination: Combination
): WinningCoordinates | null {
  for (let row = 0; row < board.length; row++)
    for (let col = 0; col < board[row].length; col++)
      if (board[row][col] !== null) {
        const color = testCombinationAt(board, combination, row, col);

        if (color) return { color, row, col, combination };
      }

  return null;
}
