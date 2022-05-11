import { BOARD_HEIGHT, BOARD_WIDTH } from '../../config/constants';
import { Color } from '../../types';
import { BoardState } from './types';

export const getInitialState = () => {
  const board: BoardState = [];

  for (let _ = BOARD_HEIGHT; _; _--) {
    const row: Color[] = [];

    for (let __ = BOARD_WIDTH; __; __--) row.push(Color.N);

    board.push(row);
  }

  return board;
};
