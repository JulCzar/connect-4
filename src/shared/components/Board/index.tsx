import React from 'react';
import { GameBoardContainer, GameContainer } from '../../styles';
import { Color } from '../../../types';
import Row from '../Row';

import { useGameContext } from '../../../services/game/context';

const Board: React.FC = () => {
  const state = useGameContext();

  return (
    <GameContainer>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <GameBoardContainer>
          {state.board.map((colors, i) => (
            <Row key={`column-${i}`} colors={colors} row={i} />
          ))}
        </GameBoardContainer>
        <div>
          {state.winner && (
            <div>
              {state.winner.color === Color.R ? 'Red' : 'Yellow'} won!
              <button onClick={state.resetBoard}>restart</button>
            </div>
          )}
        </div>
      </div>
    </GameContainer>
  );
};

export default Board;
