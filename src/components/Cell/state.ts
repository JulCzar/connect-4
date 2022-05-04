import { Color } from '../../types';
import { iCell } from './types';

export const CellState = (props: iCell) => {
  const { color, winner, row, col } = props;

  const yellowOrGray = color === Color.Y ? 'yellow' : '';
  const _color = color === Color.R ? 'red' : yellowOrGray;

  const shouldAnimate = () => {
    if (!winner || !color) return false;

    for (const [x, y] of winner.combination) {
      const winningColumn = y + winner.column;
      const winningRow = x + winner.row;

      if (winningRow === row && winningColumn === col) return true;
    }

    return false;
  };

  const className = [_color, shouldAnimate() ? 'animate' : null]
    .filter(Boolean)
    .join(' ');

  return {
    className,
  };
};
