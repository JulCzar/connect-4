/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { network } from '../networks';
import { Color, Nullable } from '../../types';
import { getInitialState } from './utils';
import {
  testCombination,
  winningCombinations,
  WinningCoordinates,
} from '../../config';
import { Network } from '../models';
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
  function findMax(outputs: number[], exclusions: number[]): number {
    var order = [];
    let tempOut = outputs.slice(0);
    outputs.sort((a, b) => b - a);

    for (let i = 0; i < outputs.length; i++)
      order.push(tempOut.indexOf(outputs[i]));

    if (outputs[0] === 0) return Math.floor(Math.random() * 7);

    for (let i = 0; i < order.length; i++) {
      if (!exclusions.includes(order[i])) {
        return order[i];
      }
    }
    return -1;
  }

  const getDotMove = (color: Color) => () => {
    if (winner) {
      if (autoReset) resetBoard();
      updateGameCount();

      return;
    }

    try {
      const remainingMovesPerCol: Color[] = [];

      for (let i = board[0].length; i; i--) remainingMovesPerCol.push(0);

      for (const row of board)
        for (let i = 0; i < row.length; i++)
          if (row[i] === Color.N) remainingMovesPerCol[i] += 1;

      const invalidMoves = remainingMovesPerCol
        .map((item, i) => ({ i, item }))
        .filter(({ item }) => item === 0)
        .map(({ i }) => i);

      if (invalidMoves.length === 7) resetBoard();

      const move = findMax(network.runThrough(board.flat(1))!, invalidMoves);

      if (!AI.includes(currentPlayer!)) return;

      _dropDot(move, color);
    } catch {
      // implement catch
    }
  };

  const moveRedDot = getDotMove(Color.R);
  const moveYellowDot = getDotMove(Color.Y);

  useEffect(() => {
    getWinner();
    setCurrentPlayer(_getCurrentPlayer());
  }, [board]);

  useEffect(() => {
    if (currentPlayer === Color.R) moveRedDot();
    else if (currentPlayer === Color.Y) moveYellowDot();
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
    getRedMove: moveRedDot,
    resetBoard,
    gameCounter,
    setAutoReset,
    currentPlayer,
  };
};
