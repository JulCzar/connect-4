import { useGameContext } from '../../../services/game/context';
import { iCell } from './types';

export const useStyles = (props: iCell) => {
  const { winner, currentPlayer, AI } = useGameContext();

  const shouldAnimate = () => {
    if (!winner || !props.color) return false;

    for (const [x, y] of winner.combination) {
      const winningColumn = y + winner.col;
      const winningRow = x + winner.row;

      if (winningRow === props.row && winningColumn === props.col) return true;
    }

    return false;
  };

  const animateClass = shouldAnimate() ? 'animate' : null;
  const disableClass =
    AI.includes(currentPlayer!) && !winner ? 'disabled' : null;

  return [animateClass, disableClass];
};
