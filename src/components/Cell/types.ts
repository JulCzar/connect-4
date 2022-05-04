import { Combination } from '../../config/winningCoordinates';
import { Color } from '../../types';

export interface WinningCoordinates {
  row: number;
  column: number;
  combination: Combination;
  color: Color;
}

export interface iCell {
  winner: WinningCoordinates | null;
  onClick: () => void;
  color: Color;
  row: number;
  col: number;
}
