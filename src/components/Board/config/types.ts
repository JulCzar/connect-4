import { Color, Nullable } from '../../../types';
import { WinningCoordinates } from '../../Cell/types';

export type BoardState = Color[][];

export interface DropCoinAction {
  type: 'DROP_COIN';
  payload: {
    column: number;
    color: Color;
  };
}

export interface iBoard {
  winner: Nullable<WinningCoordinates>;
  currentPlayer: Color;
}
