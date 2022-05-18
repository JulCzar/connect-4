import { useEffect, useState } from 'react';
import { Nullable, PlayerName } from '../../../types';
import { colorToPlayerName } from '../../../utils';
import { useGameContext } from '../../../services/game/context';

export const HeaderState = () => {
  const boardState = useGameContext();

  const [winnerName, setWInnerName] = useState<Nullable<PlayerName>>(null);
  const [playerName, setPlayerName] = useState<PlayerName>('red');

  useEffect(() => {
    if (!boardState.winner) return;

    setWInnerName(colorToPlayerName(boardState.winner.color));
  }, [boardState.winner]);

  useEffect(() => {
    if (!boardState.currentPlayer) return;

    setPlayerName(colorToPlayerName(boardState.currentPlayer));
  }, [boardState.currentPlayer]);

  return {
    playerName,
    winnerName,
    boardState,
    hasWinner: Boolean(boardState.winner),
  };
};
