import { useEffect, useState } from 'react';
import { testCombination } from '../../../config/testCombination';
import { winningCombinations } from '../../../config/winningCoordinates';
import { Color, Nullable } from '../../../types';
import { WinningCoordinates } from '../../Cell/types';
import { getInitialState } from './utils';

export const BoardState = () => {
  const [board, setBoard] = useState(getInitialState());
  const [currentPlayer, setCurrentPlayer] = useState<Color>(Color.R);
  const [winner, setWinner] = useState<Nullable<WinningCoordinates>>(null);

  const _dropCoin = (col: number, color: Color) => {
    let validRow: Nullable<number> = null;

    for (let row = 0; row < board.length; row++)
      if (board[row][col] === Color.N) validRow = row;

    if (!validRow) return board;

    const newBoard = [...board];
    newBoard[validRow] = [...newBoard[validRow]];
    newBoard[validRow][col] = color;

    setBoard(newBoard);
  };

  const _getCurrentPlayer = () => {
    let reds = 0;
    let yellows = 0;

    for (const row of board) {
      for (const cell of row) {
        if (cell === Color.R) {
          reds++;
        } else if (cell === Color.Y) {
          yellows++;
        }
      }
    }

    return reds === yellows ? Color.Y : Color.R;
  };

  const getWinner = () => {
    for (const combination of winningCombinations) {
      const winner = testCombination(board, combination);

      if (winner) setWinner(winner);
    }

    return;
  };

  useEffect(() => {
    getWinner();
    setCurrentPlayer(_getCurrentPlayer());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  const dropCoin = (col: number) => () => {
    // we only allow a player to drop a coin if there is no winner yet
    if (!winner) {
      _dropCoin(col, currentPlayer);
    }
  };

  return {
    board,
    winner,
    dropCoin,
    currentPlayer,
  };
};
