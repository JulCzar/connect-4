import React from 'react';
import { GameRow } from '../../styles';
import { Color } from '../../types';
import Cell from '../Cell';
import { WinningCoordinates } from '../Cell/types';

interface Props {
  colors: Color[];
  row: number;
  dropCoin: (column: number) => () => void;
  winner: WinningCoordinates | null;
}

const Row: React.FC<Props> = ({ row, colors, dropCoin, winner }) => {
  return (
    <GameRow>
      {colors.map((color, col) => (
        <Cell
          row={row}
          col={col}
          onClick={dropCoin(col)}
          color={color}
          key={`cell-${col}`}
          winner={winner}
        />
      ))}
    </GameRow>
  );
};

export default Row;
