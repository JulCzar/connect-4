import { useEffect, useState } from 'react';
import { Color, Nullable } from '../../../../types';
import { useBoardContext } from '../../config/context';

type PlayerName = 'red' | 'yellow';

export const HeaderState = () => {
  const { winner, currentPlayer } = useBoardContext();
  const [playerName, setPlayerName] = useState<PlayerName>('red');
  const [winnerName, setWInnerName] = useState<Nullable<PlayerName>>(null);
  const [hasWinner, setHasWinner] = useState(false);

  const colorToPlayerName = (color: Color) => {
    return color === Color.R ? 'red' : 'yellow';
  };
  useEffect(() => {
    if (!winner) return;

    setHasWinner(true);
    setWInnerName(colorToPlayerName(winner.color));
  }, [winner]);

  useEffect(() => {
    setPlayerName(colorToPlayerName(currentPlayer));
  }, [currentPlayer]);

  return {
    playerName,
    winnerName,
    hasWinner,
  };
};
