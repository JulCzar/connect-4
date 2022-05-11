export enum Color {
  R = -1,
  Y = 1,
  N = 0,
}

export type Nullable<T> = T | null;
export type Range<
  T extends number = 0,
  Acc extends number[] = []
> = T extends Acc['length'] ? Acc[number] : Range<T, [...Acc, Acc['length']]>;

export type PlayerName = 'red' | 'yellow';

export type Move = {
  win: boolean;
  lose: boolean;
  move: Range<7>;
  board: number[];
  currentPlayer: Color;
};
