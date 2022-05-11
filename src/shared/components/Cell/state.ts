import { Color } from '../../../types';
import { iCell } from './types';
import { useStyles } from './useStyles';

export const CellState = (props: iCell) => {
  const styles = useStyles(props);
  const { color } = props;

  const yellowOrGray = color === Color.Y ? 'yellow' : '';
  const _color = color === Color.R ? 'red' : yellowOrGray;

  const className = [_color, ...styles].filter(Boolean).join(' ');

  return { className };
};
