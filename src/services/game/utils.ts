import { BOARD_HEIGHT, BOARD_WIDTH } from '../../config/constants';
import { Color } from '../../types';
import { persistentStorage } from '../persistorStorage';
import { BoardState, Dataset } from './types';

export const getInitialState = () => {
  const board: BoardState = [];

  for (let i = BOARD_HEIGHT; i; i--) {
    const row: Color[] = [];

    for (let j = BOARD_WIDTH; j; j--) row.push(Color.N);

    board.push(row);
  }

  return board;
};

const getColEmptyRows = (board: BoardState) => {
  const perColEmptyRows = [];

  for (let i = 0; i < board[0].length; i++) perColEmptyRows[i] = 0;

  for (const row of board)
    for (let i = 0; i < row.length; i++)
      if (row[i] === Color.N) perColEmptyRows[i]++;

  return perColEmptyRows;
};

export const getValidMove = (board: BoardState): number => {
  const perColEmptyRows = getColEmptyRows(board);

  try {
    const col = Math.floor(Math.random() * board[0].length);
    if (perColEmptyRows[col] > 0) return col;

    throw Error();
  } catch {
    return getValidMove(board);
  }
};

export const saveMoveForPlayer = (
  playerName: string,
  board: BoardState,
  move: number
) => {
  const moves = persistentStorage.getItem<Dataset>(playerName) ?? [];

  moves.push({ board, move });

  persistentStorage.setItem(playerName, moves);
};
