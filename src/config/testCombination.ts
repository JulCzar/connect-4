import { BoardState } from '../components/Board/config/types';
import { Color } from '../types';
import { testCombinationAt } from './testCombinationAt';
import { Combination } from './winningCoordinates';

export interface WinningCoordinates {
  row: number;
  column: number;
  combination: Combination;
  color: Color;
}

export function testCombination(
  Board: BoardState,
  combination: Combination
): WinningCoordinates | null {
  for (let row = 0; row < Board.length; row++) {
    for (let column = 0; column < Board[row].length; column++) {
      if (Board[row][column] !== null) {
        const color = testCombinationAt(Board, combination, row, column);

        if (color) {
          return { color, row, column, combination };
        }
      }
    }
  }

  return null;
}
