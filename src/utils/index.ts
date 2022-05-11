import { Color, PlayerName } from '../types';

export const colorToPlayerName = (color: Color): PlayerName => {
  return color === Color.R ? 'red' : 'yellow';
};
