import { Color, PlayerName } from '../types';

export const colorToPlayerName = (color: Color): PlayerName => {
  return color === Color.R ? 'red' : 'yellow';
};

export const sigmoide = (x: number): number => 1 / (1 + Math.exp(-x));
