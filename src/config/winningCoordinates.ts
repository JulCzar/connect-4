// A combination always starts at 0, 0 and
// the following coordinates are relative to the first one
const horizontal = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
];

const vertical = [
  [0, 0],
  [1, 0],
  [2, 0],
  [3, 0],
];

const diagonalNorthEast = [
  [0, 0],
  [1, 1],
  [2, 2],
  [3, 3],
];

const diagonalNorthWest = [
  [0, 0],
  [-1, 1],
  [-2, 2],
  [-3, 3],
];

const square = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
];

export type Combination = number[][];

export const boardWidth = 7;
export const boardHeight = 6;

export const winningCombinations: Combination[] = [
  horizontal,
  vertical,
  diagonalNorthEast,
  diagonalNorthWest,
  square,
];
