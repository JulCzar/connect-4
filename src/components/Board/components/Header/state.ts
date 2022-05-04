import { useEffect, useState } from 'react';
import { Color, Nullable } from '../../../../types';
import { iBoard } from '../../config/types';

type PlayerName = 'red' | 'yellow';

export const HeaderState = (props: iBoard) => {
  const [playerName, setPlayerName] = useState<PlayerName>('red');
  const [winnerName, setWInnerName] = useState<Nullable<PlayerName>>(null);
  const [hasWinner, setHasWinner] = useState(false);

  const colorToPlayerName = (color: Color) => {
    return color === Color.R ? 'red' : 'yellow';
  };
  useEffect(() => {
    if (!props.winner) return;

    setHasWinner(true);
    setWInnerName(colorToPlayerName(props.winner.color));
  }, [props.winner]);

  useEffect(() => {
    setPlayerName(colorToPlayerName(props.currentPlayer));
  }, [props.currentPlayer]);

  return {
    playerName,
    winnerName,
    hasWinner,
  };
};
