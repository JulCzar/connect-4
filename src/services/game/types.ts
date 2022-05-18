import { Color, Nullable } from '../../types';
import { WinningCoordinates } from '../../shared/components/Cell/types';

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
export interface Play {
  board: BoardState;
  move: number;
}
export type Dataset = Play[];

export interface WekaAttributes {
  name: string;
  type: string;
  class?: boolean;
  weight: number;
  labels?: string[];
}

export interface WekaData {
  values: any[];
  sparse: boolean;
  weight: number;
}

export interface WekaHeader {
  relation: string;
  attributes: WekaAttributes[];
}
export interface WekaJSON {
  header: WekaHeader;
  data: WekaData[];
}
