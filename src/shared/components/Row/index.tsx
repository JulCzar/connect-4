import React from 'react';
import { GameRow } from '../../styles';
import { Color } from '../../../types';
import { useGameContext } from '../../../services/game/context';
import Cell from '../Cell';

interface Props {
  colors: Color[];
  row: number;
}

const Row: React.FC<Props> = ({ row, colors }) => {
  const { dropDot: dropCoin } = useGameContext();
  return (
    <GameRow>
      {colors.map((color, col) => (
        <Cell
          onClick={dropCoin(col)}
          key={`cell-${col}`}
          color={color}
          row={row}
          col={col}
        />
      ))}
    </GameRow>
  );
};

export default Row;
