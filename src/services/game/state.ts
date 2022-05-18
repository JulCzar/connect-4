/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Color, Nullable } from '../../types';
import { getInitialState, getValidMove, saveMoveForPlayer } from './utils';
import {
  testCombination,
  winningCombinations,
  WinningCoordinates,
} from '../../config';
import { colorToPlayerName } from '../../utils';
export const GameState = () => {
  const [AI, setAI] = useState<Color[]>([]);
  const [gameCounter, setGameCount] = useState(0);
  const [autoReset, setAutoReset] = useState(false);
  const [board, setBoard] = useState(getInitialState());
  const [currentPlayer, setCurrentPlayer] = useState<Color>();
  const [winner, setWinner] = useState<Nullable<WinningCoordinates>>(null);

  const updateGameCount = () => setGameCount(s => s + 1);
  const resetBoard = () => {
    setBoard(getInitialState());
    setCurrentPlayer(undefined);
    setWinner(null);
  };

  const _dropDot = (col: number, color: Color) => {
    let validRow: Nullable<number> = null;

    for (let row = 0; row < board.length; row++)
      if (board[row][col] === Color.N) validRow = row;

    if (validRow === null) return board;

    const newBoard = [...board];
    newBoard[validRow] = [...newBoard[validRow]];
    newBoard[validRow][col] = color;

    setBoard(newBoard);
    saveMoveForPlayer(colorToPlayerName(color), board, col);
  };

  const _getCurrentPlayer = () => {
    let reds = 0;
    let yellows = 0;

    for (const row of board)
      for (const cell of row)
        if (cell === Color.R) reds++;
        else if (cell === Color.Y) yellows++;

    return reds === yellows ? Color.Y : Color.R;
  };

  const getWinner = () => {
    for (const combination of winningCombinations) {
      const winner = testCombination(board, combination);

      if (winner) setWinner(winner);
    }
  };

  useEffect(() => {
    getWinner();
    setCurrentPlayer(_getCurrentPlayer());
  }, [board]);

  useEffect(() => {
    if (winner) {
      updateGameCount();
    }
    if (winner || !currentPlayer) return autoReset ? resetBoard() : void 0;

    if (!AI.includes(currentPlayer)) return;

    const col = getValidMove(board);

    _dropDot(col, currentPlayer);
  }, [currentPlayer]);

  const dropDot = (col: number) => () => {
    if (AI.includes(currentPlayer!)) return;

    if (winner || !currentPlayer) return;

    _dropDot(col, currentPlayer);
  };

  return {
    AI,
    setAI,
    board,
    winner,
    dropDot,
    resetBoard,
    gameCounter,
    setAutoReset,
    currentPlayer,
  };
};
