import { BoardState } from '../components/Board/config/types';
import { Color } from '../types';
import { Combination } from './winningCoordinates';

export function testCombinationAt(
  board: BoardState,
  combination: Combination,
  row: number,
  col: number
): Color {
  const cell = board[row][col];

  for (const [x, y] of combination) {
    const nextRow = row + x;
    const nextColumn = col + y;

    if (!board[nextRow] || !board[nextRow][nextColumn]) return Color.N;

    if (cell !== board[nextRow][nextColumn]) return Color.N;
  }

  return cell;
}
